import React from 'react';
import wcu1 from '../assets/wcu1.svg';
import wcu2 from '../assets/wcu2.svg';
import wcu3 from '../assets/wcu3.svg';
import wcu4 from '../assets/wcu4.svg';
import wcu5 from '../assets/wcu5.svg';
import wcu6 from '../assets/wcu6.svg';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <div className="inline-flex p-3 rounded-2xl border-2 border-black mb-6 bg-[#f1f1f1]">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <img src={wcu1} alt="AI-Powered Products" className="w-8 h-8" />,
      title: "AI-Powered Products",
      description: "Advanced AI-driven solutions to enhance efficiency and innovation."
    },
    {
      icon: <img src={wcu2} alt="Custom AI Solution" className="w-8 h-8" />,
      title: "Custom AI Solution",
      description: "Tailored AI models designed to fit your unique business needs."
    },
    {
      icon: <img src={wcu3} alt="Cloud & Data Engineering" className="w-8 h-8" />,
      title: "Cloud & Data Engineering",
      description: "Tailored AI models designed to fit your unique business needs."
    },
    {
      icon: <img src={wcu4} alt="Consulting and Training" className="w-8 h-8" />,
      title: "Consulting and Training",
      description: "Expert guidance to implement, optimize, and scale AI solutions."
    },
    {
      icon: <img src={wcu5} alt="End-to-End Product Development" className="w-8 h-8" />,
      title: "End-to-End Product Development",
      description: "From ideation to deployment, we build future-ready AI products."
    },
    {
      icon: <img src={wcu6} alt="Innovation-Driven Approach" className="w-8 h-8" />,
      title: "Innovation-Driven Approach",
      description: "Harnessing cutting-edge AI and technology to drive scalable, intelligent solutions."
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
      </div>
    </section>
  );
};
