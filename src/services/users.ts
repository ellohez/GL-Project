import axios, { AxiosResponse } from "axios";

import { NewUser, User } from "../types/services";

export const BASE_URL = `http://localhost:3333`;
// const responseBody = (response: AxiosResponse) => response.data;

// Add a new user to the DB (username and password)
export const loginUser = async (userData: NewUser) => {
  // try {
  const { data } = await axios.post<string>(
    `${BASE_URL}/login`,
    JSON.stringify(userData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     //console.log("postUser - error message: ", error.message);
  //     // return error.message;
  //     throw new Error(error);
  //   } else {
  //     //console.log("postUser - unexpected error: ", error);
  //     // return "An unexpected error occurred";
  //     throw "An unexpected error occured";
  //   }
  // }
};

// Add a new user to the DB (username and password)
export const postUser = async (userData: NewUser) => {
  try {
    const { data } = await axios.post<string>(
      `${BASE_URL}/users`,
      JSON.stringify(userData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // TODO: Remove test code
    // console.log(JSON.stringify(data, null, 4));

    return JSON.parse(data); // Should data be returned as raw?
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("postUser - error message: ", error.message);
      // return error.message;
      return error.message;
    } else {
      console.log("postUser - unexpected error: ", error);
      // return "An unexpected error occurred";
      return "An unexpected error occured";
    }
  }
};

// Get all users from DB
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

// Get a particular user by their ID number
export const getUserById = async (userId: number) => {
  try {
    const { data } = await axios.get<User>(`${BASE_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getUserById - error message: ", error.message);
      return error.message;
    } else {
      console.log("getUserById - unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

// Search DB by username
export const getUserByUsername = async (username: string) => {
  try {
    const { data } = await axios.get<string>(
      `${BASE_URL}/users?username=${username}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return JSON.parse(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getUserById - error message: ", error.message);
      return error.message;
    } else {
      console.log("getUserById - unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
