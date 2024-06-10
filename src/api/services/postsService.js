import { axiosInstance } from "../apiClient"
const getAllPosts = ({ data }) => axiosInstance.get("/posts", data) // https://api.escuelajs.co/api/v1/posts

export {
    getAllPosts
}