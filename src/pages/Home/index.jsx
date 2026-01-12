import { useState, useCallback, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import PostSlide from "@/components/Post/PostSlide";
import PostCard from "@/components/Post/PostCard";
import { useGetUserInfoQuery } from "@/services/Auth/userApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostLoadingSkeleton from "@/components/Post/PostLoadingSkeleton";
import { useSelector } from "react-redux";
import AddPostModal from "@/components/Modal/AddPostModal";
import { useAddPostModal } from "@/features/hooks/UseAddPostModal";
import { useGetFeedQuery } from "@/services/Posts/postApi";
import { useInfiniteScroll } from "@/features/hooks/useInfiniteScroll";

const PER_PAGE = 10;
const STORAGE_KEY = "homePage_state";

function HomePage() {
  const { isOpen, handleClose, handleOpen } = useAddPostModal();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { currentData } = useGetUserInfoQuery();

  // Restore page từ sessionStorage khi back
  const getInitialPage = () => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { page: savedPage } = JSON.parse(saved);
      return savedPage || 1;
    }
    return 1;
  };

  // Infinite scroll state
  const [page, setPage] = useState(getInitialPage);
  const { data, isLoading, isFetching } = useGetFeedQuery({
    type: "for_you",
    page,
    per_page: PER_PAGE,
  });

  // Lưu page state khi thay đổi
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ page }));
  }, [page]);

  // Kiểm tra còn data để load không
  const hasMore = data?.data?.length >= page * PER_PAGE;

  // Callback load thêm posts
  const handleLoadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  // Infinite scroll hook
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    isLoading: isFetching,
  });

  // Memoize danh sách posts để tránh re-render không cần thiết
  const posts = useMemo(() => data?.data || [], [data?.data]);

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
          {isLoading && page === 1 ? (
            <PostLoadingSkeleton count={7} />
          ) : (
            <>
              {posts.map((post) => (
                <div key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
              {/* Sentinel element for infinite scroll */}
              <div ref={loadMoreRef} className="h-10">
                {isFetching && page > 1 && <PostLoadingSkeleton count={2} />}
              </div>
            </>
          )}
        </div>
      </PostSlide>

      {isOpen && <AddPostModal onClick={handleClose} />}
    </>
  );
}

export default HomePage;
