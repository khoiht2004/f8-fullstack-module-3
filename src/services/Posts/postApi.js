import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery,
    tagTypes: ['Post', 'Feed'],
    endpoints: (builder) => ({
        // Lấy feed
        getFeed: builder.query({
            query: ({ type = "for_you", page = 1, per_page = 10 } = {}) => ({
                url: "/posts/feed",
                params: {
                    type,
                    page,
                    per_page,
                },
            }),
            providesTags: ['Feed'],
        }),
        // Tạo post
        createPost: builder.mutation({
            query: (postData) => ({
                url: "/posts",
                method: "POST",
                body: postData,
            }),
            invalidatesTags: ['Feed'],
        }),
        // Like post
        likePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/${postId}/like`,
                method: "POST",
            }),
            invalidatesTags: ['Feed'],
        }),
        // Reply post
        replyPost: builder.mutation({
            query: ({ postId, postData }) => ({
                url: `/posts/${postId}/reply`,
                method: "POST",
                body: postData,
            }),
            invalidatesTags: ['Feed'],
        }),
        // Get post by ID
        getPostById: builder.query({
            query: (postId) => ({
                url: `/posts/${postId}`,
            }),
            providesTags: ['Post'],
        }),
        // Lấy ra comment của post đó 
        getReplies: builder.query({
            query: (postId) => ({
                url: `/posts/${postId}/replies`
            })
        }),
        providesTags: ['Post'],
    }),
});

export const { useGetFeedQuery, useGetRepliesQuery, useCreatePostMutation, useLikePostMutation, useReplyPostMutation, useGetPostByIdQuery } = postApi;