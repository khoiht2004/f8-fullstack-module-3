// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import httpRequest from "@/utils/httpRequest";

// const baseQuery = fetchBaseQuery({
//     baseUrl: "https://api01.f8team.dev/api"
// });

const baseQuery = async (args) => {
    /** 
     * Nếu là obj -> vì trong trường hợp nếu chỉ query, thì chỉ bắn đi 1 chuỗi
     * nhưng khi mutaion sẽ bắn đi 1 obj -> khi đó sẽ lỗi
    */
    const isObj = typeof args === 'object';

    const config = {
        url: isObj ? args.url : args,
        method: isObj ? args.method : "GET"
    }
    /**
     * Kiểm tra nếu có thì mới bắn đi -> kp lúc nào người dùng cũng truyền body, header
     */
    if (isObj) {
        if (args.body) config.data = args.body;
        if (args.headers) config.headers = args.headers;
    };

    try {
        const data = await httpRequest(config);
        return { data };
    } catch (error) {
        return { error }
    }
};

export default baseQuery