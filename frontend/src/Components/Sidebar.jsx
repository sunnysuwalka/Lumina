import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuBuilding2, LuPanelLeftOpen, LuPanelLeftClose, LuLayoutDashboard, LuUsers, LuTrophy, LuSettings, LuLogOut, LuCheck, LuMenu, LuX } from 'react-icons/lu'

const Sidebar = () => {
  const [Opened, setOpened] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false) 

  const location = useLocation()
  const navigate = useNavigate()
  const OpenTab = location.pathname 

  const handleConfirmLogout = () => {
    // 1. Asli logout logic: Local Storage clear karna zaroori hai!
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    setShowLogoutModal(false)
    setIsLoggedOut(true) 
  }

  // ================= CONDITIONAL RENDERING (LOGGED OUT VIEW) =================
  if (isLoggedOut) {
    return (
      <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-100 max-w-md w-full text-center flex flex-col items-center">
          
          <div className="w-16 h-16 bg-green-100 text-[#00A97F] rounded-full flex items-center justify-center mb-6">
            <LuCheck size={32} />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You are logged out</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for using Lumina. Have a great day!
          </p>

          <button 
            onClick={() => {
              setIsLoggedOut(false)
              navigate('/login') 
            }}
            className="w-full py-3 bg-[#00A97F] text-white font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Go to Login
          </button>
          
        </div>
      </div>
    )
  }

  // ================= NORMAL SIDEBAR VIEW =================
  return (
    <>
      {/* MOBILE TOP HEADER (Cleaned up from red to standard white) */}
      <div className={`md:hidden fixed top-0 w-full h-16 bg-white z-40 flex items-center justify-between px-4 border-b border-gray-200 shadow-sm transition-all ${Opened ? 'hidden' : 'flex'}`}>
        <span className='font-bold text-xl text-accent'>Lumina</span>
        <button onClick={() => setOpened(true)} className="p-2 text-gray-600 bg-gray-100 rounded-lg">
          <LuMenu size={24} />
        </button>
      </div>

      {/* MOBILE OVERLAY (Jab sidebar khulega mobile pe) */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity ${Opened ? 'block' : 'hidden'}`}
        onClick={() => setOpened(false)}
      ></div>

      {/* THE SIDEBAR ITSELF */}
      <div className={`fixed md:relative top-0 left-0 h-screen bg-white z-50 transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-gray-200 shadow-xl md:shadow-none py-5 px-3
        ${Opened ? "w-[75vw] md:w-[18vw] translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"}
      `}>

        {/* TOP SECTION: Menu */}
        <div className="flex flex-col gap-8">
          
          {/* Logo & Toggle Button */}
          <div className={`flex items-center px-2 ${Opened ? 'justify-between' : 'justify-center'}`}>
            {Opened && <span className='font-bold text-2xl text-accent'>Lumina</span>}
            
            {/* Mobile Close Button */}
            <button onClick={() => setOpened(false)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <LuX size={20} />
            </button>

            {/* Desktop Collapse Button */}
            <button onClick={() => setOpened(!Opened)} className="hidden md:block p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              {Opened ? <LuPanelLeftClose size={20} /> : <LuPanelLeftOpen size={20} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">

            <Link to={'/'}>
              <div className={`p-3 cursor-pointer flex items-center rounded-lg transition-colors ${OpenTab === '/' ? 'bg-[#00A97F] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'} ${Opened ? 'justify-start gap-4 px-4' : 'justify-center'}`}>
                <LuLayoutDashboard size={20} className="shrink-0" />
                {Opened && <span className='font-medium leading-none'>Dashboard</span>}
              </div>
            </Link>

            <Link to={'/team'}>
              <div className={`p-3 cursor-pointer flex items-center rounded-lg transition-colors ${OpenTab === '/team' ? 'bg-[#00A97F] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'} ${Opened ? 'justify-start gap-4 px-4' : 'justify-center'}`}>
                <LuUsers size={20} className="shrink-0" />
                {Opened && <span className='font-medium leading-none'>Team</span>}
              </div>
            </Link>

            <Link to={'/ranking'}>
              <div className={`p-3 cursor-pointer flex items-center rounded-lg transition-colors ${OpenTab === '/ranking' ? 'bg-[#00A97F] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'} ${Opened ? 'justify-start gap-4 px-4' : 'justify-center'}`}>
                <LuTrophy size={20} className="shrink-0" />
                {Opened && <span className='font-medium leading-none'>Ranking</span>}
              </div>
            </Link>

            <Link to={'/departments'}>
              <div className={`p-3 cursor-pointer flex items-center rounded-lg transition-colors ${OpenTab === '/departments' ? 'bg-[#00A97F] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'} ${Opened ? 'justify-start gap-4 px-4' : 'justify-center'}`}>
                <LuBuilding2 size={20} className="shrink-0" />
                {Opened && <span className='font-medium leading-none'>Departments</span>}
              </div>
            </Link>

            <Link to={'/settings'}>
              <div className={`p-3 cursor-pointer flex items-center rounded-lg transition-colors ${OpenTab === '/settings' ? 'bg-[#00A97F] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'} ${Opened ? 'justify-start gap-4 px-4' : 'justify-center'}`}>
                <LuSettings size={20} className="shrink-0" />
                {Opened && <span className='font-medium leading-none'>Settings</span>}
              </div>
            </Link>

          </div>
        </div>

        {/* BOTTOM SECTION: Sign Out */}
        <div className="mt-auto">
          <div 
            onClick={() => setShowLogoutModal(true)} 
            className={`p-3 cursor-pointer flex items-center rounded-lg text-red-500 hover:bg-red-50 transition-colors ${Opened ? 'justify-start gap-4 px-4' : 'justify-center'}`}
          >
            <LuLogOut size={20} className="shrink-0" />
            {Opened && <span className='font-medium leading-none'>Sign Out</span>}
          </div>
        </div>

      </div>

      {/* ================= LOGOUT CONFIRMATION MODAL ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <LuLogOut size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Sign Out</h2>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="flex-1 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar