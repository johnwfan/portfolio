import Header from "@/components/Header";
import WorkIndex from "@/components/WorkIndex";

export const metadata = { title: "projects" };

export default function Page() {
  return (
    <>
      <Header path={[{ label: "projects" }]} />
      <WorkIndex />
    </>
  );
}
