import React from "react";
import Search from "./Search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Topbar = ({ title, search, onsearchChange, onNewNote }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b bg-background gap-4">
      <h2 className="text-sm font-medium shrink-0">{title}</h2>
      <div className="flex items-center gap-3 flex-1 justify-end">
        <Search value={search} onChange={onsearchChange} />
        {onNewNote && (
          <Button
            onClick={onNewNote}
            size="sm"
            className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white shrink-0"
          >
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
