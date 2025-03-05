import IndustryVerticals from "@/components/IndustryVerticlals"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import ScrollProgress from "@/components/ui/scroll-progress"
import CultureDiagram from "@/components/CultureDiagram"
import Chatbot from "@/pages/Users/Chatbot"; // Import the Chatbot component

function Home() {
  return (
    <>
      <ScrollProgress className="top-[82px]" />
      <Navbar/>
      <Hero/>
      <CultureDiagram />
      <FeaturedProducts/>
      <IndustryVerticals/>
      <Footer/>
      <Chatbot /> 
    </>
  )
}

export default Home
