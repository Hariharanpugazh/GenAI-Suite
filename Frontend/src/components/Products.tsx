"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"

interface Product {
  user_id: string
  product_data: {
    product_name: string
    product_description: string
    category: string
    demo_video?: string
    screenshot?: string
    thumbnail?: string // Base64 encoded image
  }
  user_journey?: { journey_name: string; journey_description: string }[]
  product_features?: { feature_name: string; feature_description: string }[]
  created_by: string
  is_publish: boolean
  created_at: string
  updated_at: string
}

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
  const [products, setProducts] = useState<Product[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-all-products/")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || [])) // Handle empty response
      .catch((error) => console.error("Error fetching products:", error))
  }, [])

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter))
  }

  const filteredProducts = products.filter((product) => {
    const productName = product.product_data?.product_name || ""
    const productCategory = product.product_data?.category || ""

    const matchesFilter = selectedFilter ? productCategory === selectedFilter : true
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase())

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
            className="pl-10 rounded-full font-medium border-2 border-black"
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
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.02] w-[280px]"
          >
            <div className="relative mb-6">
              <div className="overflow-hidden rounded-[12px]">
                <img
                  src={product.product_data.thumbnail ? `data:image/jpeg;base64,${product.product_data.thumbnail}` : "/placeholder.svg"}
                  alt={product.product_data.product_name}
                  className="w-full h-[140px] object-cover transition-transform duration-300 hover:scale-125"
                />
              </div>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-[16px] font-semibold mb-1">{product.product_data.product_name}</h3>
              <p className="text-[12px] text-[#64748b] leading-relaxed">{product.product_data.product_description}</p>
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
