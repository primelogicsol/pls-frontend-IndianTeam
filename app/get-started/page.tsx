"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Check, Menu, X } from "lucide-react"

// Import all step components
import RegisterYourself from "./components/register"
import ServicesSelection from "./components/services"
import IndustriesSelection from "./components/industries"
import TechnologiesSelection from "./components/technologies"
import FeaturesSelection from "./components/features-sor"
import SpecialOffers from "./components/special-offers"
import Timeline from "./components/timeline"
import Estimate from "./components/estimate"
import ServiceAgreement from "./components/agreement"
import ProceedOptions from "./components/payment"

// Define proper interfaces for type safety
interface RegisterYourselfData {
  fullName: string
  businessEmail: string
  phoneNumber: string
  companyName: string
  companyWebsite: string
  businessAddress: string
  businessType: string
  referralSource: string
  [key: string]: string // Add index signature for dynamic access
}

interface FormData {
  registerYourself: RegisterYourselfData
  services: any[]
  industries: any[]
  technologies: any[]
  features: any[]
  specialOffers: {
    discounts: any[]
    appliedDiscount: number
  }
  timeline: string
  budget: {
    paymentMethod: string
  }
  estimate: {
    accepted: boolean
  }
  agreement: {
    accepted: boolean
  }
  proceedOptions: {
    selectedOption: string | null
    completed: boolean
  }
}

interface Step {
  number: number
  name: string
  component: React.ReactNode
  isValid: boolean
  requiredFields?: string[]
}

// Storage keys
const STORAGE_KEYS = {
  FORM_DATA: "project_builder_form_data",
  CURRENT_STEP: "project_builder_current_step",
}

export default function GetStartedPage() {
  // Initialize form data from localStorage or use default values
  const [formData, setFormData] = useState<FormData>(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      try {
        const savedData = localStorage.getItem(STORAGE_KEYS.FORM_DATA)
        if (savedData) {
          return JSON.parse(savedData)
        }
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }

    // Default form data if nothing in localStorage
    return {
      registerYourself: {
        fullName: "",
        businessEmail: "",
        phoneNumber: "",
        companyName: "",
        companyWebsite: "",
        businessAddress: "",
        businessType: "",
        referralSource: "",
      } as RegisterYourselfData,
      services: [],
      industries: [],
      technologies: [],
      features: [],
      specialOffers: {
        discounts: [],
        appliedDiscount: 10,
      },
      timeline: "fast-track",
      budget: {
        paymentMethod: "milestone",
      },
      estimate: {
        accepted: false,
      },
      agreement: {
        accepted: false,
      },
      proceedOptions: {
        selectedOption: null,
        completed: false,
      },
    }
  })

  // Define all steps in the onboarding process with validation
  const [steps, setSteps] = useState<Step[]>([
    {
      number: 1,
      name: "Register Yourself",
      component: <RegisterYourself />,
      isValid: false,
      requiredFields: ["fullName", "businessEmail"],
    },
    {
      number: 2,
      name: "Services",
      component: <ServicesSelection />,
      isValid: false,
      requiredFields: [],
    },
    {
      number: 3,
      name: "Industries",
      component: <IndustriesSelection />,
      isValid: false,
      requiredFields: [],
    },
    {
      number: 4,
      name: "Technologies",
      component: <TechnologiesSelection />,
      isValid: false,
      requiredFields: [],
    },
    {
      number: 5,
      name: "Features",
      component: <FeaturesSelection />,
      isValid: false,
      requiredFields: [],
    },
    {
      number: 6,
      name: "Special Offers",
      component: <SpecialOffers />,
      isValid: true, // Always valid as it's optional
      requiredFields: [],
    },
    {
      number: 7,
      name: "Timeline",
      component: <Timeline />,
      isValid: true, // Always valid as it has default selection
      requiredFields: [],
    },
    {
      number: 8,
      name: "Estimate",
      component: <Estimate />,
      isValid: false, // Requires explicit acceptance
      requiredFields: [],
    },
    {
      number: 9,
      name: "Agreement",
      component: (
        <ServiceAgreement
          agreementData={{
            accepted: false,
          }}
          onUpdate={(data: { accepted: boolean }): void => {
            throw new Error("Function not implemented.")
          }}
        />
      ),
      isValid: false, // Requires explicit acceptance
      requiredFields: [],
    },
    {
      number: 10,
      name: "Proceed Options",
      component: (
        <ProceedOptions
          projectData={undefined}
          onUpdate={(data: { selectedOption: string | null; completed: boolean }): void => {
            throw new Error("Function not implemented.")
          }}
        />
      ),
      isValid: false, // Requires selection and completion
      requiredFields: [],
    },
  ])

  // Initialize current step from localStorage or default to 0
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP)
        if (savedStep !== null) {
          return Number.parseInt(savedStep, 10)
        }
      } catch (error) {
        console.error("Error loading saved step:", error)
      }
    }
    return 0
  })

  const [showPreviousStepsDropdown, setShowPreviousStepsDropdown] = useState(false)

  // State for sidebar visibility in mobile/tablet view
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(formData))
      } catch (error) {
        console.error("Error saving form data:", error)
      }
    }
  }, [formData])

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStepIndex.toString())
      } catch (error) {
        console.error("Error saving current step:", error)
      }
    }
  }, [currentStepIndex])

  // Update step validation based on form data
  useEffect(() => {
    setSteps((prevSteps) => {
      return prevSteps.map((step, index) => {
        switch (index) {
          case 0: // Register Yourself
            const registerValid =
              step.requiredFields?.every((field) => {
                // Type assertion to fix TypeScript error
                return formData.registerYourself[field] && formData.registerYourself[field].trim() !== ""
              }) || false
            return { ...step, isValid: registerValid }

          case 1: // Services
            return { ...step, isValid: formData.services.length > 0 }

          case 2: // Industries
            return { ...step, isValid: formData.industries.length > 0 }

          case 3: // Technologies
            // Check if all required technology categories have at least one selection
            const requiredCategories = ["Frontend Technologies", "Backend Technologies", "Database Technologies"]
            const hasAllRequiredCategories = requiredCategories.every((category) =>
              formData.technologies.some((tech) => tech.category === category),
            )
            return { ...step, isValid: hasAllRequiredCategories }

          case 4: // Features
            return { ...step, isValid: formData.features.length > 0 }

          case 7: // Estimate
            return { ...step, isValid: formData.estimate.accepted }

          case 8: // Agreement
            return { ...step, isValid: formData.agreement.accepted }

          case 9: // Proceed Options
            return { ...step, isValid: formData.proceedOptions.completed }

          default:
            return step
        }
      })
    })
  }, [formData])

  // Close sidebar when navigating on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [currentStepIndex])

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      if (steps[currentStepIndex].isValid) {
        setCurrentStepIndex((prevIndex) => prevIndex + 1)
        window.scrollTo(0, 0)
      } else {
        console.log("Current step is not valid yet")
      }
    }
  }

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to a specific step
  const goToStep = (index: number) => {
    // Only allow navigation to completed steps or the current step
    if (index >= 0 && index <= currentStepIndex) {
      setCurrentStepIndex(index)
      setShowPreviousStepsDropdown(false)
      window.scrollTo(0, 0)
    }
  }

  // Update form data
  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [section]: data,
      }
      return updated
    })
  }

  // Clear saved progress
  const clearProgress = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEYS.FORM_DATA)
        localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP)
        window.location.reload()
      } catch (error) {
        console.error("Error clearing progress:", error)
      }
    }
  }

  // Calculate progress percentage
  const progressPercentage = Math.round(((currentStepIndex + 1) / steps.length) * 100)

  // Get current step
  const currentStep = steps[currentStepIndex]

  // Get selection count based on current step
  const getSelectionCount = () => {
    switch (currentStepIndex) {
      case 1: // Services
        return formData.services.length
      case 2: // Industries
        return formData.industries.length
      case 3: // Technologies
        return formData.technologies.length
      case 4: // Features
        return formData.features.length
      case 5: // Special Offers
        return formData.specialOffers.appliedDiscount > 0
          ? `${formData.specialOffers.appliedDiscount}% discount applied`
          : "No discount applied"
      case 6: // Timeline
        return formData.timeline === "fast-track" ? "Fast-Track Delivery (30 Days)" : "Standard Delivery"
      case 7: // Estimate
        return formData.estimate.accepted ? "Estimate Accepted" : "Pending Acceptance"
      case 8: // Agreement
        return formData.agreement.accepted ? "Agreement Accepted" : "Pending Acceptance"
      case 9: // Proceed Options
        return formData.proceedOptions.selectedOption
          ? `Selected: ${
              formData.proceedOptions.selectedOption === "secure"
                ? "Secure My Project"
                : formData.proceedOptions.selectedOption === "quote"
                  ? "Request Formal Quote"
                  : "Schedule Consultation"
            }`
          : "No option selected"
      default:
        return ""
    }
  }

  // Render the current step component with props
  const renderCurrentStepComponent = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <RegisterYourself
            formData={formData.registerYourself}
            onUpdate={(data) => updateFormData("registerYourself", data)}
          />
        )
      case 1:
        return (
          <ServicesSelection
            selectedServices={formData.services}
            onUpdate={(data) => updateFormData("services", data)}
          />
        )
      case 2:
        return (
          <IndustriesSelection
            selectedIndustries={formData.industries}
            onUpdate={(data) => updateFormData("industries", data)}
          />
        )
      case 3:
        return (
          <TechnologiesSelection
            selectedTechnologies={formData.technologies}
            onUpdate={(data) => updateFormData("technologies", data)}
          />
        )
      case 4:
        return (
          <FeaturesSelection
            selectedFeatures={formData.features}
            selectedServices={formData.services}
            selectedIndustries={formData.industries}
            selectedTechnologies={formData.technologies}
            formData={formData}
            onUpdate={(data) => updateFormData("features", data)}
          />
        )
      case 5:
        return (
          <SpecialOffers
            discountData={formData.specialOffers}
            onUpdate={(data) => updateFormData("specialOffers", data)}
          />
        )
      case 6:
        return <Timeline selectedTimeline={formData.timeline} onUpdate={(data) => updateFormData("timeline", data)} />
      case 7:
        return (
          <Estimate
            selectedServices={formData.services}
            selectedIndustries={formData.industries}
            selectedTechnologies={formData.technologies}
            selectedFeatures={formData.features}
            appliedDiscount={formData.specialOffers.appliedDiscount}
            selectedTimeline={formData.timeline}
            onUpdate={(data) => updateFormData("estimate", data)}
          />
        )
      case 8:
        return (
          <ServiceAgreement
            agreementData={formData.agreement}
            buyerName={formData.registerYourself.fullName}
            onUpdate={(data) => updateFormData("agreement", data)}
          />
        )
      case 9:
        return <ProceedOptions projectData={formData} onUpdate={(data) => updateFormData("proceedOptions", data)} />
      default:
        return null
    }
  }

  // Render the sidebar content
  const renderSidebarContent = () => (
    <>
      <Image src="/favicon.ico" alt="Logo" width={60} height={60} className="mb-8 filter brightness-0 invert" />
      <h2 className="text-3xl font-bold mb-4">PROJECT BUILDER</h2>
      <p className="text-sm">Configure your project in a few simple steps</p>

      {/* Progress indicator */}
      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span className="text-xs">Progress</span>
          <span className="text-xs">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="mt-8 space-y-2 overflow-y-auto max-h-[calc(100vh-350px)]">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 py-1 px-2 rounded ${
              index === currentStepIndex ? "bg-white/10" : ""
            } ${index < currentStepIndex ? "cursor-pointer" : ""}`}
            onClick={() => index < currentStepIndex && goToStep(index)}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                index < currentStepIndex
                  ? "bg-[#FF6B35] text-white"
                  : index === currentStepIndex
                    ? "bg-white text-[#003087]"
                    : "bg-white/30 text-white"
              }`}
            >
              {index < currentStepIndex ? <Check className="w-3 h-3" /> : step.number}
            </div>
            <span className="text-sm">{step.name}</span>
          </div>
        ))}
      </div>

      {/* Selected count */}
      {currentStepIndex > 0 && (
        <div className="mt-8 p-4 bg-white/10 rounded-lg">
          <h3 className="font-medium mb-2">Your Selections</h3>
          <p className="text-sm">{getSelectionCount()}</p>
        </div>
      )}

      {/* Reset progress button */}
      <button
        type="button"
        onClick={() => {
          if (window.confirm("Are you sure you want to clear all progress and start over?")) {
            clearProgress()
          }
        }}
        className="mt-auto text-xs text-white/70 hover:text-white py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
      >
        Reset Progress
      </button>
    </>
  )

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6">
      <div className="w-full shadow-lg border border-gray-200 rounded-lg overflow-hidden max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row relative">
          {/* Mobile/Tablet Hamburger Menu */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-[#003087] text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded-md hover:bg-white/10"
                type="button"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="font-bold">PROJECT BUILDER</span>
            </div>
            <div className="text-sm">
              Step {currentStepIndex + 1}/{steps.length}
            </div>
          </div>

          {/* Mobile Progress Bar - Only visible on mobile */}
          <div className="sm:hidden px-4 py-2 bg-white border-b">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Blue sidebar - Desktop always visible, Mobile/Tablet in drawer */}
          <div
            className={`bg-[#003087] text-white lg:w-1/5 p-4 sm:p-6 lg:p-8 pt-8 lg:pt-12 flex flex-col
                        lg:relative lg:block
                        ${sidebarOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"}`}
          >
            {/* Close button for mobile sidebar */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-1 rounded-md hover:bg-white/10"
              type="button"
            >
              <X size={24} />
            </button>

            {renderSidebarContent()}
          </div>

          {/* Main content area */}
          <div className="w-full lg:w-4/5 flex flex-col">
            {/* Dynamic content based on current step */}
            <div className="flex-grow">{renderCurrentStepComponent()}</div>

            {/* Navigation */}
            <div className="flex justify-between items-center p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
              {currentStepIndex > 0 ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-md bg-[#FF6B35] border border-gray-300 text-white  transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-white" /> Previous
                  </button>
                </div>
              ) : (
                <div></div> // Empty div to maintain layout when there's no "Previous" button
              )}

              <div className="text-sm text-gray-500 hidden sm:block">
                Step {currentStepIndex + 1} of {steps.length}
              </div>

              <button
                type="button"
                onClick={goToNextStep}
                disabled={!steps[currentStepIndex]?.isValid}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-md transition-colors ${
                  steps[currentStepIndex]?.isValid
                    ? "bg-[#FF6B35] text-white hover:bg-[#e55a29]"
                    : "bg-white border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                {currentStepIndex === steps.length - 1 ? "Complete" : "Next"}
                <ArrowRight
                  className={`w-4 h-4 ${steps[currentStepIndex]?.isValid ? "text-white" : "text-gray-400"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress saved notification */}
      <div
        className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-md shadow-md text-sm flex items-center gap-2 opacity-0 transition-opacity duration-300"
        id="save-notification"
      >
        <Check className="w-4 h-4" />
        Progress saved
      </div>
    </div>
  )
}
