import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand"
import toast from "react-hot-toast";

export const useEventStore = create((set, get) => ({
    events: [],
    isLoading: false,
    createEvent: async (data) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.post("/event/create", data)
            console.log(res.data.event);
            set((state) => {
                events: [...state.events, res.data.event]
            })
            toast.success(res.data.message || "event created succesfully")
        } catch (error) {
            console.error("error in creating an event")
            toast.error(error.response?.data?.message||"failed to create a event")

        }
        finally{
            set({isLoading:false})
        }
    },
    getAllEvent:async()=>{
        set({isLoading:true})
        try {
            const res=await axiosInstance.get("/event/all")
            set({events:res.data.events})
        } catch (error) {
            console.error("error in fetching events")
            toast.error(error.response?.data?.message||"failed to fetch events")
            
        }
        finally{
            set({isLoading:false})
        }
    }
}))