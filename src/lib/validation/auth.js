import { z } from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Tên hiển thị phải có ít nhất 3 ký tự")
            .max(50, "Tên hiển thị không được quá 50 ký tự")
            .regex(/^[a-zA-Z0-9_]+$/, "Tên hiển thị chỉ được chứa chữ, số và dấu gạch dưới"),

        email: z
            .string()
            .min(1, "Email không được để trống")
            .email("Email không hợp lệ"),

        password: z
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
            .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số")
            .regex(/[@$!%*?&#]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"),

        confirmPassword: z
            .string()
            .min(1, "Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });