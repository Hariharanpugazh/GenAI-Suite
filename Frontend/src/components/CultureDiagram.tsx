import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import targetIcon from '../assets/purpose.svg'
import processIcon from '../assets/process.svg'
import peopleIcon from '../assets/people.svg'

const CultureDiagram = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const items = [
    {
      title: "Purpose",
      description: "Our vision drives every innovation, ensuring that AI solutions align with real-world needs.",
      icon: targetIcon,
      color: "#4B0082", // Indigo
      gradient: "from-indigo-600 to-purple-600",
      textColor: "text-indigo-600",
      gradientColors: ["#4B0082", "#8A2BE2"], // Indigo to purple
    },
    {
      title: "Process",
      description: "From ideation to execution, our structured approach ensures efficiency and precision",
      icon: processIcon,
      color: "#FF1493", // Pink
      gradient: "from-pink-600 to-red-500",
      textColor: "text-pink-600",
      gradientColors: ["#FF1493", "#FF0000"], // Pink to red
    },
    {
      title: "People",
      description: "Behind every breakthrough is a team of passionate minds",
      icon: peopleIcon,
      color: "#FFA500", // Orange
      gradient: "from-orange-500 to-green-500",
      textColor: "text-orange-500",
      gradientColors: ["#FFA500", "#00FF00"], // Orange to green
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-8 text-center" ref={ref}>
      <h1 className="text-3xl font-bold mb-2">3P Culture</h1>
      <p className="text-gray-700 mb-12">Driven by Vision, Perfected by Process, Powered by People</p>
      
      <div className="relative">
        {/* Horizontal Connecting Line */}
        <div className="absolute top-1/2 left-[6%] right-[6%] h-[1px] bg-gray-300 z-0 -mt-16" />
        
        <div className="flex justify-between items-start max-w-4xl mx-auto relative z-10">
          {items.map((item, index) => (
            <div key={index} className="w-64 relative">
              {/* Semi-Circle Border */}
              <svg 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 z-0"
                viewBox="0 0 256 128"
              >
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={item.gradientColors[0]} />
                    <stop offset="100%" stopColor={item.gradientColors[1]} />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 0 128 A 128 128 0 0 1 256 128"
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth="20"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ 
                    delay: index * 0.3,
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />
              </svg>

              {/* Circle */}
              <div className="w-32 h-32 bg-white rounded-full shadow-lg mx-auto flex items-center justify-center relative z-20 mt-4">
                <img 
                  src={item.icon || "/placeholder.svg"} 
                  alt={`${item.title} icon`} 
                  className="w-12 h-12" 
                  
                />
              </div>
              
              {/* Vertical Line */}
              <div className="w-[1px] h-12 bg-gray-300 mx-auto mt-4"></div>
              
              {/* Dot at the end of vertical line */}
              <div 
                className="w-4 h-4 rounded-full mx-auto -mt-1" 
                style={{ backgroundColor: item.gradientColors[0] }}
              ></div>
              
              {/* Text Content */}
              <div className="mt-6 text-center">
                <h3 
                  className="text-xl font-semibold mb-3" 
                  style={{ color: item.gradientColors[0] }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CultureDiagram