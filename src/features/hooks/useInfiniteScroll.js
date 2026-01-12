import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook để xử lý infinite scroll sử dụng Intersection Observer API
 * @param {Function} onLoadMore - Callback được gọi khi cần load thêm data
 * @param {boolean} hasMore - Còn data để load không
 * @param {boolean} isLoading - Đang loading không
 * @param {number} threshold - Ngưỡng trigger (0-1), mặc định 0.1
 * @param {string} rootMargin - Margin của root, mặc định "100px"
 */
export const useInfiniteScroll = ({
    onLoadMore,
    hasMore,
    isLoading,
    threshold = 0.1,
    rootMargin = "100px",
}) => {
    const observerRef = useRef(null);
    const loadMoreRef = useRef(null);

    const handleObserver = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore && !isLoading) {
                onLoadMore();
            }
        },
        [hasMore, isLoading, onLoadMore]
    );

    useEffect(() => {
        const element = loadMoreRef.current;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(handleObserver, {
            threshold,
            rootMargin,
        });

        if (element) {
            observerRef.current.observe(element);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver, threshold, rootMargin]);

    return { loadMoreRef };
};

export default useInfiniteScroll;
