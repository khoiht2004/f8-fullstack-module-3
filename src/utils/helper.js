
// Helper function: Format time
function formatTime(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "vừa xong";
    if (diffMins < 60) return `${diffMins} phút`;
    if (diffHours < 24) return `${diffHours} giờ`;
    if (diffDays < 7) return `${diffDays} ngày`;

    return postTime.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "short",
    });
}

// Helper function: Format count (1.2K, 9.7K, etc)
function formatCount(count) {
    if (count < 1000) return count;
    if (count < 10000) return `${(count / 1000).toFixed(1)}K`;
    if (count < 1000000) return `${Math.floor(count / 1000)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
}

// Helper function: Get grid class based on image count
function getImageGridClass(count) {
    if (count === 1) return "grid grid-cols-1 aspect-[4/3]";
    if (count === 2) return "grid grid-cols-2";
    if (count === 3) return "grid grid-cols-2 grid-rows-2";
    return "grid grid-cols-2 grid-rows-2";
}

export { formatTime, formatCount, getImageGridClass } 