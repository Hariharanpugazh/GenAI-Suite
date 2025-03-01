import React from 'react';
import gridBg from '../assets/grid.png';

export const JoinSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${gridBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Join{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C3BF7] via-[#E93D3D] to-[#39B54A]">
            SNS iHub
          </span>
          {' '}Today!
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </form>
      </div>
    </section>
  );
};

