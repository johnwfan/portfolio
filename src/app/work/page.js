import Header from "@/components/Header";
import WorkIndex from "@/components/WorkIndex";

export const metadata = { title: "work" };

export default function Page() {
  return (
    <>
      <Header path={[{ label: "work" }]} />
      <WorkIndex />
    </>
  );
}
