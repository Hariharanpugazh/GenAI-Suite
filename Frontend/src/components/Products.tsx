"use client"

import { useState } from "react"
import build from "../assets/build.png"
import aihr from "../assets/aihr.png"
import trainer from "../assets/trainer.png"
import buildLogo from "../assets/build-logo.png"
import aihrLogo from "../assets/aihr-logo.png"
import trainerLogo from "../assets/trainer-logo.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  image: string
  logo: string
  category: string
}

const products: Product[] = [
  {
      id:1,
      category: "Smart City",
      image: build,
      logo: buildLogo,
      title: "Build smart",
      description: "Transform your house plans into hassle-free estimations in a click",
    
  },
  {
      id:2,
      category: "Health Care",
      image: aihr,
      logo: aihrLogo,
      title: "AI - HR",
      description: "Transform healthcare with AI solutions",
    
  },
  {
      id:3,
      category: "Agriculture and Food Technology", 
      image: trainer,
      logo: trainerLogo,
      title: "AI - Trainer",
      description: "Smart farming solutions for the future",
    
  },
  {
    id:4,
    category: "Agriculture and Food Technology", 
    image: trainer,
    logo: trainerLogo,
    title: "AI - Trainer",
    description: "Smart farming solutions for the future",
  
},
  {
      id:5,
      category: "Aerospace and Defence",
      image: build,
      logo: buildLogo,
      title: "AI - Trainer",
      description: "Advanced defense technology solutions",
  
  },
  {
      id:6,
      category: "Automobile",
      image: aihr,
      logo: aihrLogo,
      title: "AI - Trainer",
      description: "Next-generation automotive solutions",
    
  },
  {
      id:7,
      category: "Retail, Real Estate, Entertainment & Finance",
      image: trainer,
      logo: trainerLogo,
      title: "AI - HR",
      description: "Comprehensive business solutions",
    
  },
  {
      id:8,
      category: "Power/Energy",
      image: build,
      logo: buildLogo,
      title: "AI - Trainer",
      description: "Smart energy management solutions",
    },
]

const categories = [
  "Smart City/Manufacturing",
  "Health Care",
  "Agriculture and Food Technology",
  "Aerospace and Defence",
  "Automobile",
  "Retail (FMCG), Real Estate, Entertainment & Finance (BFSI)",
  "Power/Energy",
]

export function Products() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter))
  }

  const filteredProducts = products.filter((product) => {
    const matchesFilter = selectedFilter ? product.category === selectedFilter : true
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <main className="container mx-auto px-32 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-6">Products</h1>
        <p className="text-gray-600">
          Inspirational designs, illustrations, and graphic elements from the world's best designers.
          <br />
          Want more inspiration? ...
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8 mr-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full font-medium border-2 border-black "
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            className="px-5 py-2 bg-white text-black font-normal text-lg rounded-full border border-black hover:bg-black hover:text-white transition-colors"
            key={category}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
        key={product.id}
        className="bg-white rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.02] w-[280px]"
          >
        <div className="relative mb-6">
          <div className="overflow-hidden rounded-[12px]">
            <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-[140px] object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <div className="w-[42px] h-[42px] rounded-full border-2 border-white bg-white shadow-md flex items-center justify-center">
          <img
            src={product.logo || "/placeholder.svg"}
            alt={`${product.title} logo`}
            className="w-8 h-8 rounded-full"
          />
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-[16px] font-semibold mb-1">{product.title}</h3>
          <p className="text-[12px] text-[#64748b] leading-relaxed">{product.description}</p>
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
        ))}
      </div>
    </main>
  )
}

