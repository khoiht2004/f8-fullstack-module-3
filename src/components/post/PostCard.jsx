import { formatTime } from "@/utils/helper";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ellipsis, Heart, MessageCircle, Repeat, Send } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router";
import PostInteraction from "./PostInteraction";
import ReplyModal from "./ReplyModal";
import useReplyModal from "@/features/hooks/useReplyModal";

/**
 * Hiển thị từng card có nội dung riêng biệt
 * Lặp qua PostCard -> render vào children của PostSlide trong các trang khác
 * */
function PostCard({ post }) {
  const navigate = useNavigate();
  const { isOpen, handleOpen, handleClose } = useReplyModal();
  const { handleLike } = PostInteraction();

  const wrapperIcon =
    "flex cursor-pointer items-center gap-1 rounded-2xl px-3 py-1.5 hover:bg-(--bg-icon-hover) select-none";
  const iconStyles = "size-4.5 ";
  const statePostCount = "text-[13px] font-semibold";

  const handleCardClick = (e) => {
    e.stopPropagation();
    const username = post.user.username;
    const postId = post.id;
    navigate(`/${username}/post/${postId}`);
  };

  return (
    <>
      <Card
        className={`card relative flex cursor-pointer flex-row overflow-x-auto rounded-none border-none px-6 py-3`}
        data-post-id={post.id}
        data-user-id={post.user_id}
        onClick={handleCardClick}
      >
        <Avatar className={`size-9`}>
          <AvatarImage
            src={post?.user?.avatar_url || "/img/placeholder_avatar.jpg"}
            className="size-full"
          />
        </Avatar>

        {/* Tên người dùng, Thời gian up bài, dấu ... */}
        <div className="flex-1">
          <CardHeader className={`flex items-center px-0 pb-2`}>
            <CardTitle>{post?.user?.username}</CardTitle>
            <CardDescription className={`flex-1 text-(--color-time)`}>
              {formatTime(post.created_at)}
            </CardDescription>
            <CardAction className={`absolute top-[2.4%] right-[3%]`}>
              <Ellipsis className="size-8 cursor-pointer rounded-full p-2 text-(--color-icon) hover:bg-(--bg-icon-hover)" />
            </CardAction>
          </CardHeader>

          <div>
            {/* Nội dung chính của post */}
            <CardContent className={`px-0`}>
              <p>{post.content}</p>
            </CardContent>
          </div>

          {/* Người dùng tương tác */}
          <CardFooter className={`-ml-3 px-0 pt-1`}>
            {/* Số lượng lượt thích */}
            <div
              className={`like transition-colors duration-300 ${wrapperIcon} ${post.is_liked_by_auth ? "text-red-500" : "text-(--color-user-action-post)"}`}
              data-post-id={post.id}
              onClick={handleLike}
            >
              <Heart className={`${iconStyles} `} />
              <span className={`${statePostCount}`}>
                {post.likes_count === 0 ? "" : post.likes_count}
              </span>
            </div>
            {/* Số lượng bình luận */}
            <div
              className={`${wrapperIcon} text-(--color-user-action-post)`}
              data-post-id={post.id}
              onClick={handleOpen}
            >
              <MessageCircle className={`${iconStyles}`} />
              <span className={`${statePostCount}`}>
                {post.replies_count === 0 ? "" : post.replies_count}
              </span>
            </div>
            <div className={`${wrapperIcon} text-(--color-user-action-post)`}>
              {/* Số lượng đăng lại */}
              <Repeat className={`${iconStyles}`} />
              <span className={`${statePostCount}`}>
                {post.reposts_and_quotes_count === 0
                  ? ""
                  : post.reposts_and_quotes_count}
              </span>
            </div>
            {/* Số lượng chia sẻ */}
            <div className={`${wrapperIcon} text-(--color-user-action-post)`}>
              <Send className={`${iconStyles} rotate-20`} />
              <span className={`${statePostCount}`}>
                {post.reposts_and_quotes_count === 0
                  ? ""
                  : post.reposts_and_quotes_count}
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>

      <Separator className={`bg-(--outline-primary)`} />

      {isOpen && <ReplyModal post={post} onClick={handleClose} />}
    </>
  );
}

export default PostCard;
