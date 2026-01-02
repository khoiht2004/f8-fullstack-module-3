import { useState, useCallback } from "react";

export function useAddPostModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    // Mở modal
    const handleOpen = useCallback((e) => {
        if (e) e.stopPropagation();
        setIsOpen(true);
    }, []);

    // Đóng modal
    const handleClose = useCallback((e) => {
        if (e) {
            e.stopPropagation();

            // Nếu click vào overlay (bên ngoài modal) hoặc vào nút đóng (hoặc con của nó)
            if (
                e.target.classList.contains("overlay") ||
                e.target.closest?.('.close-btn')
            ) {
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    }, []);

    // Toggle modal
    const handleToggle = useCallback((e) => {
        if (e) e.stopPropagation();
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        handleOpen,
        handleClose,
        handleToggle,
        setIsOpen,
    };
}