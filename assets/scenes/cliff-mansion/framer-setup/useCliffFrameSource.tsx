import { useEffect, useState } from "react";

/** Select the lighter set without changing the frame loader or animation timing. */
export function useCliffFrameSource(framesUrl: string) {
  const [lighter, setLighter] = useState(() => typeof window !== "undefined" && window.innerWidth < 800);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 799px)");
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean; effectiveType?: string } }).connection;
    const update = () => setLighter(media.matches || Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType || ""));
    update();
    media.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      media.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);
  const base = framesUrl.trim().replace(/\/+$/, "");
  return lighter && base.endsWith("/cliff-mansion/frames") ? `${base}-mobile` : framesUrl;
}