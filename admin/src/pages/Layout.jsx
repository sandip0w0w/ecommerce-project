import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Layout() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading session...</p>
      </div>
    );
  }
  console.log("current User", user);
  if(!user) return <Navigate to = "/login" />
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="fixed top-0 left-0 right-0 w-full h-16 bg-white z-50 border-b border-gray-200">
        <NavBar />
      </header>

      <div className="flex pt-17 min-h-screen">
        
        <aside className="fixed sm:w-40 top-15 left-0 bottom-0 bg-white border-r border-gray-200 z-40 ">
          <SideBar />
        </aside>

        <main className="flex-1 w-fullborder ml-15 sm:ml-42">
          <div className="max-w-7xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}

export default Layout