import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from "./Pages/Login"
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import './App.css'
import Ranking from './Pages/Ranking'
import Team from './Pages/Team'
import Department from './Pages/Department'
import AppLayout from './Components/AppLayout'
import Settings from './Pages/Settings'

function App() {


  return (
    <Routes>
      <Route path='/Login' element={<Login/>} />
      <Route element={<AppLayout/>}>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/ranking' element={<Ranking/>} />
        <Route path='/team' element={<Team/>} />
        <Route path='/departments' element={<Department/>} />
        <Route path='/settings' element={<Settings/>} />
      </Route>
    </Routes>
  )
}

export default App
