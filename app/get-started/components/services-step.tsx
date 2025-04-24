"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const services = [
  {
    id: "strategy",
    label: "Strategy & Planning",
  },
  {
    id: "design",
    label: "UI/UX Design",
  },
  {
    id: "web-dev",
    label: "Web Development",
  },
  {
    id: "mobile-app",
    label: "Mobile App",
  },
  {
    id: "dashboard",
    label: "Admin Dashboard",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
  },
  {
    id: "seo",
    label: "SEO/Digital Marketing",
  },
  {
    id: "hosting",
    label: "Hosting & Maintenance",
  },
  {
    id: "not-sure",
    label: "Not sure yet",
  },
]

export default function ServicesStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 5. What Do You Need From Us?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Select what you think applies — we'll refine it with you later.</p>
      </div>

      <FormField
        control={control}
        name="services"
        render={() => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <FormField
                  key={service.id}
                  control={control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.id)}
                            onCheckedChange={(checked) => {
                              // If selecting "not-sure", clear other selections
                              if (service.id === "not-sure" && checked) {
                                return field.onChange(["not-sure"])
                              }

                              // If selecting another option while "not-sure" is selected, remove "not-sure"
                              let newValue = [...field.value]
                              if (checked) {
                                if (newValue.includes("not-sure")) {
                                  newValue = newValue.filter((v) => v !== "not-sure")
                                }
                                newValue.push(service.id)
                              } else {
                                newValue = newValue.filter((v) => v !== service.id)
                              }

                              return field.onChange(newValue)
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">{service.label}</FormLabel>
                        </div>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
