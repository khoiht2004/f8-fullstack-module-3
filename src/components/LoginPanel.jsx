import { Instagram } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";

function LoginPanel() {
  const text = "text-[15px] text-[#777777]";
  const navigation = useNavigate();

  return (
    <>
      {/* Button */}
      <Button
        variant="secondary"
        className="fixed top-[3%] right-[3%] hidden cursor-pointer bg-(--foreground) text-(--background) hover:bg-(--foreground) max-xl:block"
        onClick={() => navigation("/login")} // Chuyển hướng về trang login
      >
        Đăng nhập
      </Button>
      {/* Panel */}
      <div className="z-10 flex flex-col max-xl:hidden">
        <main className="fixed top-15 w-[337.6px] rounded-3xl border border-(--outline-primary) bg-(--bg-primary) px-6 pt-8 pb-7 text-center">
          <h1 className="text-xl font-bold text-pretty! text-(--text-color)">
            Đăng nhập hoặc đăng ký Threads
          </h1>
          <p className={`${text} mt-3`}>
            Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
          </p>
          <div className="my-6 flex items-center justify-start gap-3 rounded-2xl bg-(--bg-tertiary) px-7 py-6">
            <Instagram className="size-6.5" />
            <span className={`${text}`}>Tiếp tục bằng Instagram</span>
          </div>
          <NavLink to="/login" className={`${text}`}>
            Đăng nhập bằng tên người dùng
          </NavLink>
        </main>
      </div>
    </>
  );
}

export default LoginPanel;
