"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export default function VisionStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 4. Describe Your Vision
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Even a sentence or two is enough. Don't worry about technical language.
        </p>
      </div>

      <FormField
        control={control}
        name="vision"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tell us a bit about your idea or goal</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe your vision here..." className="min-h-[150px]" {...field} />
            </FormControl>
            <FormDescription>
              Examples:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>"I want a modern website for my consulting business."</li>
                <li>"I need a web app for managing freelance jobs."</li>
                <li>"We're redesigning our site to convert more users."</li>
              </ul>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
