export default async function Homepage(page) {
  // console.log(page)
  const res = await fetch(`${process.env.API_URL}/api/page/${page}`, {
    next: { revalidate: 10 },
  });

  if (!res) throw new Error("faild to fetch");

  return res.json();
}
