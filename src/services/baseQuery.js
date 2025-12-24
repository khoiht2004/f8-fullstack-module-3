import httpRequest from "@/utils/httpRequest";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/utils/auth";

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

    // Kiểm tra nếu có body, header, truyền vào config
    if (isObj) {
        if (args.body) config.data = args.body;
        if (args.headers) config.headers = { ...config.headers, ...args.headers };
    }

    try {
        const data = await httpRequest(config);
        return { data };
    } catch (error) {
        // Xử lý lỗi 401 - Token hết hạn
        if (error.response?.status === 401) {
            const refreshToken = getRefreshToken();

            if (refreshToken) {
                try {
                    // Gọi API refresh token
                    const refreshResponse = await httpRequest({
                        url: "/auth/refresh",
                        method: "POST",
                        data: { refresh_token: refreshToken },
                    });

                    if (refreshResponse.success) {
                        const { access_token, refresh_token } = refreshResponse.data;

                        // Lưu token mới
                        setTokens(access_token, refresh_token);

                        // Retry request cũ với token mới
                        config.headers.Authorization = `Bearer ${access_token}`;
                        const retryData = await httpRequest(config);
                        return { data: retryData };
                    }
                } catch (refreshError) {
                    // Refresh token cũng hết hạn
                    clearTokens();
                    window.location.href = "/login";
                    return { error: refreshError };
                }
            } else {
                // Không có refresh token
                clearTokens();
                window.location.href = "/login";
            }
        }

        return { error };
    }
};

export default baseQuery;