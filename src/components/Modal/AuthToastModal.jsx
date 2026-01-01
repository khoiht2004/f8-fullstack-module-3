import { ChevronRight, Instagram } from "lucide-react";
import { Link } from "react-router";

function AuthToastModal() {
  return (
    // Overlay
    <div className="overlay fixed inset-0 z-100 flex items-center justify-center bg-[#000000b3]">
      {/* container */}
      <div className="max-w-130 rounded-2xl bg-(--bg-primary) px-14 pt-12 pb-14 text-center">
        <p className="pb-3 text-[32px] font-extrabold text-balance!">
          Bày tỏ nhiều hơn qua Threads
        </p>
        <p className="m-auto max-w-[336px] pb-8 text-[15px] font-normal text-pretty! text-(--color-time)">
          Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra,
          theo dõi những người bạn yêu mến và hơn thế nữa.
        </p>
        <div className="mb-6 flex w-full cursor-pointer items-center justify-start gap-3 rounded-2xl border border-(--outline-primary) bg-(--bg-auth-page) p-5 pr-3">
          <Instagram className="size-10" />
          <span
            className={`flex-1 pl-5 text-left text-[15px] font-medium text-[#777777]`}
          >
            Tiếp tục bằng Instagram
          </span>
          <ChevronRight className="size-6 h-auto w-auto p-2 font-light text-[#777777]" />
        </div>
        <Link to="/login" className="font-medium hover:underline">
          Đăng nhập để tiếp tục
        </Link>
      </div>
    </div>
  );
}
export default AuthToastModal;
