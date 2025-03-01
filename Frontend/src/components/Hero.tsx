import ihubLogo from "@/assets/ihub-login.png"
import { Building2, Brain, MonitorCheckIcon as MonitorCode, FileText } from "lucide-react"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

export const Hero: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-5 pb-5 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center px-5 py-2 bg-white rounded-2xl border-2 border-black text-sm mb-8">
          <span className="text-black font-semibold text-xl">1000 Startups in 10 Years</span>
        </div>

        <h1 className="text-[4rem] font-bold mb-6 leading-tight">
          Empowering
          <br />
          Entrepreneurs Through <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2606f3] via-[#ff3636] to-[#269d0e]">
            Gen AI Innovation.
          </span>
        </h1>

        <p className="text-black font-medium text-xl mb-8">
          Join SNS iHub to access resources, mentors, and funding to launch and scale your business.
        </p>

        <button className="font-medium px-11 py-4 text-xl bg-black text-white rounded-full flex items-center hover:bg-white border border-black hover:text-black transition-colors duration-300">
          Let's Connect
          <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {/* Main iHub Logo */}
        <div className="absolute w-[400px] h-[400px] z-10">
          <img src={ihubLogo || "/placeholder.svg"} alt="iHub Logo" className="w-full h-full object-contain" />
        </div>

        <OrbitingCircles iconSize={40} radius={250}>
          <div className="p-4 bg-white rounded-full shadow-lg">
            <Building2 className="w-6 h-6 text-gray-800" />
          </div>
          <div className="p-4 bg-white rounded-full shadow-lg">
            <Brain className="w-6 h-6 text-gray-800" />
          </div>
          <div className="p-4 bg-white rounded-full shadow-lg">
            <MonitorCode className="w-6 h-6 text-gray-800" />
          </div>
          <div className="p-4 bg-white rounded-full shadow-lg">
            <FileText className="w-6 h-6 text-gray-800" />
          </div>
        </OrbitingCircles>

       
      </div>
    </div>
  )
}

