import { Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/dashboard/Sidebar"
import DashboardHeader from "../components/dashboard/DashboardHeader"

const DashboardLayout = () => {
  const { user } = useAuth()

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="md:w-[285px] bg-white shadow-md border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader/>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
