import { create } from "zustand";
import { axiosinstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const TodoStore = create((set, get) => ({
  isLoading: false,
  notes: [],
  currentNote: null,
  isdeleating: false,

  setCurrentNote: (note) => set({ currentNote: note }),

  createNote: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosinstance.post("/create", data);
      set((state) => ({
        notes: [...state.notes, res.data.note],
      }));
      toast.success("Note created successfully");
      return true;
    } catch (error) {
      console.log("there is a problem of creating a note", error);
      toast.error("there is a problem of creating a note");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllNotes: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosinstance.get("/getall");
      set({ notes: res.data.notes ?? [] });
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        set({ notes: [] });
        return true;
      }
      console.log("there is a problem get all notes", error);
      toast.error("there is a problem get all notes");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  searStatus: async (status) => {
    set({ isLoading: true });
    try {
      const res = await axiosinstance.get(`/status?status=${status}`);
      set({ notes: res.data.notes ?? [] });
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        set({ notes: [] });
        return true;
      }
      console.log("there is a error having a status find", error);
      toast.error("there is a error having a status find");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateNote: async (data, id) => {
    set({ isLoading: true });
    try {
      const res = await axiosinstance.put(`/update/${id}`, data);
      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === id ? res.data.updatedNote : note
        ),
      }));
      toast.success("Note updated successfully");
      return true;
    } catch (error) {
      console.log("there is a problem in updating a note", error);
      toast.error("there is a problem in updating a note");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteNote: async (id) => {
    set({ isdeleating: true });
    try {
      await axiosinstance.delete(`/delete/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id),
        currentNote:
          state.currentNote?._id === id ? null : state.currentNote,
      }));
      toast.success("Note deleted successfully");
      return true;
    } catch (error) {
      console.log("there is a error in deleting a note", error);
      toast.error("there is a error in deleting a note");
      return false;
    } finally {
      set({ isdeleating: false });
    }
  },
}));
