"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { User, Shield, Award } from "lucide-react"

export default function RoleSelection() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  const roles = [
    { id: "user", name: "User", icon: User, color: " from-[#2606f3] via-[#ff3636] to-[#269d0e]" },
    { id: "admin", name: "Admin", icon: Shield, color: "from-[#2606f3] via-[#ff3636] to-[#269d0e]" },
    { id: "superadmin", name: "Super Admin", icon: Award, color: "from-[#2606f3] via-[#ff3636] to-[#269d0e]" },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-2">Select Your Role</h1>
        <p className="text-black text-center mb-10">Choose the appropriate access level to continue</p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center items-center">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <Button
                  variant="outline"
                  className={`w-full md:flex-1 h-20 relative overflow-hidden group border-2`}
                >
                  <div
                    className={`absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors" />
                  <div className="relative flex items-center justify-start gap-4 px-4">
                    <div className={`p-2 rounded-full bg-white group-hover:bg-white/20 transition-colors`}>
                      <Icon className="h-6 w-6 text-black" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-lg text-black">{role.name}</p>
                      <p className="text-xs text-black group-hover:text-white/90">
                        {role.id === "user" && "Basic access rights"}
                        {role.id === "admin" && "Manage users and content"}
                        {role.id === "superadmin" && "Full system control"}
                      </p>
                    </div>
                  </div>
                </Button>
                {hoveredRole === role.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

