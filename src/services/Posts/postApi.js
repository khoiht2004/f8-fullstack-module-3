import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery,
    tagTypes: ['Post', 'Feed'],
    endpoints: (builder) => ({
        // Lấy feed với infinite scroll support
        getFeed: builder.query({
            query: ({ type = "for_you", page = 1, per_page = 10 } = {}) => ({
                url: "/posts/feed",
                params: {
                    type,
                    page,
                    per_page,
                },
            }),
            // Serialize query args để cache theo type (không theo page)
            serializeQueryArgs: ({ queryArgs }) => {
                return queryArgs?.type || "for_you";
            },
            // Merge data mới với data cũ
            merge: (currentCache, newItems, { arg }) => {
                if (arg?.page === 1) {
                    // Reset khi load trang đầu
                    return newItems;
                }
                // Merge posts từ trang mới vào cache
                return {
                    ...newItems,
                    data: [...(currentCache?.data || []), ...(newItems?.data || [])],
                };
            },
            // Force refetch khi page thay đổi
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page;
            },
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