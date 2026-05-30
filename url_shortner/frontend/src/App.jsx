import React from 'react'
import { HomePage } from './pages/HomePage'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div className='flex min-h-svh w-full'>
      <Toaster/>
      <HomePage/>
    </div>
  )
}

export default App