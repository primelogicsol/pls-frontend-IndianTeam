"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

const EnterpriseSuite = () => {
  const [imgSrc, setImgSrc] = useState("")
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    // Get the image path from environment variable
    const baseImagePath = process.env.NEXT_PUBLIC_IMAGE_PATH || ""

    // Log for debugging
    console.log("Image base path:", baseImagePath)

    // Set the full image path
    setImgSrc(`${baseImagePath}/enterprise.png`)
  }, [])

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-7xl mx-auto bg-[#003087] rounded-2xl overflow-hidden text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid md:grid-cols-3 items-center">
          {/* Image Section */}
          <motion.div
            className="col-span-2 relative h-full min-h-[600px] bg-[#003087]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {imgError || !imgSrc ? (
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
                <p>Enterprise Suite Image</p>
              </div>
            ) : (
              <Image
                src={imgSrc || "/placeholder.svg"}
                alt="Enterprise Suite"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                onError={(e) => {
                  console.error("Image failed to load from:", imgSrc)
                  setImgError(true)

                  // Try fallback to direct path as last resort
                  if (imgSrc.includes(process.env.NEXT_PUBLIC_IMAGE_PATH || "")) {
                    setImgSrc("/assets/enterprise.png")
                    setImgError(false)
                  }
                }}
              />
            )}
          </motion.div>

          {/* Content Section */}
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Heading */}
              <motion.h2
                className="text-3xl text-white font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Introducing PLS&apos;s Enterprise Suite:
              </motion.h2>

              {/* Animated Paragraph */}
              <motion.p
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Your gateway to premier talent acquisition and comprehensive workforce management tools.
              </motion.p>

              {/* Animated Button */}
              <motion.a
                href={process.env.DASHBOARD_URL || "#"}
                className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default EnterpriseSuite
