import Body from "@/components/body/Body";
import Hero from "@/components/shared/Hero";
import Search from "@/components/shared/Search";
import Homepage from "@/fetchData/Homepage";
import Image from "next/image";

export default async function Home({ searchParams }) {
  const page = searchParams.page || 1;

  const jobs = await Homepage(page);
  
  return (
    <>
      <Hero />

      <section className="mb-48">
        <Search />
        <Body jobs={jobs} page={page} />
      </section>
    </>
  );
}
