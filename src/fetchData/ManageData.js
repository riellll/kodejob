

export default async function ManageData() {

    const res1 = await fetch(`${process.env.API_URL}/api/job`, {
      next: { revalidate: 10 },
    });
  
    if (!res1) throw new Error("faild to fetch");
  
    return res1.json();
  };