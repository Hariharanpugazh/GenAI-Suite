import SuperadminSidebar from "@/components/Superadmin/SuperadminSidebar";
import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Build smart",
    description: "Transform your house plans into hassle-free estimations in a click",
    image: "/path-to-image1.jpg",
    icon: "/path-to-icon1.png",
  },
  {
    title: "AI - HR",
    description: "Transform healthcare with AI solutions",
    image: "/path-to-image2.jpg",
    icon: "/path-to-icon2.png",
  },
  {
    title: "AI - Trainer",
    description: "Smart farming solutions for the future",
    image: "/path-to-image3.jpg",
    icon: "/path-to-icon3.png",
  },
  {
    title: "AI - Trainer",
    description: "Advanced defense technology solutions",
    image: "/path-to-image4.jpg",
    icon: "/path-to-icon4.png",
  },
  {
    title: "AI - HR",
    description: "Comprehensive business solutions",
    image: "/path-to-image5.jpg",
    icon: "/path-to-icon5.png",
  },
  {
    title: "AI - Trainer",
    description: "Smart energy management solutions",
    image: "/path-to-image6.jpg",
    icon: "/path-to-icon6.png",
  },
];

const Products: React.FC = () => {
  return (
    <div className="flex">
      <SuperadminSidebar />
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link to="/post-product" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Create
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.title} className="rounded-lg w-full" />
            <div className="relative flex items-center -mt-5">
              <img src={product.icon} alt="icon" className="w-10 h-10 rounded-full border-2 border-white mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-center mt-2">{product.title}</h3>
            <p className="text-gray-600 text-center">{product.description}</p>
            <div className="flex justify-center space-x-3 mt-3">
              <button className="bg-black text-white px-4 py-2 rounded-lg">Try now</button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg">Learn more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
