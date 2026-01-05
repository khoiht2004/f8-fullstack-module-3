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
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUser } from "@/features/contexts/UserContext";
import { useSelector } from "react-redux";
import AuthToastModal from "./AuthToastModal";
import { UseCreatePost } from "@/features/hooks/UseCreatePost";

function AddPostModal({ onClick }) {
  const { user } = useUser();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
      {isAuthenticated ? (
        // Overlay
        <div
          className="overlay animate-fade-in fixed inset-0 z-100 flex items-center justify-center bg-[#000000b3]"
          onClick={onClick}
        >
          {/* Container */}
          <div className="animate-scale-up w-155 overflow-auto rounded-2xl bg-(--bg-primary)">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-3">
              <button
                className="close-btn cursor-pointer text-[17px]"
                onClick={onClick}
              >
                Hủy
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
                      placeholder="Có gì mới...?"
                      className="w-full resize-none overflow-hidden focus:outline-0"
                      disabled={isLoading}
                      value={formData.content}
                      onChange={(e) => {
                        handleInputChange("content", e.target.value);

                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                    />
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
        </div>
      ) : (
        <AuthToastModal />
      )}
    </>
  );
}

export default AddPostModal;
