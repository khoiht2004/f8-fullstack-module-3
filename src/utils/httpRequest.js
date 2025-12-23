import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://threads.f8team.dev/api"
})

httpRequest.interceptors.response.use((response) => {
    return response.data
})

export default httpRequest