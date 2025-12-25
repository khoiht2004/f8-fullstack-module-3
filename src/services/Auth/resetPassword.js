import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const resetPasswordApi = createApi({
    reducerPath: "resetPasswordApi",
    baseQuery,
    endpoints: (builder) => ({
        resetPassword: builder.mutation({
            query: (credentials) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useResetPasswordMutation } = resetPasswordApi;