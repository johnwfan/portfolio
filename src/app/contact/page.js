import Header from "@/components/Header";
import ContactLinks from "@/components/ContactLinks";
import Guestbook from "@/components/Guestbook";
import styles from "@/components/Contact.module.css";

export const metadata = { title: "contact" };

// Build time, e.g. "oct 26, 2026, 5:09 am" (Houston time).
const updated = new Date(process.env.BUILD_TIME)
  .toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  })
  .toLowerCase();

export default function Page() {
  return (
    <>
      <Header path={[{ label: "contact" }]} />
      <main className={styles.page}>
        <div className={styles.left}>
          <h1 className={styles.title}>contact</h1>
          <ContactLinks />
        </div>
        <Guestbook />
        <footer className={styles.footer}>
          <span>last updated {updated}</span>
          <span />
        </footer>
      </main>
    </>
  );
}
