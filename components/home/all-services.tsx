"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Service {
  _id?: string
  title: string
  description: string
  image: string
  icon: string
  order?: number
}

interface AllServicesProps {
  services: Service[]
}

const getServiceLink = (title: string) => {
  const routes: Record<string, string> = {
    Services: "/services/software-development/web-development",
    Industries: "/industries/healthcare-and-life/regulatory-compliance",
    Technology: "/technologies/web-tech/react",
    // Add more custom mappings as needed
  }

  return routes[title] || `/services/${title.toLowerCase().replace(/\s+/g, "-")}`
}

const ServiceCard = ({ service }: { service: Service }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ backfaceVisibility: "hidden" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of the card */}
        <div className="absolute inset-0">
          <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
            <Image 
            src={service.icon || "/placeholder.svg"} 
            alt="" width={40} height={40} />
          </div>

          <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 w-full h-full bg-[#003087]"
        style={{ backfaceVisibility: "hidden" }}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Back of the card */}
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">{service.title}</h3>

          {/* Render description as bullet points */}
          <ul className="text-white/90 mb-4 text-left">
            {service.description.split("\n").map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>{point.trim()}</span>
              </li>
            ))}
          </ul>

          
        </div>
      </motion.div>
    </motion.div>
  )
}

// Export as both named and default export to ensure compatibility
export function AllServices({ services = [] }: AllServicesProps) {
  // Sort services by order
  const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <section className="py-16 justify-center ali bg-gray-50">
      <div className="container mx-auto justify-center px-4">
        <div className="text-center mb-12">
          <div className="">
            <span className="text-[#FF6B35] font-bold contrast-100 mb-2 inline-flex">Innovate. Scale. Secure. Succeed.</span>
            <h2 className="contrast-100text-2xl md:text-3xl font-bold">
              Empowering Enterprises with Future-Ready IT & Digital Strategies for Scalable Growth, Resilient Security,
              and Market <span className="text-[#FF6B35]">Leadership</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 w-full min-w-56 gap-6">
          {sortedServices.map((service, index) => (
            <ServiceCard key={service._id || index} service={service} />
          ))}
        </div>

        
      </div>
    </section>
  )
}

// Add default export
export default AllServices
