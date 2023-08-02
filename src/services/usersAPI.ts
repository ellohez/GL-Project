import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewUser, User } from "../types/services";

//TODO: Add TS types to endpoints
export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3333/users" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUserByUsername: builder.query({
      query: (username: string) => `?username=${username}`,
      providesTags: ["Users"],
    }),
    addNewUser: builder.mutation({
      query: (newUser: NewUser) => ({
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
