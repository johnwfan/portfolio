import styles from "./Fog.module.css";

// The dither fog: a 12 × 12 sprite sheet stepped through in CSS (HANDOFF §5).
// Opacity, drift etc. come from the caller's className / style; `spriteStyle`
// positions the animated layer itself (home's mood offset). `glow` uses the
// sharper glow sprite (UPDATE §3).
export default function Fog({ className = "", style, spriteStyle, glow = false }) {
  return (
    <div aria-hidden="true" className={`${styles.fog} ${className}`} style={style}>
      <div className={glow ? styles.glow : undefined} style={spriteStyle} />
    </div>
  );
}
