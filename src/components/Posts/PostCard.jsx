// import { formatCount, formatTime, getImageGridClass } from "@/utils/helper";
/**
 * Hiển thị từng card có nội dung riêng biệt
 * Lặp qua PostCard -> render vào children của PostSlide trong các trang khác
 * */
function PostCard({ post }) {
  return (
    <>
      <div>
        {post.id}. {post.content}
      </div>
    </>
  );
}

export default PostCard;
