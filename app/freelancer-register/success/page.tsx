import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Registration Successful!</CardTitle>
          <CardDescription>Thank you for submitting your application</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We have received your freelancer registration. Our team will review your application and get back to you
            soon.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
