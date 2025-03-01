import Navbar from "@/components/Navbar"
import { Products } from "@/components/Products"
import ScrollProgress from "@/components/ui/scroll-progress"
import { Footer } from "@/components/Footer"

export default function ProductsList() {
  return (
    <>
      <ScrollProgress className="top-[82px]" />
      <Navbar/>
      <Products/>
      <Footer/>
    </>
  )
}

