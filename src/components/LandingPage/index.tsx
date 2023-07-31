// import { useEffect, useState } from "react";

// interface SessionInfo {
//   token: string;
// }

const LandingPage = () => {
  // TODO: remove testing code.
  // const [users, setUsers] = useState<User[] | void>([]);

  // useEffect(() => {
  //   getUsers()
  //     .then(users => {
  //       setUsers(users);
  //     });
  // }, []);

  return (
    <main>
      <div className="main-container">
        <h1>Hello, world! (h1)</h1>
        <h2>These headings... (h2)</h2>
        <h3>...are here to enable... (h3)</h3>
        <h4>...screen reader and contrast checking (h4)</h4>
      </div>
      {/* {users?.map((user) => (
        <div key={user.id}>
          <p>
            {user.username}
            {user.password}
          </p>
        </div>
      ))} */}
    </main>
  );
};

export default LandingPage;
