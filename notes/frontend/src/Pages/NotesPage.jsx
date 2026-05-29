import React, { useEffect, useMemo, useState } from "react";
import NoteGrid from "../components/NoteGrid";
import NoteFormDialog from "../components/NoteFormDialog";
import Topbar from "../components/Topbar";
import { Button } from "@/components/ui/button";
import { TodoStore } from "../store/Todostore.js";

const FILTERS = [
  { key: "All", label: "All" },
  { key: "InProgress", label: "In Progress" },
  { key: "Done", label: "Done" },
  { key: "Pending", label: "Pending" },
];

const NotesPage = () => {
  const {
    notes,
    isLoading,
    createNote,
    currentNote,
    setCurrentNote,
    getAllNotes,
    updateNote,
    deleteNote,
  } = TodoStore();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllNotes();
  }, []);

  const counts = useMemo(() => {
    const byStatus = (status) =>
      notes.filter((note) => note.status === status).length;
    return {
      All: notes.length,
      InProgress: byStatus("InProgress"),
      Done: byStatus("Done"),
      Pending: byStatus("Pending"),
    };
  }, [notes]);

  const filteredNotes = useMemo(() => {
    let result = notes;
    if (activeFilter !== "All") {
      result = result.filter((note) => note.status === activeFilter);
    }
    const q = search.trim().toLowerCase();
    if (!q) return result;
    return result.filter(
      (note) =>
        note.title?.toLowerCase().includes(q) ||
        note.description?.toLowerCase().includes(q)
    );
  }, [search, notes, activeFilter]);

  const openNewNote = () => {
    setCurrentNote({ title: "", description: "", status: "InProgress" });
  };

  const openNote = (note) => {
    setCurrentNote(note);
  };

  const handleSave = async (data, id) => {
    if (id) return updateNote(data, id);
    return createNote(data);
  };

  const topBarTitle =
    activeFilter === "All"
      ? "All Notes"
      : activeFilter === "InProgress"
        ? "In Progress Notes"
        : activeFilter === "Done"
          ? "Done Notes"
          : activeFilter === "Pending"
            ? "Pending Notes"
            : "All Notes";

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden w-full">
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          title={topBarTitle}
          search={search}
          onsearchChange={setSearch}
          onNewNote={openNewNote}
        />
        <div className="flex gap-2 px-5 py-2 border-b bg-background">
          {FILTERS.map(({ key, label }) => (
            <Button
              key={key}
              variant={activeFilter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(key)}
            >
              {label} ({counts[key]})
            </Button>
          ))}
        </div>
        <NoteGrid
          notes={filteredNotes}
          loading={isLoading}
          onDelete={deleteNote}
          onEdit={openNote}
          onNewNote={openNewNote}
        />
        <NoteFormDialog
          open={currentNote !== null}
          note={currentNote}
          onClose={() => setCurrentNote(null)}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NotesPage;
