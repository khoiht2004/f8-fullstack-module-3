import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Instagram, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { setTokens } from "@/utils/auth";
import { useRegisterMutation } from "@/services/Auth/registerApi";

function RegisterPage() {
  document.title = "Thread - Đăng nhập";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();

  const inputStyles =
    "text-semibold h-auto border-transparent focus:border focus:border-[#77777790] bg-[#1E1E1E] p-4 text-white";
  const text = "text-[15px] text-[#777777]";
  const hoverFooter = "transition hover:underline";

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const isValid =
      formData.username.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.confirmPassword.trim() !== "";
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      if (response.success) {
        const { user, access_token, refresh_token } = response.data;

        // Lưu tokens vào localStorage
        setTokens(access_token, refresh_token);

        // Lưu user info vào Redux
        dispatch(
          setCredentials({
            user,
            accessToken: access_token,
          }),
        );

        // Redirect về trang home
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-[#101010]">
      <main className="flex h-full w-92.5 flex-col items-center justify-center">
        <h1 className="mb-4 text-[16px] font-bold text-[#F3F5F7]">
          Đăng ký tài khoản mới
        </h1>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className={`${inputStyles} mb-2`}
            placeholder="Tên người dùng, số điện thoại"
            disabled={isLoading}
          />

          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`${inputStyles}`}
            placeholder="Email"
            disabled={isLoading}
          />

          {/* Hide/Show password*/}
          <div className="relative my-2">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`${inputStyles} pr-12`}
              placeholder="Mật khẩu"
              disabled={isLoading}
              onCopy={(e) => e.preventDefault()} // Không cho phép copy
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#777777] transition-colors hover:text-white"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className={`${inputStyles} mb-2`}
            placeholder="Nhập lại mật khẩu"
            disabled={isLoading}
            onCopy={(e) => e.preventDefault()} // Không cho phép copy
          />

          {error && (
            <p className="my-2 text-sm font-medium text-red-500">
              {error.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!"}
            </p>
          )}

          <Button
            type="submit"
            className="h-auto w-full cursor-pointer bg-white p-4 text-[16px] text-black hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isFormValid || isLoading}
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

      {/* QR */}
    </div>
  );
}

export default RegisterPage;
