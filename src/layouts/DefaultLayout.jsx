// FontAwesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

import {
  ChevronRight,
  CircleEllipsis,
  FileText,
  Folders,
  Images,
  MapPin,
  SlidersVertical,
  Smile,
  TextAlignStart,
  X,
} from "lucide-react";
// React import
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "@/components/Navigation";
import LoginPanel from "@/components/LoginPanel";
import { useLazyGetUserInfoQuery } from "@/services/Auth/userApi";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/utils/auth";
import { setCredentials } from "@/store/slices/authSlice";
import Snowfall from "react-snowfall";
import { useUser } from "@/features/contexts/UserContext";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UseCreatePost } from "@/features/hooks/UseCreatePost";

export default function DefaultLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [getUserInfo] = useLazyGetUserInfoQuery();

  // Kiểm tra localStorage khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (token && !isAuthenticated) {
        try {
          // Gọi API để lấy user info
          const response = await getUserInfo().unwrap();

          if (response.success) {
            dispatch(
              setCredentials({
                user: response.data,
                accessToken: token,
              }),
            );
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          // Token invalid, sẽ tự động redirect về login qua baseQuery
        }
      }
    };

    checkAuth();
  }, [dispatch, isAuthenticated, getUserInfo]);

  const handleOpen = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (e.target.closest(".close-btn")) setIsOpen(false);
  };

  return (
    <>
      <div className={`w-full bg-(--bg-base)`}>
        {/* <Snowfall color="#dee4fd" /> */}
        <Navigation />
        <main
          className={`mx-auto flex h-dvh justify-center gap-3 overflow-auto`}
        >
          <div className="flex w-full max-w-160 flex-col">
            <Outlet />
          </div>
          {/* Chỉ hiển thị LoginPanel khi CHƯA đăng nhập */}
          {!isAuthenticated && <LoginPanel />}
        </main>

        {/* Add posts button */}
        {!isOpen && (
          <Button
            onClick={handleOpen}
            className={`fixed right-[3%] bottom-[3%] h-17 w-20.5 cursor-pointer rounded-2xl bg-(--bg-primary) text-(--color-icon-hover) outline outline-(--outline-primary) outline-solid hover:scale-110 max-md:hidden`}
          >
            <FontAwesomeIcon icon="fas fa-plus" className="fa-xl" />
          </Button>
        )}

        {isOpen && <AddPost onClick={handleClose} />}
      </div>
    </>
  );
}

function AddPost({ onClick }) {
  const { user } = useUser();
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    isFormValid,
    error,
  } = UseCreatePost({
    onSuccess: () => {
      // Đóng modal
      setTimeout(() => {
        onClick();
      }, 300);
    },
    onError: (err) => {
      console.error("Đã xảy ra lỗi: ", err);
    },
  });

  return (
    <>
      {/* Overlay */}
      {/* <div className="overlay fixed inset-0 z-100" > */}
      {/* Container */}
      <div className="animate-scale-from-bottom-right absolute right-6 bottom-6.5 w-123.5 overflow-auto rounded-2xl border-2 border-(--outline-primary) bg-(--bg-primary)">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-2">
          <button
            className="close-btn cursor-pointer p-1 font-bold"
            onClick={onClick}
          >
            X
          </button>
          <p className="text-[16px] font-bold">Thread mới</p>
          <div className="flex items-center">
            <Folders size={34} className="p-1.5" />
            <CircleEllipsis size={34} className="p-1.5" />
          </div>
        </header>
        <Separator className={`bg-(--outline-primary)`} />
        <form onSubmit={handleSubmit}>
          {/* Content Post */}
          <div className="flex gap-3 px-6 pt-4 pb-1.25">
            <Avatar className={`size-9`}>
              <AvatarImage
                src="/img/placeholder_avatar.jpg"
                className={`size-full`}
              />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold">{user?.username}</p>
                <ChevronRight className="mr-1 -ml-0.5 size-4" />
                <input
                  type="text"
                  placeholder="Thêm chủ đề"
                  className="px-0.5 py-px focus:outline-0"
                  value={formData.topic_name}
                  onChange={(e) =>
                    handleInputChange("topic_name", e.target.value)
                  }
                />
              </div>
              <main>
                <textarea
                  placeholder={`Có gì mới...?`}
                  className="w-full resize-none overflow-hidden focus:outline-0"
                  disabled={isLoading}
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                ></textarea>
              </main>
              {/* Action */}
              <div className="flex gap-1.5">
                <Images size={30} className={`${actionStyle}`} />
                <Smile size={30} className={`${actionStyle}`} />
                <TextAlignStart size={30} className={`${actionStyle}`} />
                <FileText size={30} className={`${actionStyle}`} />
                <MapPin size={30} className={`${actionStyle}`} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
              <p className="text-sm text-red-500">
                {error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"}
              </p>
            </div>
          )}

          {/* Modal Footer */}
          <footer className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2 text-(--color-time)">
              <SlidersVertical size={20} />
              <span className="font-semibold">
                Các lựa chọn để kiểm soát câu trả lời
              </span>
            </div>
            <Button
              className={`cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-(--text-color) select-none`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Đang đăng..." : "Đăng"}
            </Button>
          </footer>
        </form>
      </div>
      {/* </div> */}
    </>
  );
}
