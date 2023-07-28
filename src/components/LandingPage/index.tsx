import { useLoaderData } from "react-router-dom";

// interface SessionInfo {
//   token: string;
// }

interface User {
  username: string;
  password: string;
  id: number;
}

interface Users {
  users: User[];
}

const LandingPage = () => {
  const { users } = useLoaderData() as Users;
  // console.log(JSON.stringify(users));

  return (
    <main>
      <div className="main-container">
        <h1>Hello, world! (h1)</h1>
        <h2>These headings... (h2)</h2>
        <h3>...are here to enable... (h3)</h3>
        <h4>...screen reader and contrast checking (h4)</h4>
      </div>
      {users.map((user) => (
        <div>
          <p>
            {user.username}
            {user.id}
            {user.password}
          </p>
        </div>
      ))}
    </main>
  );
};

export default LandingPage;
