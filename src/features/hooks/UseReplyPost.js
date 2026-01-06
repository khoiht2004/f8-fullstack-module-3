import { useState, useEffect } from "react";
import { useReplyPostMutation } from "@/services/Posts/postApi";

export const useReplyPost = () => {
    const [replyPost, { isLoading, error, isSuccess }] = useReplyPostMutation();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        content: "",
        topic_name: "",
    });

    // Validate form mỗi khi formData thay đổi
    useEffect(() => {
        const isValid = formData.content.trim() !== "";
        setIsFormValid(isValid);
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e, postId) => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            // Tạo FormData theo đúng API spec (multipart/form-data)
            const formDataToSend = new FormData();
            formDataToSend.append("content", formData.content.trim());

            // Chỉ thêm topic_name nếu có giá trị
            if (formData.topic_name.trim()) {
                formDataToSend.append("topic_name", formData.topic_name.trim());
            }

            // Gọi API với đúng cú pháp RTK Query
            const response = await replyPost({
                postId,
                postData: formDataToSend,
            }).unwrap();

            return response;
        } catch (error) {
            console.error("Lỗi khi reply post:", error);
            throw error;
        }
    };

    const resetForm = () => {
        setFormData({
            content: "",
            topic_name: "",
        });
        setIsFormValid(false);
    };

    return {
        formData,
        isFormValid,
        isLoading,
        error,
        isSuccess,
        handleInputChange,
        handleSubmit,
        resetForm,
    };
};
