"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CalendarClock } from "lucide-react"
import Link from "next/link"

import PersonalInfoStep from "./components/personal-info-step"
import ProjectTypeStep from "./components/project-type-step"
import ProjectStageStep from "./components/project-stage-step"
import VisionStep from "./components/vision-step"
import ServicesStep from "./components/services-step"
import TimelineBudgetStep from "./components/timeline-budget-step"
import FilesNotesStep from "./components/files-notes-step"
import ReviewSubmitStep from "./components/review-submit-step"

const formSchema = z.object({
  // Personal Info
  fullName: z.string().min(2, { message: "Full name is required" }),
  companyName: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  referralSource: z.string().optional(),

  // Project Type
  projectTypes: z.array(z.string()).min(1, { message: "Please select at least one project type" }),

  // Project Stage
  projectStage: z.string().min(1, { message: "Please select your project stage" }),

  // Vision
  vision: z.string().min(10, { message: "Please provide a brief description of your vision" }),

  // Services
  services: z.array(z.string()).min(1, { message: "Please select at least one service" }),

  // Timeline & Budget
  timeline: z.string().min(1, { message: "Please select your timeline expectation" }),
  budget: z.string().min(1, { message: "Please select your budget range" }),

  // Files & Notes
  files: z.array(z.any()).optional(),
  additionalNotes: z.string().optional(),

  // Consent
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy and Terms",
  }),
  marketingConsent: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  "Who Are You?",
  "What Are You Looking For?",
  "Project Stage",
  "Describe Your Vision",
  "What Do You Need?",
  "Timeline & Budget",
  "Files & Notes",
  "Review & Submit",
]

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      referralSource: "",
      projectTypes: [],
      projectStage: "",
      vision: "",
      services: [],
      timeline: "",
      budget: "",
      files: [],
      additionalNotes: "",
      privacyConsent: false,
      marketingConsent: false,
    },
    mode: "onChange",
  })

  const { handleSubmit, trigger, watch } = methods
  const formValues = watch()

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep)
    const isValid = await trigger(fieldsToValidate as any)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    window.scrollTo(0, 0)
  }

  const getFieldsToValidate = (step: number) => {
    switch (step) {
      case 0:
        return ["fullName", "email"]
      case 1:
        return ["projectTypes"]
      case 2:
        return ["projectStage"]
      case 3:
        return ["vision"]
      case 4:
        return ["services"]
      case 5:
        return ["timeline", "budget"]
      case 6:
        return [] // Files & Notes are optional
      case 7:
        return ["privacyConsent"]
      default:
        return []
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    console.log("Form submitted:", data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanks, {formValues.fullName}!</h2>
            <p className="text-gray-600 mb-6">
              We've received your information and will reach out within 24-48 hours to discuss your project.
            </p>
            <p className="text-sm text-gray-500 mb-6">A confirmation email has been sent to {formValues.email}</p>
            <Button asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Start Shaping Your Idea</h1>
          <p className="text-lg text-gray-600">Tell us where you are, and we'll take you further.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">{steps[currentStep]}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 0 && <PersonalInfoStep />}
                {currentStep === 1 && <ProjectTypeStep />}
                {currentStep === 2 && <ProjectStageStep />}
                {currentStep === 3 && <VisionStep />}
                {currentStep === 4 && <ServicesStep />}
                {currentStep === 5 && <TimelineBudgetStep />}
                {currentStep === 6 && <FilesNotesStep />}
                {currentStep === 7 && <ReviewSubmitStep formValues={formValues} />}

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="flex items-center">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="flex items-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Get Started"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center">
            <CalendarClock className="h-5 w-5 mr-2" />
            Want to skip the form?
          </p>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            Book a free discovery call instead →
          </Button>
        </div>
      </div>
    </div>
  )
}
