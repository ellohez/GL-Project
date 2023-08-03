import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewUser } from "../types/services";

//TODO: Add TS types to endpoints
export const authApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3333/login" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (newUser: NewUser) => ({
        url: ``,
        method: "POST",
        body: newUser,
        // Getting the result as text makes it easier to parse into JSON
        responseHandler: (response) => response.text(),
        // responseHandler: (response) => response.json(),
      }),
      //invalidatesTags: ["Users"],
      // transformResponse: (response: {data: User}) =>
      //   response.user,
    }),
  }),
});

export const { useLoginUserMutation } = authApiSlice;
