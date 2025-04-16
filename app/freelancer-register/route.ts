import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  yourPortfolio: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject1: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject2: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject3: z.string().url({ message: "Please enter a valid URL." }),
  detail: z.string().min(10, { message: "Details must be at least 10 characters." }),
  niche: z.string().min(2, { message: "Please specify your skills/niche." }),
  address: z.string().min(2, { message: "Please enter your address." }),
  country: z.string().min(2, { message: "Please enter your country." }),
  yearOfExperience: z.string().min(1, { message: "Please enter your years of experience." }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const result = formSchema.safeParse(body)

    if (!result.success) {
      // Return validation errors
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const data = result.data

    // Here you would typically save the data to a database
    console.log("Freelancer registration data:", data)

    // Return success response
    return NextResponse.json({ success: true, message: "Registration successful" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 })
  }
}
