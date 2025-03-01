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
  <div className="bg-white rounded-3xl p-8 shadow-lg w-90">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-contain mb-8 rounded-lg" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <img src={logo} alt={`${title} logo`} className="w-16 h-16 rounded-full border-4 border-white" />
      </div>
    </div>
    <div className="flex flex-col h-[200px] pt-3">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-black mb-6 h-20 overflow-hidden">{description}</p>
      </div>
      <div className="flex justify-center gap-4 mt-auto">
        <button className="px-4 py-2 bg-black text-white rounded-full flex items-center hover:bg-white hover:text-black transition-colors duration-300 border border-black">
          Try now
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-full flex items-center hover:bg-black hover:text-white transition-colors duration-300">
          Learn more
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const FilterButton: React.FC<{ children: React.ReactNode; isActive: boolean; onClick: () => void }> = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full border border-black transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
  >
    {children}
  </button>
);

const Industry: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const products = [
    { image: build, logo: buildLogo, title: "Build smart", description: "Transform your house plans into hassle-free estimations in a click !! - With Buildsmart", category: 'Smart City/Manufacturing' },
    { image: aihr, logo: aihrLogo, title: "AI - HR", description: "Grow your users, grow your business. - With AI-HR", category: 'Health Care' },
    { image: trainer, logo: trainerLogo, title: "AI - Trainer", description: "Get ready for the future of AI. - With AI-Trainer", category: 'Agriculture and Food Technology' },
    { image: trainer, logo: trainerLogo, title: "AI - Trainer", description: "Get ready for the future of AI. - With AI-Trainer", category: 'Aerospace and Defence' },
  ];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(prevFilter => (prevFilter === filter ? null : filter));
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = selectedFilter ? product.category.toLowerCase().includes(selectedFilter.toLowerCase()) : true;
    return matchesFilter;
  });

  return (
    <section className="px-12 py-20 max-w-8xl">
      <h2 className="text-5xl font-bold text-center mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2606f3] via-[#ff3636] to-[#269d0e]">
          Industry{' '}
        </span>
        Verticals
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
        <FilterButton isActive={selectedFilter === 'Smart City/Manufacturing'} onClick={() => handleFilterClick('Smart City/Manufacturing')}>Smart City/Manufacturing</FilterButton>
        <FilterButton isActive={selectedFilter === 'Health Care'} onClick={() => handleFilterClick('Health Care')}>Health Care</FilterButton>
        <FilterButton isActive={selectedFilter === 'Agriculture and Food Technology'} onClick={() => handleFilterClick('Agriculture and Food Technology')}>Agriculture and Food Technology</FilterButton>
        <FilterButton isActive={selectedFilter === 'Aerospace and Defence'} onClick={() => handleFilterClick('Aerospace and Defence')}>Aerospace and Defence</FilterButton>
        <FilterButton isActive={selectedFilter === 'Automobile'} onClick={() => handleFilterClick('Automobile')}>Automobile</FilterButton>
        <FilterButton isActive={selectedFilter === 'Retail (FMCG), Real Estate, Entertainment & Finance (BFSI)'} onClick={() => handleFilterClick('Retail (FMCG), Real Estate, Entertainment & Finance (BFSI)')}>Retail (FMCG), Real Estate, Entertainment & Finance (BFSI)</FilterButton>
        <FilterButton isActive={selectedFilter === 'Power/Energy'} onClick={() => handleFilterClick('Power/Energy')}>Power/Energy</FilterButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
    </section>
  );
};

export default Industry;