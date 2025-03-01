import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import page1 from "../assets/page1.svg"
import page2 from "../assets/page2.svg"
import page3 from "../assets/page3.svg"

export const ImageSlider = () => {
  const images = [page1, page2, page3]
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

