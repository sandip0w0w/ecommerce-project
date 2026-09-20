import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Layout() {
  const { user } = useAuth();
  if(!user) return <Navigate to = "/login" />
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-1000">
      <header className="fixed top-0 left-0 right-0 w-full h-16 bg-white z-50 border-b border-gray-200">
        <NavBar />
      </header>

      <div className="flex pt-17 min-h-screen">
        
        <aside className="fixed sm:w-40 top-15 left-0 bottom-0 bg-white border-r border-gray-200 z-40 ">
          <SideBar />
        </aside>

        <main className="flex-1 w-fullborder border-red-500 ml-15 sm:ml-42">
          <div className="max-w-7xl border border-red-600">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}

export default Layout