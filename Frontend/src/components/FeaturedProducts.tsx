import React, { useState } from 'react';
import build from '../assets/build.png';
import aihr from '../assets/aihr.png';
import trainer from '../assets/trainer.png';
import buildLogo from '../assets/build-logo.png';
import aihrLogo from '../assets/aihr-logo.png';
import trainerLogo from '../assets/trainer-logo.png';

interface ProductCardProps {
  image: string;
  logo: string;
  title: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, logo, title, description }) => (
  <div
  className={`bg-white rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.02] w-[280px]`}
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
);

export const FeaturedProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { image: build, logo: buildLogo, title: "Build smart", description: "Transform your house plans into hassle-free estimations in a click !! - With Buildsmart" },
    { image: aihr, logo: aihrLogo, title: "AI - HR", description: "Grow your users, grow your business. - With AI-HR" },
    { image: trainer, logo: trainerLogo, title: "AI - Trainer", description: "Get ready for the future of AI. - With AI-Trainer" },
    { image: trainer, logo: trainerLogo, title: "AI - Trainer", description: "Get ready for the future of AI. - With AI-Trainer" },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch ;
  });

  return (
    <section className="px-12 py-10 max-w-8xl bg-[#F8F8F8]">
      <h2 className="text-5xl font-bold text-center mb-4">
        Our Featured{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2606f3] via-[#ff3636] to-[#269d0e]">
          Products
        </span>
      </h2>

      <p className="text-center text-black mb-12">
        Innovative tools empowering growth, learning, and smarter business solutions seamlessly.
      </p>

      <div className="flex flex-col items-center mb-16">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-full pl-10"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z"></path>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-20 mb-10">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            logo={product.logo}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>

      <div className="text-center">
        <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center">
          view more
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      
    </section>
  );
};

export default FeaturedProducts;
