import Header from "@/components/Header";
import HazardTape from "@/components/HazardTape";
import { VisitorNo } from "@/components/VisitorCount";
import styles from "@/components/Play.module.css";

export const metadata = { title: "play" };

export default function Page() {
  return (
    <>
      <Header path={[{ label: "play" }]} />
      <main className={styles.page}>
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
