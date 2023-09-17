
export default async function SearchTags(search) {
    const res = await fetch(`${process.env.API_URL}/api/job/tags/${search}`, {
      next: { revalidate: 10 },
    });
  
    if (!res) throw new Error("faild to fetch");
  
    return res.json();
  };