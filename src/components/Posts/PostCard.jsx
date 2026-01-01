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
import { useState } from "react";
import CommentModal from "../Modal/CommentModal";

/**
 * Hiển thị từng card có nội dung riêng biệt
 * Lặp qua PostCard -> render vào children của PostSlide trong các trang khác
 * */
function PostCard({ post }) {
  const [isOpen, setIsOpen] = useState(false);

  const iconStyles = "size-4.5 text-(--color-user-action-post)";
  const wrapperIcon =
    "flex cursor-pointer items-center gap-1 rounded-2xl px-3 py-1.5 hover:bg-(--bg-icon-hover)";
  const statePostCount = "text-[13px] text-(--color-user-action-post)";

  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (
      e.target.classList.contains("overlay") ||
      e.target.classList.contains("close-btn")
    )
      setIsOpen(false);
  };

  return (
    <>
      <Card
        className={`flex flex-row rounded-none border-none px-6 py-3`}
        data-post-id={post.id}
        data-user-id={post.user_id}
      >
        <Avatar className={`size-9`}>
          <AvatarImage
            src={post?.user?.avatar_url || "/img/placeholder_avatar.jpg"}
            className="size-full"
          />
        </Avatar>

        {/* Tên người dùng, Thời gian up bài, dấu ... */}
        <div className="flex-1">
          <CardHeader className={`flex items-center px-0`}>
            <CardTitle>{post?.user?.username}</CardTitle>
            <CardDescription className={`flex-1 text-(--color-time)`}>
              {formatTime(post.created_at)}
            </CardDescription>
            <CardAction>
              <Ellipsis className="size-8 cursor-pointer rounded-full p-2 text-(--color-icon) hover:bg-(--bg-icon-hover)" />
            </CardAction>
          </CardHeader>

          {/* Nội dung chính của post */}
          <CardContent className={`px-0`}>
            <p>{post.content}</p>
          </CardContent>

          {/* Người dùng tương tác */}
          <CardFooter className={`px-0 pt-1`}>
            {/* Số lượng lượt thích */}
            <div className={`${wrapperIcon}`}>
              <Heart className={`${iconStyles}`} />
              <span className={`${statePostCount}`}>
                {post.likes_count === 0 ? "" : post.likes_count}
              </span>
            </div>
            {/* Số lượng bình luận */}
            <div className={`${wrapperIcon}`} onClick={handleOpen}>
              <MessageCircle className={`${iconStyles}`} />
              <span className={`${statePostCount}`}>
                {post.replies_count === 0 ? "" : post.replies_count}
              </span>
            </div>
            <div className={`${wrapperIcon}`}>
              {/* Số lượng đăng lại */}
              <Repeat className={`${iconStyles}`} />
              <span className={`${statePostCount}`}>
                {post.reposts_and_quotes_count === 0
                  ? ""
                  : post.reposts_and_quotes_count}
              </span>
            </div>
            {/* Số lượng chia sẻ */}
            <div className={`${wrapperIcon}`}>
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

      {isOpen && <CommentModal post={post} onClick={handleClose} />}
    </>
  );
}

export default PostCard;
