import styles from "./Header.module.css";

// 26 × 14 pill switch. Off: --kn outline, --t2 knob left. On: #1F6FFF, white knob right.
export default function RecruiterToggle({ on, onToggle, className = "" }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onToggle}
      className={`${styles.toggle} ${className}`}
    >
      <span className={`${styles.track} ${on ? styles.trackOn : ""}`}>
        <span className={styles.knob} />
      </span>
      recruiter mode
    </button>
  );
}
