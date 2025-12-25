import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const forgotPasswordApi = createApi({
    reducerPath: "forgotPasswordApi",
    baseQuery,
    endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: credentials,
            }),
        })
    })
});

export const { useForgotPasswordMutation } = forgotPasswordApi;

