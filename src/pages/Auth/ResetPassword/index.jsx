import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Instagram, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validation/auth";
import { useResetPasswordMutation } from "@/services/Auth/resetPassword";

function ResetPasswordPage() {
    document.title = "Thread - Đặt lại mật khẩu";
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lấy token từ URL query params
    const token = searchParams.get("token");

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

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
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    // Kiểm tra token khi component mount
    useEffect(() => {
        if (!token) {
            setApiError("Liên kết đã hết hạn hoặc không hợp lệ");
        }
    }, [token]);

    const onSubmit = async (data) => {
        if (!token) {
            setApiError("Liên kết đã hết hạn hoặc không hợp lệ");
            return;
        }

        setApiError(null);
        setSuccessMessage(null);

        try {
            const response = await resetPassword({
                token: token,
                password: data.password,
                password_confirmation: data.confirmPassword,
            }).unwrap();

            if (response.success) {
                // Hiển thị message thành công
                setSuccessMessage("Tạo mật khẩu mới thành công, vui lòng đăng nhập.");

                // Chuyển về trang login sau 2 giây
                setTimeout(() => {
                    navigate("/login", {
                        state: {
                            message: "Tạo mật khẩu mới thành công, vui lòng đăng nhập.",
                        },
                    });
                }, 2000);
            }
        } catch (err) {
            console.error("Reset password failed:", err);

            // Xử lý lỗi từ API
            if (err.data?.errors) {
                const error = err.data.errors;
                const message = Object.values(error)[0];
                setApiError(message[0] || "Có lỗi xảy ra. Vui lòng thử lại!");
            } else {
                setApiError(
                    err.data?.message || "Liên kết đã hết hạn hoặc không hợp lệ",
                );
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Debounce validation messages (600-800ms)
    const [debouncedErrors, setDebouncedErrors] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedErrors(errors);
        }, 700);

        return () => clearTimeout(timer);
    }, [errors]);

    return (
        <div className="flex h-dvh w-dvw items-center justify-center bg-[#101010]">
            <main className="flex h-full w-92.5 flex-col items-center justify-center">
                <h1 className="mb-4 text-[16px] font-bold text-[#F3F5F7]">
                    Tạo mật khẩu mới
                </h1>

                {/* Form reset password */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    {/* Password */}
                    <div className="relative mb-2">
                        <Input
                            type={showPassword ? "text" : "password"}
                            {...registerField("password")}
                            className={`${inputStyles} pr-12 ${debouncedErrors.password ? "border-red-500" : ""}`}
                            placeholder="Mật khẩu mới"
                            disabled={isLoading || !token}
                            onCopy={(e) => e.preventDefault()}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#777777] transition-colors hover:text-white"
                            disabled={isLoading || !token}
                            tabIndex={-1}
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
                            placeholder="Xác nhận mật khẩu mới"
                            disabled={isLoading || !token}
                            onCopy={(e) => e.preventDefault()}
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
                        disabled={!isValid || isLoading || !token}
                    >
                        {isLoading ? "Đang đặt lại mật khẩu..." : "Tạo mật khẩu mới"}
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

export default ResetPasswordPage;
