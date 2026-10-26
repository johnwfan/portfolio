import Image from "next/image";
import { coverFrames } from "@/content/projects";
import styles from "./CoverResolve.module.css";

// Dither → detail resolve (HANDOFF §6.2): all four frames stacked, 3 (full
// detail) at the bottom and 0 (coarsest) on top, hidden top-down. Give it a
// `key` per project so it remounts and replays on every selection change.
export default function CoverResolve({ slug, name, resolve = true, priority = false }) {
  const [f0, f1, f2, f3] = coverFrames(slug);
  const frame = (src, alt, hide) => (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes="426px"
      className={`${styles.frame} ${hide || ""}`}
    />
  );
  return (
    <>
      {frame(f3, `dithered cover study for ${name}`)}
      {resolve && (
        <>
          {frame(f2, "", styles.hide3)}
          {frame(f1, "", styles.hide2)}
          {frame(f0, "", styles.hide1)}
        </>
      )}
    </>
  );
}
