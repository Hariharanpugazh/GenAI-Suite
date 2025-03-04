import IndustryVerticals from "@/components/IndustryVerticlals"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import ScrollProgress from "@/components/ui/scroll-progress"
import CultureDiagram from "@/components/CultureDiagram"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { AnimatedBeamDemo } from "@/components/AnimatedBeamDemo"

function Home() {
  return (
    <>
      <ScrollProgress className="top-[82px]" />
      <Navbar/>
      <Hero/>
      <WhyChooseUs/>
      <CultureDiagram />
      <AnimatedBeamDemo /> 
      <FeaturedProducts/>
      <IndustryVerticals/>
      <Footer/>
    </>
  )
}

export default Home
