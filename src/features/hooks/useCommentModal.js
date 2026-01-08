import { useState } from "react";

/**
 * Custom hook để quản lý trạng thái đóng/mở CommentModal
 * @returns {Object} - { isOpen, handleOpen, handleClose }
 */
function useCommentModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (e) => {
        e.stopPropagation();
        const postId = e.currentTarget.dataset.postId;
        localStorage.setItem("postId", postId);
        setIsOpen(true);
    };

    const handleClose = (e) => {
        e?.stopPropagation();

        // Nếu không có event thì đóng luôn
        if (!e) {
            localStorage.removeItem("postId");
            setIsOpen(false);
            return;
        }

        // Nếu có event thì check điều kiện
        if (
            e.target.classList.contains("overlay") ||
            e.target.closest?.(".close-btn")
        ) {
            localStorage.removeItem("postId");
            setIsOpen(false);
        }
    };

    return { isOpen, handleOpen, handleClose };
}

export default useCommentModal;
