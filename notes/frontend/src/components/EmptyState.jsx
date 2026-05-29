import React from 'react'
import {Button} from "@/components/ui/button"
import {Plus,Notebook} from "lucide-react"

const EmptyState = ({onNewNote}) => {
  return (
   <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
        <div  className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center">
            <Notebook  className="h-6 w-6 text-violet-400"/>
        </div>
        <div>
            <p className="text-sm text-muted-foreground">No Notes yet</p>
            <p className="text-xs text-muted-foreground mt-1">Create your first note</p>
        </div>
        <Button onClick={onNewNote} className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm h-8 px-4">
            <Plus/>
            New Note
        </Button>
    </div>
    
  )
}

export default EmptyState