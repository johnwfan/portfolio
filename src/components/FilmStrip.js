import Image from "next/image";
import styles from "./FilmStrip.module.css";

const FRAMES = [
  { src: "/photos/nyc.jpg", alt: "john in central park, new york", pos: "50% 60%", place: "new york", n: "01A" },
  { src: "/photos/kyoto.jpg", alt: "john at fushimi inari, kyoto", pos: "45% 35%", place: "kyoto", n: "02A" },
  { src: "/photos/canyon.jpg", alt: "john in a slot canyon", pos: "50% 45%", place: "slot canyon", n: "03A" },
];

// About's photos on a short, slightly tilted strip of film (UPDATE §5). The
// strip is an object, so it's dark in both themes; the sprocket holes show the
// page colour. Horizontal and scrollable on small screens.
export default function FilmStrip() {
  return (
    <div className={styles.film}>
      <div className={styles.scroller}>
        <div className={styles.strip}>
          <span aria-hidden="true" className={`${styles.holes} ${styles.holesA}`} />
          <span aria-hidden="true" className={`${styles.holes} ${styles.holesB}`} />
          <div className={styles.frames}>
            {FRAMES.map((f, i) => (
              <figure key={f.src} className={styles.frame}>
                <div className={styles.photo}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="228px"
                    preload={i === 0}
                    style={{ objectFit: "cover", objectPosition: f.pos }}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span>{f.place}</span>
                  <span>{f.n}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <span className={styles.note}>a few places i&apos;ve been</span>
    </div>
  );
}
