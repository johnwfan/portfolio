import Header from "@/components/Header";
import FilmStrip from "@/components/FilmStrip";
import UnderlineLink from "@/components/UnderlineLink";
import { VisitorNo } from "@/components/VisitorCount";
import styles from "@/components/About.module.css";

export const metadata = { title: "about" };

const OUTSIDE = [
  { name: "games", desc: "grew up on ps2, wii, xbox 360 and pc. taking a break right now because of school." },
  { name: "media", desc: "film, shows, animation, anime. no single favorite, i just like good filmmaking in any genre." },
  { name: "music", desc: "currently listening to i saw your face by malcolm todd." },
  { name: "lifting", desc: "going to the gym and lifting weights." },
  { name: "travel", desc: "the photos here are from new york, kyoto and antelope canyon." },
  { name: "creating", desc: "code, design, video editing, whatever. i just like making things." },
];

export default function Page() {
  return (
    <>
      <Header path={[{ label: "about" }]} />
      <main className={styles.page}>
        <div className={styles.words}>
          <div className={styles.intro}>
            <h1 className={styles.title}>about</h1>
            <p className={styles.lead}>
              i’m a computer science student at rice. i like building things that real people use,
              and i’m always looking for something new to learn.
            </p>
            <p className={styles.body}>
              most of my work is full-stack, with some data and machine learning, and lately i’ve
              gotten into design too. if you want to connect or build something together, reach
              out.
            </p>
            <UnderlineLink href="/experience" className={styles.more}>
              see my experience
            </UnderlineLink>
          </div>

          <section className={styles.section}>
            <h2 className={styles.label}>outside of code</h2>
            <ul className={styles.rows}>
              {OUTSIDE.map((t) => (
                <li key={t.name} className={`${styles.row} ${styles.thing}`}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.desc}>{t.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.hi}>
            <h2 className={styles.label}>say hi</h2>
            <UnderlineLink href="mailto:johnfan.dev@gmail.com" className={styles.mail}>
              johnfan.dev@gmail.com
            </UnderlineLink>
          </div>
        </div>

        <div className={styles.filmCol}>
          <FilmStrip />
        </div>

        <footer className={styles.footer}>
          <span>john fan</span>
          <VisitorNo />
        </footer>
      </main>
    </>
  );
}
