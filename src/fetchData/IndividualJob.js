export default async function IndividualJob(id, path) {
  // console.log(path);
  const res = await fetch(`${process.env.API_URL}/api/id/${id}`, {
    next: { revalidate: 5 },
  });

  if (!res) throw new Error("Error to fetch the data");

  return res.json();
}
