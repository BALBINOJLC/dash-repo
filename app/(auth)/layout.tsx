import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GUX - Acceso",
  description: "Sistema de automatización para postulaciones a licitaciones públicas",
}

export default function AuthLayout({ children }) {
  return <div className="min-h-screen">{children}</div>
}
