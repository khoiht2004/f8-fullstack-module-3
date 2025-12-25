import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Instagram, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "@/services/Auth/registerApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation/auth";

function RegisterPage() {
  document.title = "Thread - Đăng ký";
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const inputStyles =
    "text-semibold h-auto border-transparent focus:border focus:border-[#77777790] bg-[#1E1E1E] p-4 text-white";
  const text = "text-[15px] text-[#777777]";
  const hoverFooter = "transition hover:underline";

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // React Hook Form với Zod validation
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await register({
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      }).unwrap();

      if (response.success) {
        // Hiển thị message thành công
        setSuccessMessage("Đăng ký tài khoản thành công");

        // Clear form sau 2 giây và chuyển về login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Register failed:", err);
      const error = err.response?.data?.errors;
      const message = Object.values(error)[0];
      setApiError(message[0] || "Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  // Debounce validation messages (600-800ms)
  const [debouncedErrors, setDebouncedErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedErrors(errors);
    }, 700);

    // Clean up
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-[#101010]">
      <main className="flex h-full w-92.5 flex-col items-center justify-center">
        <h1 className="mb-4 text-[16px] font-bold text-[#F3F5F7]">
          Đăng ký tài khoản mới
        </h1>

        {/* Form đăng ký */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Username */}
          <div className="mb-2">
            <Input
              type="text"
              {...registerField("username")}
              className={`${inputStyles} ${debouncedErrors.username ? "border-red-500" : ""}`}
              placeholder="Tên hiển thị"
              disabled={isLoading}
            />
            {debouncedErrors.username && (
              <p className="mt-1 text-xs text-red-500">
                {debouncedErrors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <Input
              type="email"
              {...registerField("email")}
              className={`${inputStyles} ${debouncedErrors.email ? "border-red-500" : ""}`}
              placeholder="Email"
              disabled={isLoading}
            />
            {debouncedErrors.email && (
              <p className="mt-1 text-xs text-red-500">
                {debouncedErrors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-2">
            <Input
              type={showPassword ? "text" : "password"}
              {...registerField("password")}
              className={`${inputStyles} pr-12 ${debouncedErrors.password ? "border-red-500" : ""}`}
              placeholder="Mật khẩu"
              disabled={isLoading}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#777777] transition-colors hover:text-white"
              disabled={isLoading}
              tabIndex={-1} // Khi người dùng ấn tab sẽ k trỏ vào icon này
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
            {debouncedErrors.password && (
              <p className="mt-1 text-xs text-red-500">
                {debouncedErrors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <Input
              type="password"
              {...registerField("confirmPassword")}
              className={`${inputStyles} ${debouncedErrors.confirmPassword ? "border-red-500" : ""}`}
              placeholder="Xác nhận mật khẩu"
              disabled={isLoading}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
            {debouncedErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {debouncedErrors.confirmPassword.message}
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
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
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

export default RegisterPage;
