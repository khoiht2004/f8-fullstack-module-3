/* eslint-disable react-hooks/exhaustive-deps */
import Header from "@/components/Header";
import PostSlide from "@/components/Post/PostSlide.jsx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/features/contexts/UserContext";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bell, CircleEllipsis, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const tabs = [
  { key: "threads", label: "Thread", path: "" },
  { key: "replies", label: "Thread trả lời", path: "/replies" },
  { key: "media", label: "File phương tiện", path: "/media" },
  { key: "reposts", label: "Bài đăng lại", path: "/reposts" },
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("threads");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  console.log(user);

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/replies")) setActiveTab("replies");
    else if (path.endsWith("/media")) setActiveTab("media");
    else if (path.endsWith("/reposts")) setActiveTab("reposts");
    else setActiveTab("threads");
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    const basePath = `/${user.username}`;
    navigate(`${basePath}${tab.path}`, { replace: true });
  };

  const handlePostClick = (userId, postId) => {
    navigate(`/${user.username}/post-detail/${postId}`);
  };

  return (
    <>
      <Header title="Trang cá nhân" />
      <PostSlide>
        <Card className="h-dvh w-full rounded-none border-0 p-0 pt-1">
          {/* Phần heading */}
          <header className="px-6 pt-4 pb-2.5 text-white">
            <div className="flex h-[84px] items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-(--text-color)">
                  {user?.username || "Loading..."}
                </h1>
                <h2 className="text-(--color-time)">{user.name}</h2>
              </div>
              <Avatar className="h-[84px] w-[84px] overflow-hidden rounded-full outline outline-(--outline-primary)">
                <AvatarImage
                  src={user?.avatar_url || "/img/placeholder_avatar.jpg"}
                  className="object-cover"
                />
              </Avatar>
            </div>
            <div className="text-(--text-color t-4">{user?.bio}</div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-(--color-time)">79 người theo dõi</p>
              <div className="mt-3 flex cursor-pointer gap-2.5 text-[24px] text-(--text-color)">
                <Instagram />
                <Bell />
                <CircleEllipsis />
              </div>
            </div>
          </header>

          <section className="flex w-full gap-3 px-6 py-3">
            <Button className="w-[50%] cursor-pointer px-4" variant="outline">
              Theo dõi
            </Button>
            <Button className="w-[50%] cursor-pointer px-4 outline outline-[#77777790] outline-solid">
              Nhắc đến
            </Button>
          </section>

          {/* Phần tabs */}
          <nav className="w-full border-b border-[rgba(255,255,255,0.1)]">
            <ul className="flex">
              {tabs.map((tab) => (
                <li key={tab.key} className="flex-1">
                  <button
                    // onClick={() => handleTabClick(tab)}
                    className={`relative w-full cursor-pointer py-3 text-center transition-colors ${
                      activeTab === tab.key
                        ? "font-semibold text-white"
                        : "text-[#777] hover:text-white"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-white"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Phần nội dung tabs */}
          <section className="min-h-[300px]">
            {activeTab === "threads" && (
              <div>
                {/* {posts.length > 0 ? (
                  posts.map((post) => (
                    <PopularPost
                      key={post.id}
                      post={post}
                      className="my-6"
                      onClick={handlePostClick}
                    />
                  ))
                ) : (
                  <div className="py-12 text-center text-[#777]">
                    Chưa có bài viết nào
                  </div>
                )} */}
              </div>
            )}

            {activeTab === "replies" && (
              <div className="py-12 text-center">
                <h2 className="text-xl font-semibold text-white">
                  Thread trả lời
                </h2>
                <p className="mt-2 text-[#777]">Chức năng đang phát triển</p>
              </div>
            )}

            {activeTab === "media" && (
              <div className="py-12 text-center">
                <h2 className="text-xl font-semibold text-white">
                  File phương tiện
                </h2>
                <p className="mt-2 text-[#777]">Chức năng đang phát triển</p>
              </div>
            )}

            {activeTab === "reposts" && (
              <div className="py-12 text-center">
                <h2 className="text-xl font-semibold text-white">
                  Bài đăng lại
                </h2>
                <p className="mt-2 text-[#777]">Chức năng đang phát triển</p>
              </div>
            )}
          </section>
        </Card>
      </PostSlide>
    </>
  );
}

export default ProfilePage;
