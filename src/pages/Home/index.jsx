import Header from "@/components/Header";
import PostSlide from "@/components/post/PostSlide";
import PostCard from "@/components/post/PostCard";
import { useGetUserInfoQuery } from "@/services/Auth/userApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostLoadingSkeleton from "@/components/post/PostLoadingSkeleton";
import { useSelector } from "react-redux";
import AddPostModal from "@/components/Modal/AddPostModal";
import { useAddPostModal } from "@/features/hooks/UseAddPostModal";
import { useGetFeedQuery } from "@/services/Posts/postApi";

function HomePage() {
  const { isOpen, handleClose, handleOpen } = useAddPostModal();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { currentData } = useGetUserInfoQuery();
  const { data, isLoading } = useGetFeedQuery({
    type: "for_you",
    page: 1,
    per_page: 40,
  });

  return (
    <>
      <Header title="Dành cho bạn" />
      <PostSlide>
        {isAuthenticated && (
          <>
            <div className="flex items-center px-6 py-4">
              <Avatar className="size-9">
                <AvatarImage
                  src={
                    currentData?.data.avatar_url ||
                    "/img/placeholder_avatar.jpg"
                  }
                  alt={`Ảnh đại diện của ${currentData?.data.name}`}
                  className="size-full object-cover"
                />
              </Avatar>
              <p
                className="mx-2 flex-1 pl-1 text-[15px] font-normal text-[#999]"
                onClick={handleOpen}
              >
                Có gì mới?
              </p>
              <Button
                className="cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-[15px] text-(--text-color) active:scale-[0.9]"
                onClick={handleOpen}
              >
                Đăng
              </Button>
            </div>
            <Separator className="bg-(--outline-primary)" />
          </>
        )}
        {/* Posts... */}
        <div>
          {isLoading ? (
            <PostLoadingSkeleton count={7} />
          ) : (
            data?.data?.map((post) => (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
      </PostSlide>

      {isOpen && <AddPostModal onClick={handleClose} />}
    </>
  );
}

export default HomePage;
