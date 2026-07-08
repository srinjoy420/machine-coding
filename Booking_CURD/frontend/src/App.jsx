import React from 'react'
import { Route, Router, Navigate,Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import HomePage from './pages/HomePage'
import EventDetails from './pages/EventDetails'
import AddEvent from './pages/AddEvent'

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/event' element={<EventDetails/>}/>
          <Route path='/addevent' element={<AddEvent/>}/>
      </Routes>
    </div>

  )
}

export default App