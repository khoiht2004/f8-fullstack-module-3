/* eslint-disable no-unsafe-optional-chaining */
import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://api01.f8team.dev/api",
});

// Interceptor để thêm access token vào header
httpRequest.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Biến để quản lý trạng thái refresh token
let isRefreshing = false;
let failedQueue = [];

// Xử lý queue khi refresh token thành công
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Interceptor để xử lý response và refresh token
httpRequest.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem("refreshToken");

        // Kiểm tra nếu là lỗi 401 và có refresh token
        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            // Đánh dấu request này đã được retry để tránh loop vô hạn
            originalRequest._retry = true;

            if (isRefreshing) {
                // Nếu đang refresh, thêm request vào queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return httpRequest.request(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            // Bắt đầu quá trình refresh token
            isRefreshing = true;

            try {
                const response = await axios.post(
                    `${httpRequest.defaults.baseURL}/auth/refresh-token`,
                    {
                        refresh_token: refreshToken,
                    }
                );

                const { access_token, refresh_token } = response?.data?.data;

                // Lưu token mới vào localStorage
                localStorage.setItem("accessToken", access_token);
                localStorage.setItem("refreshToken", refresh_token);

                // Cập nhật header cho request hiện tại
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                // Xử lý tất cả các request trong queue
                processQueue(null, access_token);

                // Reset trạng thái
                isRefreshing = false;

                // Retry request ban đầu
                return httpRequest.request(originalRequest);
            } catch (refreshError) {
                // Refresh token thất bại
                processQueue(refreshError, null);
                isRefreshing = false;

                // Xóa tokens
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                // Redirect về trang login
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        // Trả về lỗi nếu không phải 401 hoặc không có refresh token
        return Promise.reject(error);
    }
);

export default httpRequest;