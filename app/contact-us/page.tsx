import Link from "next/link"
import { Mail, Phone, MapPin, Clock, FileDown } from "lucide-react"
import StaticPageLayout from "@/components/static-page-layout"
import { Button } from "@/components/ui/button"

export default function ContactUsPage() {
  return (
    <StaticPageLayout title="Contact Us">
      <div className="space-y-10">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Get in Touch with Prime Logic Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to answer any questions you may have about our services. Reach out to us and we'll respond as
            soon as we can.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-[#003087]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">For general inquiries and support</p>
            <a href="mailto:support@primelogicsol.com" className="text-[#003087] font-medium hover:underline">
              support@primelogicsol.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-[#003087]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Mon-Fri from 9am to 6pm</p>
            <a href="tel:+1234567890" className="text-[#003087] font-medium hover:underline">
              +1 (234) 567-890
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-[#003087]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Our office location</p>
            <address className="not-italic text-[#003087]">
              123 Business Avenue
              <br />
              Suite 456
              <br />
              New York, NY 10001
            </address>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[#003087] mb-6">Send Us a Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003087] focus:border-[#003087]"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003087] focus:border-[#003087]"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003087] focus:border-[#003087]"
                placeholder="How can we help you?"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003087] focus:border-[#003087]"
                placeholder="Please describe your inquiry in detail..."
                required
              ></textarea>
            </div>
            <div>
              <Button type="submit" className="w-full md:w-auto bg-[#003087] hover:bg-[#003087]">
                Send Message
              </Button>
            </div>
          </form>
        </div>

        {/* Office Hours */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <Clock className="h-6 w-6 text-[#003087] mr-2" />
            <h3 className="text-xl font-bold text-[#003087]">Business Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">North America Office</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span>10:00 AM - 2:00 PM EST</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Europe Office</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM CET</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span>Closed</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[#003087] mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">What services does Prime Logic Solutions offer?</h4>
              <p className="text-gray-600">
                We offer a wide range of services including software development, digital marketing, consulting, and
                more. Visit our Services page for more details.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">How quickly can you respond to inquiries?</h4>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 business hours. For urgent matters, please call our
                office directly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Do you offer support after project completion?</h4>
              <p className="text-gray-600">
                Yes, we provide ongoing support and maintenance for all our projects. The specific terms are outlined in
                our service agreements.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">How can I request a quote for my project?</h4>
              <p className="text-gray-600">
                You can request a quote by filling out the contact form on this page or by emailing us directly at
                support@primelogicsol.com.
              </p>
            </div>
          </div>
        </div>

        {/* Global Offices */}
        <div className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-[#003087] mb-6">Our Global Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">New York</h4>
              <address className="not-italic text-gray-600">
                123 Business Avenue
                <br />
                Suite 456
                <br />
                New York, NY 10001
                <br />
                United States
              </address>
            </div>
            <div>
              <h4 className="font-semibold mb-2">London</h4>
              <address className="not-italic text-gray-600">
                45 Tech Square
                <br />
                Floor 3<br />
                London, EC1V 9BX
                <br />
                United Kingdom
              </address>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Singapore</h4>
              <address className="not-italic text-gray-600">
                78 Innovation Drive
                <br />
                #12-34 Tech Tower
                <br />
                Singapore 138642
              </address>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[#003087] mb-6">Helpful Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/documents/client-service-agreement.pdf" target="_blank" passHref>
              <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                <FileDown className="h-5 w-5 text-[#003087] mr-3" />
                <div>
                  <h4 className="font-medium">Client Service Agreement</h4>
                  <p className="text-sm text-gray-500">Download our standard client agreement</p>
                </div>
              </div>
            </Link>
            <Link href="/documents/freelancer-vs-prime-logic.pdf" target="_blank" passHref>
              <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                <FileDown className="h-5 w-5 text-[#003087] mr-3" />
                <div>
                  <h4 className="font-medium">Freelancer Agreement</h4>
                  <p className="text-sm text-gray-500">Download our standard freelancer agreement</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 p-4 rounded-lg h-80 flex items-center justify-center">
          <p className="text-gray-600">Interactive Map Will Be Displayed Here</p>
        </div>
      </div>
    </StaticPageLayout>
  )
}
