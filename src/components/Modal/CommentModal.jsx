import {
  ChevronRight,
  CircleEllipsis,
  FileText,
  Images,
  MapPin,
  SlidersVertical,
  Smile,
  TextAlignStart,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { formatTime } from "@/utils/helper";
import { useUser } from "@/features/contexts/UserContext";
import { useSelector } from "react-redux";
import AuthToastModal from "./AuthToastModal";

function CommentModal({ post, onClick }) {
  const { user } = useUser();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bình luận thành công");
  };

  return (
    <>
      {isAuthenticated ? (
        // Overlay
        <div
          className="overlay animate-fade-in fixed inset-0 z-100 flex items-center justify-center bg-[#000000b3]"
          onClick={onClick}
        >
          {/* Container */}
          <div className="animate-scale-up max-w-155 min-w-130 overflow-auto rounded-2xl bg-(--bg-primary)">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-3">
              <button
                className="close-btn cursor-pointer text-[17px]"
                onClick={onClick}
              >
                Hủy
              </button>
              <p className="text-[16px] font-bold">Thread trả lời</p>
              <CircleEllipsis />
            </header>

            <Separator className={`bg-(--outline-primary)`} />

            <form onSubmit={handleSubmit}>
              {/* Content's post */}
              <div className="flex gap-3 px-6 pt-3">
                <Avatar className={`size-9`}>
                  <AvatarImage
                    src={post?.avatar_url || "/img/placeholder_avatar.jpg"}
                    className={`size-full`}
                  />
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold">{post?.user.username}</p>
                    <p className="flex-1 text-(--color-time)">
                      {formatTime(post?.updated_at)}
                    </p>
                  </div>
                  <main>{post?.content}</main>
                </div>
              </div>
              {/* Reply */}
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
                    />
                  </div>
                  <main>
                    <textarea
                      placeholder={`Trả lời ${post?.user.username}...`}
                      className="w-full resize-none overflow-hidden focus:outline-0"
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
              {/* Modal Footer */}
              <footer className="flex items-center justify-between p-6">
                <div className="flex items-center gap-2 text-(--color-time)">
                  <SlidersVertical size={20} />
                  <span className="font-semibold">
                    Các lựa chọn để kiểm soát câu trả lời
                  </span>
                </div>
                <Button
                  className={`cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-(--text-color)`}
                >
                  Đăng
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

export default CommentModal;
