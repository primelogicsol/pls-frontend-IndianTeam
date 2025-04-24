"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UploadCloud } from "lucide-react"
import { useState } from "react"

export default function FilesNotesStep() {
  const { control, setValue, watch } = useFormContext()
  const files = watch("files") || []
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setValue("files", [...files, ...newFiles])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setValue("files", [...files, ...newFiles])
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="text-blue-500 mr-2">🔹</span> 7. Share References & Additional Notes
        </h2>
        <p className="text-sm text-gray-500 mb-6">Have a sketch, brand kit, or sample site you love? Upload it here.</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <FormLabel htmlFor="file-upload">Share References or Files (optional)</FormLabel>
            <FormDescription>
              Upload sketches, brand kits, or examples that can help us understand your vision better. Accepted formats:
              PDF, JPG, DOC, PNG
            </FormDescription>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.jpg,.jpeg,.doc,.docx,.png"
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Browse Files
            </button>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Uploaded Files:</p>
              <ul className="space-y-1">
                {files.map((file: File, index: number) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="truncate">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <FormField
          control={control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anything Else You Want to Tell Us?</FormLabel>
              <FormDescription>Drop us any extra notes, dreams, concerns, or ideas.</FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Share any additional information that might help us understand your project better..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
