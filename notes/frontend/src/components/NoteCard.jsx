import React from "react";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div
      className="flex flex-col gap-2 bg-background border rounded-xl p-4 hover:border-violet-300 transition-colors cursor-pointer"
      onClick={() => onEdit(note)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onEdit(note)}
    >
      <h3 className="text-sm font-medium leading-snug line-clamp-1">
        {note.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {note.description}
      </p>
      <div className="flex items-center justify-between mt-1">
        <StatusBadge status={note.status} />
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onEdit(note)}
            aria-label="Edit note"
          >
            <Pencil />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onDelete(note._id)}
            aria-label="Delete note"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
