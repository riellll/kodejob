
export default async function jobData() {

  const res = await fetch(`${process.env.API_URL}/api/job`, {
    next: { revalidate: 10 },
  });

  if (!res) throw new Error("faild to fetch");

  return res.json();
};
