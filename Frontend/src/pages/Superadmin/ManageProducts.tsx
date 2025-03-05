import SuperadminSidebar from "@/components/Superadmin/SuperadminSidebar";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle } from "lucide-react";
import Cookies from "js-cookie";

interface Product {
  _id: string;
  user_id: string;
  product_data: {
    product_name: string;
    product_description: string;
    category: string;
    demo_video?: string;
    screenshot?: string;
    thumbnail?: string;
  };
  is_publish: boolean | null;
  created_at: string;
}

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-all-products/");
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

  const handleReview = async (productId: string, action: "approve" | "reject") => {
    if (!productId || productId === "undefined") {
      console.error("Invalid product ID:", productId);
      alert("Invalid product ID.");
      return;
    }
  
    console.log(`Reviewing Product ID: ${productId}, Action: ${action}`); // Debug log
  
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        alert("Authorization token missing.");
        return;
      }
  
      const response = await fetch(`http://127.0.0.1:8000/api/review-product/${productId}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === productId ? { ...product, is_publish: action === "approve" } : product
          )
        );
      } else {
        alert(data.error || "Failed to update product status.");
      }
    } catch (error) {
      alert("An error occurred while updating the product status.");
    }
  };
  

  const filteredProducts = products.filter((product) => {
    const productName = product.product_data?.product_name || "";
    return productName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <SuperadminSidebar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-32 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-6">Manage Products</h1>
          <p className="text-gray-600">Approve or reject products submitted by admins.</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full font-medium border-2 border-black"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          </div>
        </div>

        {/* Display Products */}
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-500">{errorMessage}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.02] w-[320px]"
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

                {/* Product Status */}
                <div className="text-center mb-4">
                  {product.is_publish === true ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : product.is_publish === false ? (
                    <span className="text-red-600 font-medium">Rejected</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </div>

                {/* Approve/Reject Buttons */}
                {product.is_publish === null && (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleReview(product._id, "approve")}
                      className="px-3 py-1 bg-green-500 text-white text-[12px] rounded-full border border-green-500 hover:bg-white hover:text-green-500 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(product._id, "reject")}
                      className="px-3 py-1 bg-red-500 text-white text-[12px] rounded-full border border-red-500 hover:bg-white hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
