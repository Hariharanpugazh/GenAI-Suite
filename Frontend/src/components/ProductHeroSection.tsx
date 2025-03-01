import buildsmart from '../assets/buildsmart.png'

export const ProductHeroSection = () => {
  return (
    <div className="relative overflow-hidden py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">BuildSmart</h1>
            <p className="text-xl mb-8">
              Transform your house plans into hassle-free estimations in a click !! - With Buildsmart
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
              Try Now
            </button>
          </div>
          
          <div className="relative">
            <img
              src={buildsmart}
              alt="BuildSmart Interface"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
