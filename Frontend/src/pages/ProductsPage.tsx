import Navbar from "@/components/Navbar"
import ScrollProgress from "@/components/ui/scroll-progress"
import { Footer } from "@/components/Footer"
import { ProductHeroSection } from "@/components/ProductHeroSection"
import { UserJourney } from "@/components/UserJourney"
import { Features } from "@/components/Features"
import { ImageSlider } from "@/components/ImageSlider"

export default function ProductsList() {
  return (
    <>
      <ScrollProgress className="top-[82px]" />
      <Navbar/>
      <ProductHeroSection/>
      <ImageSlider/>
      <UserJourney/>
      <Features/>
      <Footer/>
    </>
  )
}