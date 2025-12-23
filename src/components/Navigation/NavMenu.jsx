import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";

const itemStyles =
  "flex w-full cursor-pointer justify-between px-3 py-3.5 text-[16px] hover:bg-[rgba(255,255,255,0.04)] ";

export default function NavMenu({ children }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="ml-4 w-60 overflow-hidden rounded-2xl bg-[#262626] p-2 font-medium text-white"
      >
        <DropdownMenuItem
          className={`${itemStyles}`}
          onClick={() => {
            /** Dùng để mở ThemeModal */
          }}
        >
          Giao diện
          <ChevronRight className="size-5.5" />
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>
          Thông tin chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>Cài đặt</DropdownMenuItem>

        <DropdownMenuSeparator className={`h-px bg-[rgb(51,54,56)]`} />

        <DropdownMenuItem className={`${itemStyles}`}>
          Bảng feed
          <ChevronRight className="size-5.5" />
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>Đã lưu</DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles}`}>
          Đã thích
        </DropdownMenuItem>

        <DropdownMenuSeparator className={`h-px bg-[rgb(51,54,56)]`} />

        <DropdownMenuItem className={`${itemStyles}`}>
          Báo cạo sự cố
        </DropdownMenuItem>
        <DropdownMenuItem className={`${itemStyles} text-red-500`}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
