import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GUX - Dashboard",
  description: "Sistema de automatización para postulaciones a licitaciones públicas",
}

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="px-[40px]">{children}</div>
      </div>
    </div>
  )
}
