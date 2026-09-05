import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GITHUB_USERNAME = "anbv29";
const DAY_COUNT = 20;
const REVALIDATE_SECONDS = 1_800;
const FETCH_ATTEMPTS = 2;

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "AnubhavPortfolio",
};

type GitHubRepository = {
  name: string;
  pushed_at: string | null;
  archived: boolean;
  disabled: boolean;
};

type GitHubCommit = {
  sha: string;
  commit: {
    author: { date: string } | null;
    committer: { date: string } | null;
  };
};

type ActivityPayload = {
  username: string;
  days: Array<{ date: string; count: number }>;
  total: number;
  stale?: boolean;
};

type ActivityGlobal = typeof globalThis & {
  __anbv29GithubActivity?: ActivityPayload;
  __anbv29GithubActivityCachedAt?: number;
};

const activityGlobal = globalThis as ActivityGlobal;

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function fetchGitHub(url: string) {
  let lastError: unknown;

  for (let attempt = 0; attempt < FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: githubHeaders,
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (response.status < 500 || attempt === FETCH_ATTEMPTS - 1) {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === FETCH_ATTEMPTS - 1) throw error;
    }

    await wait(350 * (attempt + 1));
  }

  throw lastError ?? new Error("GitHub request failed");
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function lastTwentyDays() {
  const today = new Date();
  const utcToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );

  return Array.from({ length: DAY_COUNT }, (_, index) => {
    const day = new Date(utcToday);
    day.setUTCDate(day.getUTCDate() - (DAY_COUNT - 1 - index));

    return { date: dateKey(day), count: 0 };
  });
}

async function getRecentlyPushedRepositories(startDate: string) {
  const response = await fetchGitHub(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=100`
  );

  if (!response.ok) {
    throw new Error(`GitHub repository request failed (${response.status})`);
  }

  const repositories = (await response.json()) as GitHubRepository[];
  const startTime = `${startDate}T00:00:00Z`;

  return repositories.filter(
    (repository) =>
      repository.pushed_at !== null &&
      repository.pushed_at >= startTime &&
      !repository.archived &&
      !repository.disabled
  );
}

async function getRepositoryCommits(
  repository: GitHubRepository,
  since: string,
  until: string
) {
  const query = new URLSearchParams({
    author: GITHUB_USERNAME,
    since,
    until,
    per_page: "100",
  });
  const response = await fetchGitHub(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repository.name}/commits?${query}`
  );

  if (response.status === 409) return [];
  if (!response.ok) {
    throw new Error(
      `GitHub commit request failed for ${repository.name} (${response.status})`
    );
  }

  return (await response.json()) as GitHubCommit[];
}

export async function GET() {
  const days = lastTwentyDays();
  const cachedActivity = activityGlobal.__anbv29GithubActivity;
  const cachedAt = activityGlobal.__anbv29GithubActivityCachedAt ?? 0;

  if (
    cachedActivity?.days.at(-1)?.date === days.at(-1)?.date &&
    Date.now() - cachedAt < REVALIDATE_SECONDS * 1_000
  ) {
    return NextResponse.json(cachedActivity, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  const counts = new Map(days.map((day) => [day.date, 0]));
  const since = `${days[0].date}T00:00:00Z`;
  const tomorrow = new Date(`${days.at(-1)!.date}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const until = tomorrow.toISOString();

  try {
    const repositories = await getRecentlyPushedRepositories(days[0].date);
    const commitsByRepository = await Promise.all(
      repositories.map(async (repository) => ({
        repository: repository.name,
        commits: await getRepositoryCommits(repository, since, until),
      }))
    );
    const seenCommits = new Set<string>();

    for (const { repository, commits } of commitsByRepository) {
      for (const commit of commits) {
        const identity = `${repository}:${commit.sha}`;
        if (seenCommits.has(identity)) continue;
        seenCommits.add(identity);

        const committedAt =
          commit.commit.author?.date ?? commit.commit.committer?.date;
        if (!committedAt) continue;

        const commitDate = committedAt.slice(0, 10);
        if (counts.has(commitDate)) {
          counts.set(commitDate, (counts.get(commitDate) ?? 0) + 1);
        }
      }
    }

    const activity = days.map((day) => ({
      ...day,
      count: counts.get(day.date) ?? 0,
    }));

    const payload: ActivityPayload = {
      username: GITHUB_USERNAME,
      days: activity,
      total: activity.reduce((sum, day) => sum + day.count, 0),
    };
    activityGlobal.__anbv29GithubActivity = payload;
    activityGlobal.__anbv29GithubActivityCachedAt = Date.now();

    return NextResponse.json(
      payload,
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("GitHub activity error:", error);

    if (activityGlobal.__anbv29GithubActivity) {
      return NextResponse.json(
        { ...activityGlobal.__anbv29GithubActivity, stale: true },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable" },
      { status: 503 }
    );
  }
}
