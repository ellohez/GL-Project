import { useEffect, useState } from "react";

import {
  NewUser,
  User,
  getUser,
  getUsers,
  postUser,
} from "../../services/users";

// interface SessionInfo {
//   token: string;
// }

const LandingPage = () => {
  // TODO: remove testing code.
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [createdUser, setCreatedUser] = useState<User>();

  const userData: NewUser = {
    username: "thisIsATest@Test.com",
    password: "myRubb1shPwd",
  };

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data as User[]))
      .then(() => console.log(`useEffect - ${users?.length}`));
  }, []);

  useEffect(() => {
    getUser(1)
      .then((data) => setUser(data as User))
      .then(() => console.log(`useEffect - ${user}`));
  }, []);

  useEffect(() => {
    postUser(userData)
      .then((data) => setCreatedUser(data as User))
      .then(() => console.log(`useEffect - ${createdUser}`));
  }, []);

  return (
    <main>
      <div className="main-container">
        <h1>Hello, world! (h1)</h1>
        <h2>These headings... (h2)</h2>
        <h3>...are here to enable... (h3)</h3>
        <h4>...screen reader and contrast checking (h4)</h4>
      </div>
      {users?.map((user) => (
        <div key={user.id}>
          <p>
            <span>{user.username}</span>
            <span>{user.password}</span>
          </p>
        </div>
      ))}
      <div>{user ? JSON.stringify(user) : <p>No user</p>}</div>
      <div>{createdUser ? JSON.stringify(createdUser) : <p>No user</p>}</div>
    </main>
  );
};

export default LandingPage;
