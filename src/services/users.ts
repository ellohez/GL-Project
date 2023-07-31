import axios from "axios";

export interface User {
  username: string;
  password: string;
  id: number;
}

export interface NewUser {
  username: string;
  password: string;
}

const BASE_URL = `http://localhost:3333`;

export const postUser = async (userData: NewUser) => {
  try {
    const { data } = await axios.post<User>(
      `${BASE_URL}/users`,
      // {
      //     headers: {
      //         Accept: 'application/json',
      //       },
      //     data: {
      //         userData,
      //     },
      // }
      userData
    );
    console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("postUser - error message: ", error.message);
      return error.message;
    } else {
      console.log("postUser - unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get<User[]>(
      `${BASE_URL}/users`
      // {
      //   headers: {
      //     Accept: 'application/json',
      //   },
      // },
    );

    //console.log(JSON.stringify(data, null, 4));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getUsers - error message: ", error.message);
      return error.message;
    } else {
      console.log("getUsers - unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const getUser = async (userId: number) => {
  try {
    const { data } = await axios.get<User>(
      `${BASE_URL}/users/${userId}`
      // {
      //     headers: {
      //       Accept: 'application/json',
      //     },
      // },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getUser - error message: ", error.message);
      return error.message;
    } else {
      console.log("getUser - unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

// export const getUsers = (): Promise<void | User[]> => {
//   return fetch(`${BASE_URL}/users`)
//     .then((res) => res.json())
//     .then((res) => {
//       return res as User[];
//     })
//     .catch((error) => console.log(`Error from getUsers - ${error}`));
// };

// export const getUser = ({ id }: { id: number }): Promise<void | User> => {
//     return fetch(`${BASE_URL}/user/${id}`)
//         .then<User>((res) => res.json())
//         .then((res) => {
//             return res;
//         })
//         .catch((error) => console.log(`Error from getUser - ${error}`));
// };
