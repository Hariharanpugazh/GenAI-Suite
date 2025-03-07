import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface Product {
  user_id: string
  product_data: {
    product_name: string
    product_description: string
    category: string
    demo_video?: string
    screenshot?: string
    thumbnail?: string
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    appointmentDate: new Date(),
    appointmentTime: "",
  })

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get_product/")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || [])) 
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

  const handleTryNowClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleRequestDemo = () => {
  const formattedDate = formData.appointmentDate.toISOString().split('T')[0]; 

  fetch("http://127.0.0.1:8000/api/request_appointment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: selectedProduct?.user_id,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      appointmentDate: formattedDate, 
      appointmentTime: formData.appointmentTime,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      setIsModalOpen(false);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

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
                src={`http://127.0.0.1:8000${product.product_data.thumbnail}`}
                alt={product.product_data.product_name}
                className="w-full h-40 object-cover rounded-lg"
              />
              </div>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-[16px] font-semibold mb-1">{product.product_data.product_name}</h3>
              <p className="text-[12px] text-[#64748b] leading-relaxed">{product.product_data.product_description}</p>
            </div>
            <div className="flex justify-center gap-2">
              <button
                className="px-3 py-1 bg-black text-white text-[12px] rounded-full border border-black hover:bg-white hover:text-black"
                onClick={() => handleTryNowClick(product)}
              >
                Try now
              </button>
              <button className="px-3 py-1 bg-white text-black text-[12px] rounded-full border border-[#e2e8f0] hover:bg-black hover:text-white transition-colors">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8 w-96">
          <h2 className="text-xl font-semibold mb-4">Request a Demo</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <Input
                type="tel"
                placeholder="Your phone number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Date</label>
              <DatePicker
                selected={formData.appointmentDate}
                onChange={(date) => {
                  setFormData({ ...formData, appointmentDate: date as Date });
                }}
                minDate={new Date()}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Time</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={formData.appointmentTime}
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              >
                <option value="">Select a time</option>
                <option value="10:00 - 11:00">10:00 - 11:00</option>
                <option value="11:00 - 12:00">11:00 - 12:00</option>
                <option value="12:00 - 13:00">12:00 - 13:00</option>
                <option value="13:00 - 14:00">13:00 - 14:00</option>
                <option value="14:00 - 15:00">14:00 - 15:00</option>
                <option value="15:00 - 16:00">15:00 - 16:00</option>
                <option value="16:00 - 17:00">16:00 - 17:00</option>
              </select>
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleRequestDemo}
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
              >
                Book an Appointment
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}
    </main>
  )
}
