import Navbar from "@/components/Navbar"
import { Products } from "@/components/Products"
import ScrollProgress from "@/components/ui/scroll-progress"
import { Footer } from "@/components/Footer"
import Chatbot from "@/pages/Users/Chatbot"; // Import the Chatbot component

export default function ProductsList() {
  return (
    <>
      <ScrollProgress className="top-[82px]" />
      <Navbar/>
      <Products/>
      <Footer/>
      <Chatbot /> 

    </>
  )
}

