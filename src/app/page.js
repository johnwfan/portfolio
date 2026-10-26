import Home from "@/components/Home";

export default async function Page({ searchParams }) {
  const { recruiter } = await searchParams;
  return <Home initialRecruiter={recruiter === "1"} />;
}
