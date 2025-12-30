import Header from "@/components/Header";
import PostSlide from "@/components/Posts/PostSlide";
import PostCard from "@/components/Posts/PostCard";
import { useGetFeedQuery } from "@/services/Home/postApi";
import { useGetUserInfoQuery } from "@/services/Auth/userApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostLoadingSkeleton from "@/components/Posts/PostLoadingSkeleton";

function HomePage() {
  const { currentData } = useGetUserInfoQuery();
  const { data, isLoading } = useGetFeedQuery({
    type: "for_you",
    page: 1,
    per_page: 40,
  });

  console.log(data);

  return (
    <>
      <Header title="Dành cho bạn" />
      <PostSlide>
        <div className="flex items-center px-6 py-4">
          <Avatar className="size-9">
            <AvatarImage
              src={
                currentData?.data.avatar_url ||
                "../../../public/img/placeholder_avatar.jpg"
              }
              alt={`Ảnh đại diện của ${currentData?.data.name}`}
              className="size-full object-cover"
            />
          </Avatar>
          <p
            className="mx-2 flex-1 pl-1 text-[15px] font-normal text-[#999]"
            onClick={() => {
              console.log("Có gì mới...");
            }}
          >
            Có gì mới?
          </p>
          <Button className="border border-(--outline-primary) bg-(--bg-primary) px-4 text-[15px] text-(--text-color)">
            Đăng
          </Button>
        </div>

        <Separator className="bg-(--outline-primary)" />

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
    </>
  );
}

export default HomePage;
