"use client";

import { cn } from "@/lib/cn";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  const bg = useMotionTemplate`radial-gradient(450px 280px at ${mx}px ${my}px, rgba(255,255,255,0.10), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    rX.set(-py * maxTilt);
    rY.set(px * maxTilt);
  };

  const onLeave = () => {
    rX.set(0);
    rY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      className={cn("group relative will-change-transform [perspective:900px]", className)}
    >
      <motion.div
        aria-hidden="true"
        style={{ backgroundImage: bg }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <div className="relative [transform:translateZ(0px)]">{children}</div>
    </motion.div>
  );
}

