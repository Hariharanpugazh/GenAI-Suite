import React from 'react';
import snsLogo from '../assets/ihub.png';
import { Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="font-medium text-lg mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="text-black hover:text-gray-600">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Linkedin className="w-6 h-6" />, url: "#" },
    { icon: <Youtube className="w-6 h-6" />, url: "#" },
    { icon: <Instagram className="w-6 h-6" />, url: "#" },
    { icon: <Twitter className="w-6 h-6" />, url: "#" },
  ];

  return (
    <footer className="pt-16 pb-8 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img src={snsLogo} alt="SNS Innovation Hub" className="h-12 my-3 mr-3 inline-block" />
            <p className="text-black font-semibold text-2xl mb-8 inline-block">
              SNS Innovation Hub
            </p>
            <p className="text-black mb-8 max-w-md">
              SNS iHub is an initiative by SNS Institutions to foster startups by providing a prototyping space immersed in an ambience of creativity and design thinking.
            </p>
            <p className="text-black border-t pt-8 mb-8">
              SNS Kalvi Nagar, Sathy Mani Road NH-209,<br />
              Vazhiyampalayam, Saravanampatti,<br />
              Coimbatore, Tamil Nadu<br />
              641035.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-600 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <FooterColumn
            title="Products"
            links={[
              "Product #1",
              "Product 2",
              "Product 3",
              "Product 4",
              "Product 5",
              "Product 6",
              "Product 7",
            ]}
          />
          <FooterColumn
            title="Resources"
            links={[
              "Product #1",
              "Product 2",
              "Product 3",
              "Product 4",
              "Product 5",
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              "Product #1",
              "Product 2",
              "Product 3",
              "Product 4",
              "Product 5",
              "Product 6",
            ]}
          />
          <FooterColumn
            title="Support"
            links={[
              "Product #1",
              "Product 2",
              "Product 3",
            ]}
          />
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-black text-sm">
            © 2024 SNS iHub Workplace. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

