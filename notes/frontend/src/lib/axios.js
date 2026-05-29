import axios from "axios";

export const axiosinstance=axios.create({
    baseURL:"http://localhost:3000/api/v1/todo",
    withCredentials:true
})