"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Fresh Strawberries",
    description: "Juicy, organic, and straight from the farm.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
  },
  {
    id: 2,
    title: "Tasty Burgers",
    description: "Mouthwatering burgers for every craving.",
    image: "https://i.ibb.co.com/7JbwkQ1B/1.webp",
  },
  {
    id: 3,
    title: "Delicious Smoothies",
    description: "Healthy and refreshing smoothies every day.",
    image: "https://i.ibb.co.com/V0WkjWh8/2.webp",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 overflow-hidden rounded-xl shadow-xl">
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[current].id}
          // initial={{ opacity: 0, x: 50 }}
          // animate={{ opacity: 1, x: 0 }}
          // exit={{ opacity: 0, x: 50 }}
          // transition={{ duration: 0.1 }}
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          {/* <div className="absolute bottom-8 left-8 sm:left-12 bg-black/50 backdrop-blur-md p-6 rounded-lg max-w-md text-white">
            <h2 className="text-3xl font-bold">{slides[current].title}</h2>
            <p className="mt-2 text-sm sm:text-base">
              {slides[current].description}
            </p>
          </div> */}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/60 text-white"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/60 text-white"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}
