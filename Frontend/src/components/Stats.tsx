import React from 'react';

interface StatItemProps {
  number: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, label }) => (
  <div>
    <div className="text-5xl font-bold mb-2">{number}</div>
    <div className="text-gray-600 text-sm">{label}</div>
  </div>
);

export const Stats: React.FC = () => {
  return (
    <div className="px-5 py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-16">
        Every number tells a story of<br />growth and innovation.
      </h2>
      
      <div className="grid grid-cols-4 gap-8">
        <StatItem number="10+" label="Industries Catered" />
        <StatItem number="98%" label="Productivity Boost" />
        <StatItem number="9,000+" label="Solution integrations" />
        <StatItem number="8K+" label="Minutes saved" />
      </div>
    </div>
  );
};

