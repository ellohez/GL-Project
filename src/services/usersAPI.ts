import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewUser, User } from "../types/services";

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3333/users" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUserByUsername: builder.query<User, string>({
      query: (username) => `?username=${username}`,
      providesTags: ["Users"],
    }),
    addNewUser: builder.mutation<NewUser, string>({
      query: (newUser) => ({
        url: ``,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUserByUsernameQuery, useAddNewUserMutation } =
  usersApiSlice;
