import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery,
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => ({
                url: "/auth/user",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserInfoQuery, useLazyGetUserInfoQuery } = userApi;