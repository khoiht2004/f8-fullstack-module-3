import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Instagram } from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/validation/auth";
import { useForgotPasswordMutation } from "@/services/Auth/forgotPassword";

function ForgotPasswordPage() {
  document.title = "Thread - Quên mật khẩu";

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const inputStyles =
    "text-semibold h-auto border-transparent focus:border focus:border-[#77777790] bg-[#1E1E1E] p-4 text-white";
  const text = "text-[15px] text-[#777777]";
  const hoverFooter = "transition hover:underline";

  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // React Hook Form với Zod validation
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await forgotPassword({
        email: data.email,
      }).unwrap();
      if (response.success) {
        // Hiển thị message thành công
        setSuccessMessage(
          "Liên kết đặt lại mật khẩu đã được gửi tới email của bạn.",
        );
      }
    } catch (err) {
      console.error("Forgot password failed:", err);
      const error = err.data.errors;
      const message = Object.values(error)[0];
      setApiError(message[0] || "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-[#101010]">
      <main className="flex h-full w-92.5 flex-col items-center justify-center">
        <h1 className="mb-4 text-[16px] font-bold text-[#F3F5F7]">
          Gửi liên kết đến Email:
        </h1>

        {/* Form forgot password */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Email */}
          <div className="mb-2">
            <Input
              type="email"
              {...registerField("email")}
              className={`${inputStyles} ${errors.email ? "border-red-500" : ""}`}
              placeholder="Nhập email để nhận liên kết đặt lại mật khẩu"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {apiError && (
            <p className="my-2 text-sm font-medium text-red-500">{apiError}</p>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="my-2 rounded-md border border-green-500/30 bg-green-500/10 p-3">
              <p className="text-sm text-green-500">{successMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="h-auto w-full cursor-pointer bg-white p-4 text-[16px] text-black hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Đang gửi liên kết..." : "Gửi liên kết"}
          </Button>
        </form>

        <p className={`${text} flex gap-3.5 py-3.5`}>
          <span>-----</span>
          <span>hoặc</span>
          <span>-----</span>
        </p>

        <div className="mb-6 flex w-full cursor-pointer items-center justify-start gap-3 rounded-2xl border border-[#77777790] bg-[#101010] p-5 pr-3">
          <Instagram className="size-10 text-white" />
          <span className={`${text} flex-1 pl-5 font-medium text-white`}>
            Tiếp tục bằng Instagram
          </span>
          <ChevronRight className="size-6 h-auto w-auto p-2 font-light text-[#777777]" />
        </div>

        <div className={`${text}`}>
          Bạn đã có tài khoản?
          <NavLink
            to="/login"
            className="ml-1 font-semibold text-white hover:underline"
          >
            Đăng nhập
          </NavLink>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 text-[12px] text-[#777777]">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-6">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="#" className={`${hoverFooter}`}>
              © 2025
            </a>
            <a href="#" className={`${hoverFooter}`}>
              Điều khoản của Threads
            </a>
            <a href="#" className={`${hoverFooter}`}>
              Chính sách quyền riêng tư
            </a>
            <a href="#" className={`${hoverFooter}`}>
              Chính sách cookie
            </a>
            <a href="#" className={`${hoverFooter}`}>
              Báo cáo sự cố
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ForgotPasswordPage;
