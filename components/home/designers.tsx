"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import Link from "next/link"

// Get the image path from environment variable
const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_PATH || ""

const designers = [
  {
    name: "Liam R.",
    title: "Graphic Designer & Illustrator",
    rating: "5.0",
    jobs: "72 jobs",
    iconColor: "#FF6B35",
    best: "Expert in branding and digital illustrations, known for creativity and attention to detail.",
  },
  {
    name: "Noah J.",
    title: "Creative Director & Designer",
    rating: "4.9",
    jobs: "615 jobs",
    iconColor: "#003087",
    best: "Specializes in UI/UX design with a strong portfolio in web and app interfaces.",
  },
  {
    name: "Ethan M.",
    title: "Senior Graphic Designer",
    rating: "4.9",
    jobs: "150 jobs",
    iconColor: "#FF6B35",
    best: "Brings a modern touch to logo design and brand identity projects.",
  },
  {
    name: "Benjamin T.",
    title: "Freelance Visual Designer",
    rating: "4.8",
    jobs: "1025 jobs",
    iconColor: "#003087",
    best: "Known for sleek and innovative designs in both print and digital media.",
  },
  {
    name: "Oliver K.",
    title: "Motion Graphics Specialist",
    rating: "4.9",
    jobs: "867 jobs",
    iconColor: "#FF6B35",
    best: "Excels in animations, video editing, and dynamic visual storytelling.",
  },
  {
    name: "Sophia L.",
    title: "Creative Graphic Designer",
    rating: "5.0",
    jobs: "342 jobs",
    iconColor: "#003087",
    best: "Master of minimalist yet impactful designs with a keen eye for aesthetics.",
  },
]

export default function Designers() {
  return (
    <section className="bg-white w-full py-12">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-24">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {" "}
          <p className="text-[#FF6B35] text-xl">
            We Power Your Digital Growth <span className="text-[#003087]">I</span> Results You Can Trust
          </p>
          <p>
            Your Business Deserves the Best – Work with <span className="text-[#FF6B35]">1000+</span> Industry Experts
          </p>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 justify-center items-center">
          {designers.map((designer, index) => (
            <motion.div
              key={index}
              className=" rounded-lg shadow-md p-8 w-full max-w-sm border-4 border-[#003087] bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between mx-auto transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-gray-100">
                  <User size={40} color={designer.iconColor} strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-semibold text-lg">{designer.name}</h3>
                  <p className="text-sm text-gray-600">{designer.title}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                <span className="text-[#FF6B35] font-bold">★ {designer.rating}</span>
                <span>({designer.jobs})</span>
              </div>
              <Link href="/contact-us" className="mt-4 block">
                <motion.button
                  className="bg-[#003087] text-white w-full py-3 rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
