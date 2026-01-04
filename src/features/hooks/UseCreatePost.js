import { useState, useEffect, useCallback } from "react";
import { useCreatePostMutation } from "@/services/Posts/postApi";

export function UseCreatePost(options = {}) {
    const { onSuccess, onError } = options;

    // RTK Query mutation
    const [createPost, { isLoading, isSuccess, error, reset }] =
        useCreatePostMutation();

    // Form state
    const [formData, setFormData] = useState({
        content: "",
        topic_name: "",
    });

    // Validation state
    const [isFormValid, setIsFormValid] = useState(false);

    // Validate form khi formData thay đổi
    useEffect(() => {
        const isValid = formData.content.trim().length > 0;
        setIsFormValid(isValid);
    }, [formData]);

    // Handle success
    useEffect(() => {
        if (isSuccess) {
            // Reset form
            setFormData({
                content: "",
                topic_name: "",
            });

            // Reset mutation state
            reset();

            // Gọi callback nếu có
            onSuccess?.();
        }
    }, [isSuccess, onSuccess, reset]);

    // Handle error
    useEffect(() => {
        if (error) {
            onError?.(error);
        }
    }, [error, onError]);

    // Update field value
    const handleInputChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    // Update multiple fields
    const setFormValues = useCallback((values) => {
        setFormData((prev) => ({
            ...prev,
            ...values,
        }));
    }, []);

    // Reset form manually
    const resetForm = useCallback(() => {
        setFormData({
            content: "",
            topic_name: "",
        });
        reset();
    }, [reset]);

    // Submit handler
    const handleSubmit = useCallback(
        async (e) => {
            if (e) e.preventDefault();

            if (!isFormValid || isLoading) {
                console.warn("⚠️ Form không hợp lệ hoặc đang submit");
                return;
            }

            try {
                // Chuẩn bị data
                const postData = {
                    content: formData.content.trim(),
                };

                // Chỉ thêm topic_name nếu có
                if (formData.topic_name.trim()) {
                    postData.topic_name = formData.topic_name.trim();
                }

                console.log("📤 Gửi data:", postData);

                // Gọi API
                const response = await createPost(postData).unwrap();

                console.log("✅ Đăng bài thành công:", response);

                return response;
            } catch (err) {
                console.error("❌ Lỗi khi đăng bài:", {
                    status: err.status,
                    data: err.data,
                    message: err.data?.message,
                    errors: err.data?.errors,
                });

                throw err;
            }
        },
        [formData, isFormValid, isLoading, createPost]
    );

    return {
        // Form data
        formData,
        setFormData,
        handleInputChange,
        setFormValues,

        // Validation
        isFormValid,

        // Submit
        handleSubmit,
        resetForm,

        // Status
        isLoading,
        isSuccess,
        error,

        // RTK Query helpers
        reset,
    };
}