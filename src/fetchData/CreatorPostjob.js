export default async function CreatorPostjob(id) {

    const res = await fetch(`${process.env.API_URL}/api/user/${id}`, {
      next: { revalidate: 5 },
    });
  
    if (!res) throw new Error("Error to fetch the data");
  
    return res.json();
  }
  