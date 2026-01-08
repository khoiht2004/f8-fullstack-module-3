/* eslint-disable react-hooks/rules-of-hooks */
import { useLikePostMutation } from "@/services/Posts/postApi";
import { useCallback } from "react";

/* eslint-disable react-refresh/only-export-components */
function PostInteraction() {
  const [likePost] = useLikePostMutation();

  /**
   * Click vào like -> lấy postId qua dataset -> gọi API LikePost
   * Khi like sẽ update ui trc -> icon chuyển đỏ, số lượng like ++
   * Nếu API thành công -> giữ nguyên state hiện tại
   * Nếu API k thành công -> rollback state ban đầu
   */
  const handleLike = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const likeElement = e.currentTarget;
      const postId = likeElement.dataset.postId;
      const countSpan = likeElement.querySelector("span");

      const currentCount = parseInt(countSpan.textContent) || 0;

      try {
        const { data } = await likePost(postId).unwrap();
        const wasLiked = data.is_liked;

        if (!wasLiked) {
          // Unlike
          likeElement.classList.remove("fill-red-500", "text-red-500");
          likeElement.classList.add("text-(--color-user-action-post)");
          const newCount = currentCount - 1;
          countSpan.textContent = newCount === 0 ? "" : newCount;
        } else {
          // Like
          likeElement.classList.add("fill-red-500", "text-red-500");
          likeElement.classList.remove("text-(--color-user-action-post)");
          countSpan.textContent = currentCount + 1;
        }

        countSpan.textContent = data.likes_count === 0 ? "" : data.likes_count;
      } catch (error) {
        console.error("Failed to like/unlike post:", error);
      }
    },
    [likePost],
  );

  return {
    handleLike,
  };
}

export default PostInteraction;
