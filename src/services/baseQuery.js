import httpRequest from "@/utils/httpRequest";
import { getAccessToken } from "@/utils/auth";

const baseQuery = async (args) => {
    const isObj = typeof args === "object";

    const config = {
        url: isObj ? args.url : args,
        method: isObj ? args.method : "GET",
    };

    // Thêm access_token vào header nếu có
    const token = getAccessToken();
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    if (isObj) {
        // Xử lý params
        if (args.params) config.params = args.params;
        // Xử lý body
        if (args.body) config.data = args.body;
        // Xử lý headers tùy chỉnh
        if (args.headers) config.headers = { ...config.headers, ...args.headers };
    }

    try {
        const data = await httpRequest(config);
        return { data };
    } catch (error) {
        // httpRequest interceptor đã xử lý refresh token tự động
        // Chỉ cần trả về lỗi
        return { error };
    }
};

export default baseQuery;