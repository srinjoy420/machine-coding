import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useUrlStore = create((set) => ({
  isLoading: false,
  currentLink: null,

  handleShortUrl: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/", data);
      set({ currentLink: res.data.shortUrl });
      toast.success("Short URL generated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },
}));