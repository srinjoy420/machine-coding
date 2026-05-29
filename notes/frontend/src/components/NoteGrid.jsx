import React from "react";
import { Loader } from "lucide-react";
import EmptyState from "./EmptyState";
import NoteCard from "./NoteCard";

const NoteGrid = ({ notes, loading, onDelete, onEdit, onNewNote }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return <EmptyState onNewNote={onNewNote} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 overflow-y-auto flex-1">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default NoteGrid;
