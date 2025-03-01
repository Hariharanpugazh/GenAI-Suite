import React from 'react';
import { Brain, LightbulbIcon as LightbulbGear, RotateCcw } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <div className="inline-flex p-3 rounded-2xl border-2 border-gray-200 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Adaptive Intelligence",
      description: "Haggle down the pub off his nut arse bog bits and bobs bugger."
    },
    {
      icon: <LightbulbGear className="w-8 h-8" />,
      title: "Unified Innovation Engine",
      description: "Driving smarter solutions with precision and productivity"
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: "Agility Driven",
      description: "Offering flexibility that scales with the business."
    }
  ];

  return (
    <section className="px-5 py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">
        Why{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-green-500">
          choose us?
        </span>
      </h2>
      
      <p className="text-center text-gray-600 mb-12">
        From multipurpose themes to niche templates
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
        {features.map((feature, index) => (
          <FeatureCard key={`repeat-${index}`} {...feature} />
        ))}
      </div>
    </section>
  );
};

