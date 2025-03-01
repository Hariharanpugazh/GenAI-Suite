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
      gradient: "from-indigo-600 to-purple-600",
      textColor: "text-indigo-600",
    },
    {
      title: "Process",
      description: "From ideation to execution, our structured approach ensures efficiency and precision",
      icon: processIcon,
      gradient: "from-pink-600 to-red-500",
      textColor: "text-pink-600",
    },
    {
      title: "People",
      description: "Behind every breakthrough is a team of passionate minds",
      icon: peopleIcon,
      gradient: "from-orange-500 to-green-500",
      textColor: "text-orange-500",
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-8 text-center" ref={ref}>
      <h1 className="text-3xl font-bold mb-12">3P Culture</h1>
      
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gray-300 z-0" />
        
        <div className="flex justify-between items-center max-w-4xl mx-auto relative z-10">
          {items.map((item, index) => (
            <div key={index} className="w-64">
              <div className="relative">
                {/* Outer Semi-Circle Border */}
                <svg 
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 z-10"
                  viewBox="0 0 192 96"
                >
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className={`stop-${item.gradient.split(' ')[1]}`} />
                      <stop offset="100%" className={`stop-${item.gradient.split(' ')[3]}`} />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 0 96 A 96 96 0 0 1 192 96"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="12"
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
                <div className="w-32 h-32 bg-white rounded-full shadow-lg mx-auto flex items-center justify-center relative z-20">
                  <img src={item.icon || "/placeholder.svg"} alt={`${item.title} icon`} className="w-12 h-12" />
                </div>
              </div>
              
              {/* Vertical Line */}
              <div 
                className="absolute bottom-0 left-1/2 w-[1px] h-16 bg-gray-300"
                style={{
                  transform: 'translateX(-50%)',
                }}
              />
              
              {/* Text Content */}
              <div className="mt-20">
                <h3 className={`text-xl font-semibold mb-3 ${item.textColor}`}>
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
