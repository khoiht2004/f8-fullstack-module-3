import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;