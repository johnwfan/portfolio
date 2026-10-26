import styles from "./Fog.module.css";

// The dither fog: a 12 × 12 sprite sheet stepped through in CSS (HANDOFF §5).
// Opacity, drift etc. come from the caller's className / style.
export default function Fog({ className = "", style }) {
  return (
    <div aria-hidden="true" className={`${styles.fog} ${className}`} style={style}>
      <div />
    </div>
  );
}
