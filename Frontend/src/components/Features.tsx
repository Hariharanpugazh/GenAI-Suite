interface FeatureCardProps {
  title: string
  description: string
  className?: string
}

const FeatureCard = ({ title, description, className = "" }: FeatureCardProps) => (
  <div className={`p-6 border rounded-lg ${className}`}>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="flex items-center text-sm font-medium">
      Learn more
      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
)

export const Features = () => {
  const features = [
    {
      title: "Instant Image Analysis",
      description:
        "Upload any 2D house plan and get instant insights, including area calculations, room dimensions, and key architectural details.",
    },
    {
      title: "Accurate Material Estimation",
      description:
        "Get precise material quantities for both substructure and superstructure based on AI-driven analysis of your house plan.",
    },
    {
      title: "Seamless Excel Integration",
      description:
        "Download your material estimates in a structured Excel format for easy tracking and sharing with your team.",
    },
    {
      title: "Project Timeline Estimation",
      description:
        "Understand how long your project will take with AI-powered time predictions based on house size and complexity.",
    },
    {
      title: "User friendly interface",
      description:
        "Navigate through your project's data with ease thanks to a simple, intuitive platform designed for builders, architects, and project managers.",
    },
    {
      title: "Accurate Material Estimation",
      description:
        "Get precise material quantities for both substructure and superstructure based on AI-driven analysis of your house plan.",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-4">Features</h2>
      <p className="text-center mb-12 text-gray-600">
        Transform your house plans into hassle-free estimations in a click !! - With Buildsmart
      </p>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          {features.slice(0, 4).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.slice(4).map((feature, index) => (
            <FeatureCard key={index + 4} {...feature} className="md:col-span-1" />
          ))}
        </div>
      </div>
    </div>
  )
}

