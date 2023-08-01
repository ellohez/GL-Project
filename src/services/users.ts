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
    const { data } = await axios.post<User>(`${BASE_URL}/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // TODO: Remove test code
    // console.log(JSON.stringify(data, null, 4));

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
    const { data } = await axios.get<User[]>(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    //TODO: Remove test code
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
    const { data } = await axios.get<User>(`${BASE_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
