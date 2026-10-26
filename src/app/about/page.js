import Image from "next/image";
import Header from "@/components/Header";
import AboutInterests from "@/components/AboutInterests";
import AboutExperience from "@/components/AboutExperience";
import { VisitorNo } from "@/components/VisitorCount";
import styles from "@/components/About.module.css";

export const metadata = { title: "about" };

const PHOTOS = [
  { src: "/photos/nyc.jpg", alt: "john in central park, new york", pos: "50% 60%", tall: true },
  { src: "/photos/kyoto.jpg", alt: "john at fushimi inari, kyoto", pos: "45% 35%" },
  { src: "/photos/canyon.jpg", alt: "john in a slot canyon", pos: "50% 45%" },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.top}>
          <div className={styles.words}>
            <h1 className={styles.title}>about</h1>
            <p className={styles.lead}>
              i’m a computer science student at rice. i like building things that real people use,
              and i’m always looking for something new to learn.
            </p>
            <p className={styles.body}>
              most of my work is full-stack, with some data and machine learning, and lately i’ve
              gotten into design too. if you want to connect or build something together, reach out.
            </p>
            <AboutInterests />
          </div>

          <div className={styles.photos}>
            {PHOTOS.map((p, i) => (
              <div key={p.src} className={`${styles.photo} ${p.tall ? styles.tall : ""}`}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 900px) 300px, 50vw"
                  style={{ objectPosition: p.pos }}
                />
              </div>
            ))}
          </div>
        </div>

        <AboutExperience />

        <footer className={styles.footer}>
          <span />
          <VisitorNo />
        </footer>
      </main>
    </>
  );
}
