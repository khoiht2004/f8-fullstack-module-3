import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from '../baseQuery';

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useRegisterMutation } = registerApi;