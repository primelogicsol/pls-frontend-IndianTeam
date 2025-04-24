"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ReviewSubmitStepProps {
  formValues: any
}

export default function ReviewSubmitStep({ formValues }: ReviewSubmitStepProps) {
  const { control } = useFormContext()

  const formatArrayToString = (array: string[] = [], mapping: Record<string, string> = {}) => {
    if (!array.length) return "None selected"
    return array.map((item) => mapping[item] || item).join(", ")
  }

  const projectTypeMapping: Record<string, string> = {
    website: "Website",
    "online-store": "Online Store",
    "web-app": "Web App",
    "improve-site": "Improve Current Site",
    "marketing-seo": "Marketing/SEO",
    exploring: "Exploring Options",
  }

  const serviceMapping: Record<string, string> = {
    strategy: "Strategy & Planning",
    design: "UI/UX Design",
    "web-dev": "Web Development",
    "mobile-app": "Mobile App",
    dashboard: "Admin Dashboard",
    ecommerce: "E-commerce",
    seo: "SEO/Digital Marketing",
    hosting: "Hosting & Maintenance",
    "not-sure": "Not sure yet",
  }

  const projectStageMapping: Record<string, string> = {
    exploring: "Just exploring",
    planning: "Planning stage",
    ready: "Ready to build",
    help: "Already started, need help",
    partner: "Looking for a partner/team",
  }

  const timelineMapping: Record<string, string> = {
    asap: "ASAP (1–2 weeks)",
    short: "2–4 weeks",
    medium: "1–2 months",
    flexible: "Flexible",
    exploring: "Just exploring",
  }

  const budgetMapping: Record<string, string> = {
    unknown: "I don't know yet",
    small: "<$500 (MVP/Basic Site)",
    medium: "$800 – $2,000 (Professional Website / App)",
    large: "$2,500 – $5,000 (Advanced Features or Systems)",
    enterprise: "$5,000+ (Scalable or Custom Platform)",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 10. Consent and Call to Action
        </h2>
        <p className="text-sm text-gray-500 mb-6">Please review your information before submitting.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium">{formValues.fullName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Company Name</p>
                <p className="font-medium">{formValues.companyName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{formValues.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{formValues.phone || "Not provided"}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-3">Project Details</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Project Type</p>
                <p className="font-medium">{formatArrayToString(formValues.projectTypes, projectTypeMapping)}</p>
              </div>
              <div>
                <p className="text-gray-500">Project Stage</p>
                <p className="font-medium">{projectStageMapping[formValues.projectStage] || "Not specified"}</p>
              </div>
              <div>
                <p className="text-gray-500">Services Needed</p>
                <p className="font-medium">{formatArrayToString(formValues.services, serviceMapping)}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-3">Timeline & Budget</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Timeline</p>
                <p className="font-medium">{timelineMapping[formValues.timeline] || "Not specified"}</p>
              </div>
              <div>
                <p className="text-gray-500">Budget</p>
                <p className="font-medium">{budgetMapping[formValues.budget] || "Not specified"}</p>
              </div>
            </div>
          </div>

          {formValues.vision && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Your Vision</h3>
                <p className="text-sm">{formValues.vision}</p>
              </div>
            </>
          )}

          {formValues.additionalNotes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Additional Notes</h3>
                <p className="text-sm">{formValues.additionalNotes}</p>
              </div>
            </>
          )}

          {formValues.files?.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Uploaded Files</h3>
                <ul className="text-sm space-y-1">
                  {formValues.files.map((file: File, index: number) => (
                    <li key={index}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <FormField
          control={control}
          name="privacyConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the Privacy Policy and Terms
                </label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="marketingConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I'd like occasional insights, tips, and updates
                </label>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          Thanks! We'll review your input and reach out within 24–48 hours. You're on your way!
        </p>
      </div>
    </div>
  )
}
