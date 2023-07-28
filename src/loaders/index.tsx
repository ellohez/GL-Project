// Loaders for data

export const userLoader = async () => {
  console.log(`Loader - fetching data`);
  const res = await fetch("http://localhost:4000/users");

  if (!res.ok) {
    throw Error(`Could not fetch users. ${res.status} ${res.headers}`);
  }

  return res.json();
};
