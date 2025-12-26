import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery,
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: ({ type = "for_you", page = 1, per_page = 10 } = {}) => ({
                url: "/posts/feed",
                method: "GET",
                params: {
                    type,
                    page,
                    per_page,
                },
            }),
        }),
    }),
});

export const { useGetFeedQuery } = postApi;