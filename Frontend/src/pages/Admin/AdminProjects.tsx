import AdminSidebar from "@/components/Admin/AdminSidebar";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import Cookies from "js-cookie";

interface Product {
  user_id: string;
  product_data: {
    product_name: string;
    product_description: string;
    category: string;
    demo_video?: string;
    screenshot?: string;
    thumbnail?: string;
  };
  created_by: string;
  is_publish: boolean | null;
  created_at: string;
  updated_at: string;
}

export default function AdminProjects() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const token = Cookies.get("jwt"); // Assuming JWT is stored in localStorage
        const response = await fetch("http://127.0.0.1:8000/api/get-admin-products/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProducts(data.products || []);
        } else {
          setErrorMessage(data.error || "Failed to fetch products.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.product_data?.product_name || "";
    const productCategory = product.product_data?.category || "";

    const matchesFilter = selectedFilter ? productCategory === selectedFilter : true;
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-32 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-6">My Projects</h1>
          <p className="text-gray-600">Manage and view projects you have created.</p>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-8">
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

        {/* Display Products */}
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-500">{errorMessage}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
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
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-white text-black text-[12px] rounded-full border border-[#e2e8f0] hover:bg-black hover:text-white transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
