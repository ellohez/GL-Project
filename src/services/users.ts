export interface User {
  username: string;
  password: string;
  id: number;
}

export const getUsers = (): Promise<User[] | void> => {
  return fetch("http://localhost:3333/users")
    .then((res) => res.json())
    .then((res) => {
      return res as User[];
    })
    .catch((error) => console.log(`Error ${error}`));
};
