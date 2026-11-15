"use client";

import { useEffect, useState, useCallback } from "react";

interface BadgeTarget {
  serialId: string;
  label: string;
  rect: DOMRect;
}

export function UiInspector() {
  const [enabled, setEnabled] = useState(false);
  const [targets, setTargets] = useState<BadgeTarget[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const scanTargets = useCallback(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-serial-id]");
    const list: BadgeTarget[] = [];
    nodes.forEach((node) => {
      const serialId = node.getAttribute("data-serial-id");
      if (!serialId) return;
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      const label =
        node.getAttribute("data-serial-label") ||
        node.getAttribute("aria-label") ||
        serialId;
      list.push({ serialId, label, rect });
    });
    setTargets(list);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("inspect") === "1") {
      setEnabled(true);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === "i") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "t")) {
        e.preventDefault();
        setEnabled((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setTargets([]);
      return;
    }

    scanTargets();
    const onScrollOrResize = () => scanTargets();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const interval = window.setInterval(scanTargets, 700);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.clearInterval(interval);
    };
  }, [enabled, scanTargets]);

  const handleCopy = async (target: BadgeTarget) => {
    const info = [
      `- 일련번호: ${target.serialId}`,
      `- 페이지명: 연희단 결 (GYEOL : The Grain of Sound)`,
      `- URI: ${window.location.origin}${window.location.pathname}`,
      `- 항목명: ${target.label}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(info);
    } catch {
      // 클립보드 권한 제한 환경 폴백
    }
    setToast(`📋 [${target.serialId}] 4대 정보 복사 완료! (일련번호/페이지/URI/항목명)`);
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setEnabled((prev) => !prev)}
        aria-pressed={enabled}
        className={`fixed top-16 right-3 z-50 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors shadow-sm ${
          enabled
            ? "border-[#A63A2B] bg-[#A63A2B] text-[#F6F3EC]"
            : "border-[#D8D0C5] bg-[#F6F3EC]/90 text-[#5C564F] hover:border-[#4A3525] hover:text-[#1A1917]"
        }`}
      >
        {enabled ? "🏷️ UI inspect ON (Alt+I)" : "🏷️ UI inspect (Alt+I)"}
      </button>

      {enabled && (
        <div className="pointer-events-none fixed inset-0 z-45">
          {targets.map((target, idx) => (
            <button
              key={`${target.serialId}-${idx}`}
              type="button"
              onClick={() => handleCopy(target)}
              style={{
                top: `${Math.max(4, target.rect.top + 2)}px`,
                left: `${Math.max(4, Math.min(window.innerWidth - 130, target.rect.left + 2))}px`,
              }}
              className="pointer-events-auto fixed rounded bg-[#A63A2B]/90 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#F6F3EC] shadow hover:bg-[#4A3525]"
              title={`${target.serialId} — ${target.label}`}
            >
              {target.serialId}
            </button>
          ))}
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-md border border-[#4A3525] bg-[#1A1917] px-4 py-2 text-xs text-[#F6F3EC] shadow-lg whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </>
  );
}
