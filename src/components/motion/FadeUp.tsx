"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function FadeUp({ children, className = "", delayMs = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delayMs > 0 && visible ? { animationDelay: `${delayMs}ms` } : undefined}
      className={`${visible ? "fade-up-visible" : "fade-up-hidden"} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
