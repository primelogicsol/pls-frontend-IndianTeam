"use client"

import { useState } from "react"
import { Check, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ServiceAgreementProps {
  agreementData: {
    accepted: boolean
  }
  buyerName?: string
  onUpdate: (data: { accepted: boolean }) => void
}

export default function ServiceAgreement({ agreementData, buyerName = "", onUpdate }: ServiceAgreementProps) {
  const [accepted, setAccepted] = useState(agreementData.accepted)

  const handleAcceptChange = (checked: boolean) => {
    setAccepted(checked)
    onUpdate({ accepted: checked })
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-[#003087]" />
          SERVICE AGREEMENT
        </CardTitle>
        <CardDescription>Please review and accept our service agreement</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {buyerName && (
          <div className="mb-6 p-4 bg-gray-50 border rounded-md">
            <p className="font-medium text-lg">Client: {buyerName}</p>
            <p className="text-sm text-muted-foreground mt-1">Agreement Date: {new Date().toLocaleDateString()}</p>
          </div>
        )}

        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-semibold text-base mb-2">1. SCOPE OF SERVICES</h3>
            <p>
              Prime Logic Solutions ("Provider") agrees to provide the Client with software development services as
              outlined in the Statement of Requirements and Estimate. The services include design, development, testing,
              and deployment of the software solution according to the specifications agreed upon by both parties.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">2. TIMELINE AND DELIVERY</h3>
            <p>
              The Provider will deliver the project according to the timeline selected by the Client. Any changes to the
              timeline must be agreed upon in writing by both parties. The Provider will make reasonable efforts to meet
              all deadlines but is not responsible for delays caused by the Client or circumstances beyond the
              Provider's control.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">3. PAYMENT TERMS</h3>
            <p>
              The Client agrees to pay the Provider according to the payment schedule outlined in the Estimate. All
              payments are due within 15 days of invoice receipt. Late payments may result in project delays and
              additional fees. The Client is responsible for all applicable taxes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">4. INTELLECTUAL PROPERTY</h3>
            <p>
              Upon full payment, the Client will own all rights to the custom code developed specifically for this
              project. The Provider retains rights to any pre-existing code, frameworks, or tools used in the
              development process. The Provider may use general knowledge and techniques learned during the project for
              future work.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">5. CONFIDENTIALITY</h3>
            <p>
              Both parties agree to maintain the confidentiality of any proprietary information shared during the
              project. This includes business plans, technical specifications, and any other sensitive information. This
              obligation continues for two years after the completion of the project.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">6. CHANGES AND REVISIONS</h3>
            <p>
              Any changes to the project scope, timeline, or deliverables must be documented and approved by both
              parties. Additional work beyond the original scope may result in additional charges and timeline
              adjustments.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">7. WARRANTY AND SUPPORT</h3>
            <p>
              The Provider warrants that the delivered software will function according to the agreed specifications for
              a period of 30 days after delivery. The Provider will fix any bugs or issues covered by this warranty at
              no additional cost. Extended support and maintenance are available under separate agreements.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">8. LIMITATION OF LIABILITY</h3>
            <p>
              The Provider's liability is limited to the amount paid by the Client for the services. The Provider is not
              liable for any indirect, consequential, or incidental damages, including loss of profits or data.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">9. TERMINATION</h3>
            <p>
              Either party may terminate this agreement with 30 days' written notice. If the Client terminates the
              agreement, they are responsible for paying for all work completed up to the termination date. If the
              Provider terminates the agreement, they will provide a reasonable transition period and assist in
              transferring the project to another developer if requested.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">10. GOVERNING LAW</h3>
            <p>
              This agreement is governed by the laws of the jurisdiction where the Provider is located. Any disputes
              arising from this agreement will be resolved through arbitration according to the rules of the American
              Arbitration Association.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t pt-6">
        <div className="flex items-start space-x-2 mb-6">
          <Checkbox id="accept" checked={accepted} onCheckedChange={handleAcceptChange} />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="accept"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and accept the Service Agreement
            </Label>
            <p className="text-sm text-muted-foreground">
              By checking this box, you agree to be bound by the terms and conditions outlined in this agreement.
            </p>
          </div>
        </div>

        {accepted && (
          <div className="w-full p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-start gap-2">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Agreement Accepted</p>
                <p className="text-sm text-green-700 mt-1">
                  Thank you for accepting our Service Agreement. You can now proceed to the next step.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
