import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/store/slices/authSlice";
import { clearTokens } from "@/utils/auth";
import { ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const itemStyles =
  "flex w-full cursor-pointer justify-between px-3 py-3.5 text-[16px] hover:bg-[rgba(255,255,255,0.04)] ";

export default function NavMenu({ children, onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens
    clearTokens();
    // Clear Redux state
    dispatch(logout());
    // Chuyển hướng về trang login
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`ml-4 w-60 overflow-hidden rounded-2xl border border-(--outline-primary) bg-(--bg-nav) p-2 font-medium`}
      >
        <DropdownMenuItem className={`${itemStyles}`} onClick={onClick}>
          Giao diện
          <ChevronRight className="size-5.5" />
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>
          Thông tin chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>Cài đặt</DropdownMenuItem>

        <DropdownMenuSeparator className={`h-px bg-(--color-seperator)`} />

        <DropdownMenuItem className={`${itemStyles}`}>
          Bảng feed
          <ChevronRight className="size-5.5" />
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>Đã lưu</DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>
          Đã thích
        </DropdownMenuItem>

        <DropdownMenuSeparator className={`h-px bg-(--color-seperator)`} />

        <DropdownMenuItem className={`${itemStyles}`}>
          Báo cạo sự cố
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${itemStyles} text-red-500`}
          onClick={handleLogout}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
