import { Button } from "@/components/ui/button"
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"
import NotesPage from "./Pages/NotesPage"


function App() {
  return (
    
    <div className="flex min-h-svh w-full">
      <Toaster/>
      <NotesPage/>
    </div>
  )
}

export default App