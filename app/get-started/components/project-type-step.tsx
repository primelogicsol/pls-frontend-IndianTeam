"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const projectTypes = [
  {
    id: "website",
    label: "I need a Website",
  },
  {
    id: "online-store",
    label: "I need an Online Store",
  },
  {
    id: "web-app",
    label: "I need a Web App",
  },
  {
    id: "improve-site",
    label: "I want to improve my current site",
  },
  {
    id: "marketing-seo",
    label: "I need help marketing or SEO",
  },
  {
    id: "exploring",
    label: "I'm just exploring options",
  },
]

export default function ProjectTypeStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 2. What Are You Looking For?
        </h2>
        <p className="text-sm text-gray-500 mb-2">Choose one or more, not sure? We'll guide you anyway.</p>
        <p className="text-sm font-medium mb-6">✅ What can we help you build?</p>
      </div>

      <FormField
        control={control}
        name="projectTypes"
        render={() => (
          <FormItem>
            <div className="space-y-4">
              {projectTypes.map((type) => (
                <FormField
                  key={type.id}
                  control={control}
                  name="projectTypes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={type.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, type.id])
                                : field.onChange(field.value?.filter((value: string) => value !== type.id))
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">{type.label}</FormLabel>
                        </div>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormDescription className="mt-4">
              Tip: If you're unsure, just select "I'm just exploring" — we'll figure it out together.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
