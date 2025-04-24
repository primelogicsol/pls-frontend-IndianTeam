"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const projectStages = [
  {
    id: "exploring",
    label: "Just exploring",
  },
  {
    id: "planning",
    label: "Planning stage",
  },
  {
    id: "ready",
    label: "Ready to build",
  },
  {
    id: "help",
    label: "Already started, need help",
  },
  {
    id: "partner",
    label: "Looking for a partner/team",
  },
]

export default function ProjectStageStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 3. Project Stage
        </h2>
        <p className="text-sm text-gray-500 mb-6">No pressure — we work with ideas at every level.</p>
      </div>

      <FormField
        control={control}
        name="projectStage"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                {projectStages.map((stage) => (
                  <FormItem
                    key={stage.id}
                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                  >
                    <FormControl>
                      <RadioGroupItem value={stage.id} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">{stage.label}</FormLabel>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Why we ask: Knowing where you are helps us recommend the right next steps.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
