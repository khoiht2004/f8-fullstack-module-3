import { useNavigate, useParams } from "react-router";
import {
  useGetPostByIdQuery,
  useGetRepliesQuery,
} from "@/services/Posts/postApi";
import PostSlide from "@/components/Post/PostSlide.jsx";
import PostCard from "@/components/Post/PostCard.jsx";
import PostLoadingSkeleton from "@/components/Post/PostLoadingSkeleton.jsx";
import Header from "@/components/Header";
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
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Ellipsis,
  Heart,
  MessageCircle,
  Repeat,
  Send,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useReplyModal from "@/features/hooks/useReplyModal";
import ReplyModal from "@/components/Post/ReplyModal.jsx";
import PostInteraction from "@/components/Post/PostInteraction.jsx";

function PostDetail() {
  const { id } = useParams();
  const { handleLike } = PostInteraction();
  const { isOpen, handleOpen, handleClose } = useReplyModal();
  const { isLoading, error, data: response } = useGetPostByIdQuery(id);
  const post = response?.data;
  const { data } = useGetRepliesQuery(id);

  const wrapperIcon =
    "flex cursor-pointer items-center gap-1 rounded-2xl px-3 py-1.5 hover:bg-(--bg-icon-hover) select-none";
  const iconStyles = "size-4.5 ";
  const statePostCount = "text-[13px] font-semibold";

  if (isLoading) {
    return (
      <div>
        <PostSlide>
          <HeaderDetailPage />
          <PostLoadingSkeleton />
        </PostSlide>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PostSlide>
          <HeaderDetailPage />
          <div className="flex h-dvh items-center justify-center p-8 pb-0">
            <p className="text-red-500">
              Không thể tải bài post. Vui lòng thử lại.
            </p>
          </div>
        </PostSlide>
      </div>
    );
  }

  return (
    <div>
      <PostSlide>
        <HeaderDetailPage post={post} />
        {/* Thông tin của bài đăng */}
        <Card
          className={`card relative cursor-pointer overflow-x-auto rounded-none border-none p-6 pb-0`}
        >
          <div className="flex flex-row gap-6">
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
                  {formatTime(post?.created_at)}
                </CardDescription>
                <CardAction className={`absolute top-[12.5%] right-[3%]`}>
                  <Ellipsis className="size-8 cursor-pointer rounded-full p-2 text-(--color-icon) hover:bg-(--bg-icon-hover)" />
                </CardAction>
              </CardHeader>

              {/* Nội dung chính của post */}
              <div>
                <CardContent className={`px-0`}>
                  <p>{post?.content}</p>
                </CardContent>
              </div>

              {/* Người dùng tương tác */}
              <CardFooter className={`-ml-3 px-0 pt-1`}>
                {/* Số lượng lượt thích */}
                <div
                  className={`like transition-colors duration-300 ${wrapperIcon} ${post?.is_liked_by_auth ? "text-red-500" : "text-(--color-user-action-post)"}`}
                  data-post-id={post?.id}
                  onClick={handleLike}
                >
                  <Heart className={`${iconStyles} `} />
                  <span className={`${statePostCount}`}>
                    {post?.likes_count === 0 ? "" : post?.likes_count}
                  </span>
                </div>
                {/* Số lượng bình luận */}
                <div
                  className={`${wrapperIcon} text-(--color-user-action-post)`}
                  data-post-id={post?.id}
                  onClick={handleOpen}
                >
                  <MessageCircle className={`${iconStyles}`} />
                  <span className={`${statePostCount}`}>
                    {post?.replies_count === 0 ? "" : post?.replies_count}
                  </span>
                </div>
                {/* Số lượng đăng lại */}
                <div
                  className={`${wrapperIcon} text-(--color-user-action-post)`}
                >
                  <Repeat className={`${iconStyles}`} />
                  <span className={`${statePostCount}`}>
                    {post?.reposts_and_quotes_count === 0
                      ? ""
                      : post?.reposts_and_quotes_count}
                  </span>
                </div>
                {/* Số lượng chia sẻ */}
                <div
                  className={`${wrapperIcon} text-(--color-user-action-post)`}
                >
                  <Send className={`${iconStyles} rotate-20`} />
                  <span className={`${statePostCount}`}>
                    {post?.reposts_and_quotes_count === 0
                      ? ""
                      : post?.reposts_and_quotes_count}
                  </span>
                </div>
              </CardFooter>
            </div>
          </div>

          <CardFooter className={`flex-col p-0`}>
            <Separator className={`mt-2`} />
            <div className="flex w-full py-4">
              <div className="flex flex-1 cursor-pointer items-center gap-1 text-(--text-color)">
                <p className="flex text-[15px] font-medium">Hàng đầu</p>
                <ChevronDown size={15} />
              </div>
              <div className="flex cursor-pointer items-center gap-1 text-(--color-time)">
                <p className="flex text-[15px]">Xem hoạt động</p>
                <ChevronRight size={15} />
              </div>
            </div>
          </CardFooter>
        </Card>

        <Separator />
        {/* Phần comment của chính bài post đó */}
        <div className={`h-dvh`}>
          {isLoading ? (
            <PostLoadingSkeleton count={6} />
          ) : (
            data?.data?.map((post) => (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
        {isOpen && post && <ReplyModal post={post} onClick={handleClose} />}
      </PostSlide>
    </div>
  );
}

export default PostDetail;

function HeaderDetailPage({ post }) {
  const navigator = useNavigate();

  const headerAction =
    "absolute size-5.5 cursor-pointer rounded-full bg-(--bg-primary) p-1 outline outline-(--outline-primary) hover:scale-[1.04]";

  return (
    <Header>
      <ArrowLeft
        className={`${headerAction} left-[5%]`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigator(-1);
        }}
      />
      <div className="my-4 text-center">
        <h1 className="text-[15px] font-semibold">Threads</h1>
        <h2 className="text-[12px] text-(--color-time)">
          {formatTime(post?.created_at)}
        </h2>
      </div>
      <Ellipsis className={`${headerAction} right-[5%]`} />
    </Header>
  );
}
