export function Footer() {
  return (
    <footer className="relative w-full pb-28 pt-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[12px] tracking-tight text-white/45 sm:flex-row">
          <div>© {new Date().getFullYear()} Anubhav Pandey</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white/70" href="#top">
              Back to top
            </a>
            <a className="hover:text-white/70" href="#">
              NIT Jalandhar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

