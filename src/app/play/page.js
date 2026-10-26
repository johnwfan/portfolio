import Header from "@/components/Header";
import Fog from "@/components/Fog";
import HazardTape from "@/components/HazardTape";
import { VisitorNo } from "@/components/VisitorCount";
import styles from "@/components/Play.module.css";

export const metadata = { title: "play" };

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Fog style={{ opacity: 0.22 }} />
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>play</h1>
        </div>
        <HazardTape />
        <span className={styles.visitor}>
          <VisitorNo />
        </span>
      </main>
    </>
  );
}
