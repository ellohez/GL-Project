// import axios, { AxiosResponse } from "axios";
import axios from "axios";

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
};

// Update or add specific fields for a user.
export const updateUser = async (id: number, jsonBody: object) => {
  const { data } = await axios.patch<string>(
    `${BASE_URL}/users/${id}`,
    JSON.stringify(jsonBody),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

// Add a new user to the DB (username and password)
export const postUser = async (userData: NewUser) => {
  // try {
  // As a new user, signify that they still need to
  // complete the sign up process
  const jsonBody = { ...userData, signUpComplete: false };
  console.log(`JsonBody for postUser = ${JSON.stringify(jsonBody)}`);
  const { data } = await axios.post<string>(
    `${BASE_URL}/users`,
    //JSON.stringify(userData),
    JSON.stringify(jsonBody),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // TODO: Remove test code
  // console.log(JSON.stringify(data, null, 4));

  return data; // Should data be returned as raw?
};

// Search DB by email to check if user already exists
export const getUserByEmail = async (email: string) => {
  // try {
  const { data } = await axios.get<string>(`${BASE_URL}/users?email=${email}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
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
