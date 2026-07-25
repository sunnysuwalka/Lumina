import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const AppLayout = () => {
  return (
    <div className='flex h-screen w-full bg-base overflow-hidden'>

            <Sidebar/>


        <main className='flex-1 overflow-y-auto p-2'>
            <Outlet/>
        </main>
      
    </div>
  )
}

export default AppLayout
