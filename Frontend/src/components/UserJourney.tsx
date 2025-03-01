import { Calendar, Monitor, Sliders, TrendingUp } from "lucide-react"

export const UserJourney = () => {
  const steps = [
    {
      number: 1,
      title: "Initiation and Planning",
      description:
        "The project begins with gathering client requirements and using AI tools to create optimized blueprints, resource allocation plans, and schedules.",
      icon: Calendar,
    },
    {
      number: 2,
      title: "Execution and Real-Time Monitoring",
      description:
        "The project begins with gathering client requirements and using AI tools to create optimized blueprints, resource allocation plans, and schedules.",
      icon: Monitor,
    },
    {
      number: 3,
      title: "Quality Assurance and Adjustments",
      description:
        "The project begins with gathering client requirements and using AI tools to create optimized blueprints, resource allocation plans, and schedules.",
      icon: Sliders,
    },
    {
      number: 4,
      title: "Project Completion and Insights",
      description:
        "The project begins with gathering client requirements and using AI tools to create optimized blueprints, resource allocation plans, and schedules.",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-16">User Journey</h2>
      <div className="relative">
        {/* Base line */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-gray-200" />

        {/* Animated gradient line overlay */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-[#2606f3] via-[#ff3636] to-[#269d0e] transform scale-y-0 origin-top animate-reveal" />

        <div className="space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 1

            return (
              <div key={index} className="flex items-center gap-8">
                {!isEven && (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                )}

                <div className={`w-1/2 ${isEven ? "text-left" : "text-right"} ${isEven ? "ml-auto" : ""}`}>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {isEven && (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

