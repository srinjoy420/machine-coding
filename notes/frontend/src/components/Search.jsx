import React from 'react'
import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

const Search = ({ value, onChange }) => {
  return (
    <div className="relative w-56">
      <SearchIcon
        className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
      />

      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="pl-8"
      />
    </div>
  )
}

export default Search