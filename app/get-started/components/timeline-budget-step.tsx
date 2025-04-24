"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const timelineOptions = [
  {
    id: "asap",
    label: "ASAP (1–2 weeks)",
  },
  {
    id: "short",
    label: "2–4 weeks",
  },
  {
    id: "medium",
    label: "1–2 months",
  },
  {
    id: "flexible",
    label: "Flexible",
  },
  {
    id: "exploring",
    label: "Just exploring",
  },
]

const budgetOptions = [
  {
    id: "unknown",
    label: "I don't know yet",
  },
  {
    id: "small",
    label: "<$500 (MVP/Basic Site)",
  },
  {
    id: "medium",
    label: "$800 – $2,000 (Professional Website / App)",
  },
  {
    id: "large",
    label: "$2,500 – $5,000 (Advanced Features or Systems)",
  },
  {
    id: "enterprise",
    label: "$5,000+ (Scalable or Custom Platform)",
  },
]

export default function TimelineBudgetStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 6. Timeline & Budget
        </h2>
        <p className="text-sm text-gray-500 mb-6">We'll suggest a plan based on this information.</p>
      </div>

      <div className="space-y-8">
        <FormField
          control={control}
          name="timeline"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Timeline Expectations</FormLabel>
              <FormDescription>We'll suggest a plan based on this.</FormDescription>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                  {timelineOptions.map((option) => (
                    <FormItem
                      key={option.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">{option.label}</FormLabel>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="budget"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Budget Range</FormLabel>
              <FormDescription>You're not locked into this — it just helps us scope things.</FormDescription>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                  {budgetOptions.map((option) => (
                    <FormItem
                      key={option.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">{option.label}</FormLabel>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription className="mt-2">
                Don't worry: We offer options for different budgets and phases.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
