import { useState } from "react";
import { HERO_BG_URL, FALLBACK_HERO_BG } from "@/lib/constants";

/**
 * Hero 区背景图层：实色渐变 + 背景图（加载失败时用备用图）+ 半透明渐变。
 * 各页复用此组件可保证在 hero-bg.png 不存在时仍显示备用背景，避免“其他页没背景”的问题。
 */
export default function HeroBackground() {
  const [bgUrl, setBgUrl] = useState(HERO_BG_URL);
  const onError = () => setBgUrl(FALLBACK_HERO_BG);

  return (
    <>
      {/* 底层：实色渐变兜底 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)]" />
      {/* 中层：背景图（失败时由下方 img onError 切换为备用图） */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[1]"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <img src={bgUrl} alt="" className="hidden" onError={onError} />
      {/* 顶层：半透明渐变，让背景图透出 */}
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-b from-[var(--hero-from-85)] via-[var(--hero-via-70)] via-[var(--hero-via-50)] to-[var(--hero-to-90)]"
        aria-hidden
      />
    </>
  );
}
