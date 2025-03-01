import { motion } from "framer-motion"
import build from "../assets/build.png"
import aihr from "../assets/aihr.png"
import trainer from "../assets/trainer.png"
import buildLogo from "../assets/build-logo.png"
import aihrLogo from "../assets/aihr-logo.png"
import trainerLogo from "../assets/trainer-logo.png"

interface ProductCardProps {
  image: string
  logo: string
  title: string
  description: string
  className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({ image, logo, title, description, className = "" }) => (
  <div
  className={`bg-white rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.02] w-[280px] ${className}`}
>
  <div className="relative mb-6">
    <div className="overflow-hidden rounded-[12px]">
    <img src={image || "/placeholder.svg"} alt={title} className="w-full h-[140px] object-cover transition-transform duration-300 hover:scale-125" />
    </div>
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
    <div className="w-[42px] h-[42px] rounded-full border-2 border-white bg-white shadow-md flex items-center justify-center">
      <img src={logo || "/placeholder.svg"} alt={`${title} logo`} className="w-8 h-8 rounded-full" />
    </div>
    </div>
  </div>
    <div className="text-center mb-4">
      <h3 className="text-[16px] font-semibold mb-1">{title}</h3>
      <p className="text-[12px] text-[#64748b] leading-relaxed">{description}</p>
    </div>
    <div className="flex justify-center gap-2">
      <button className="px-3 py-1 bg-black text-white text-[12px] rounded-full border border-black hover:bg-white hover:text-black">
        Try now
      </button>
      <button className="px-3 py-1 bg-white text-black text-[12px] rounded-full border border-[#e2e8f0] hover:bg-black hover:text-white transition-colors">
        Learn more
      </button>
    </div>
  </div>
)
const circles = [10, 50, 90, 130, 170, 210, 250]

const IndustrySection: React.FC<{ title: string; description: string; products: any[]; isReversed?: boolean }> = ({
  title,
  description,
  products,
  isReversed = false,
}) => (
  <div className="mb-32 relative">
    <div className="absolute inset-0 overflow-visible">
      <div className={`absolute ${isReversed ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 w-[600px] h-[600px]`}>
        {circles.map((inset, index) => (
          <motion.div
            key={index}
            initial={{ 
              clipPath: 'inset(0 0 100% 0)'
            }}
            whileInView={{ 
              clipPath: 'inset(0 0 0 0)' 
            }}
            transition={{ 
              duration: 1,
              delay: (circles.length - 1 - index) * 0.1
            }}
            className="absolute rounded-full opacity-25"
            style={{
              inset: `${inset}px`,
              background: `linear-gradient(${isReversed ? 'to left' : 'to right'}, #ffffff, #fdba74, #2606B3)`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
            }}
          />
        ))}
      </div>
    </div>
    
    <div className={`flex ${isReversed ? "flex-row-reverse" : "flex-row"} items-center gap-20`}>
      <div className="flex relative">
        <div className="grid grid-cols-2 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              className={index % 2 === (isReversed ? 0 : 1) ? "translate-y-12" : ""}
            />
          ))}
        </div>
      </div>

      <div className={`relative ${isReversed ? "left-0 text-right" : "right-0 text-left"} w-[600px]`}>
        <h3 className="text-5xl font-bold mb-5 inline-block">{title}</h3>
        <p className="text-[#000000] text-xl mb-6">{description}</p>
        <button className="px-6 py-3 text-xl font-semibold bg-black text-white rounded-full border border-black hover:bg-white hover:text-black transition-opacity">
          View All Items
        </button>
      </div>
    </div>
  </div>
)

export default function IndustryVerticals() {
  const industries = [
    {
      title: "Smart City",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: build,
        logo: buildLogo,
        title: "Build smart",
        description: "Transform your house plans into hassle-free estimations in a click",
      }),
    },
    {
      title: "Health Care",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: aihr,
        logo: aihrLogo,
        title: "AI - HR",
        description: "Transform healthcare with AI solutions",
      }),
    },
    {
      title: "Agriculture and Food Technology",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: trainer,
        logo: trainerLogo,
        title: "AI - Trainer",
        description: "Smart farming solutions for the future",
      }),
    },
    {
      title: "Aerospace and Defence",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: build,
        logo: buildLogo,
        title: "AI - Trainer",
        description: "Advanced defense technology solutions",
      }),
    },
    {
      title: "Automobile",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: aihr,
        logo: aihrLogo,
        title: "AI - Trainer",
        description: "Next-generation automotive solutions",
      }),
    },
    {
      title: "Retail, Real Estate, Entertainment & Finance",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: trainer,
        logo: trainerLogo,
        title: "AI - HR",
        description: "Comprehensive business solutions",
      }),
    },
    {
      title: "Power/Energy",
      description:
        "Every month we pick some best products for you. This month's best web themes & templates have arrived, chosen by our content specialists.",
      products: Array(4).fill({
        image: build,
        logo: buildLogo,
        title: "AI - Trainer",
        description: "Smart energy management solutions",
      }),
    },
  ]

  return (
    <section className="px-6 md:px-12 py-20 overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Industry{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2606f3] via-[#ff3636] to-[#269d0e]">
              Verticals
            </span>
          </h2>
          <p className="text-[#64748b]">
            Tailored solutions for diverse industries, driving innovation and sector-specific growth
          </p>
        </div>
        {industries.map((industry, index) => (
          <div key={index} className="mb-64">
            <IndustrySection {...industry} isReversed={index % 2 !== 0} />
          </div>
        ))}
      </div>
    </section>
  )
}

