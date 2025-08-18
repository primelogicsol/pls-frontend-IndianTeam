"use client";

import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { STORAGE_KEYS, RegisterYourselfData } from "../page";

export interface Data {
  registerYourself: RegisterYourselfData;
  services: any[];
  industries: any[];
  technologies: any[];
  features: any[];
  specialOffers: {
    discounts: any[];
    appliedDiscount: number;
  };
  timeline: string;
  budget: { paymentMethod: string };
  estimate: {
    basePrice: { min: number; max: number };
    finalPrice: { min: number; max: number };
    discount: { percentage: number };
    rushFee: { percentage: number };
  };
  agreement: { accepted: boolean };
  proceedOptions: { selectedOption: string | null; completed: boolean };
}

export const SummaryPage = forwardRef<HTMLDivElement>((_, ref) => {
  const formData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(STORAGE_KEYS.FORM_DATA) || "{}")
      : {};

  return (
    <div ref={ref} className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Summary</h1>

      {/* Register Info */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Register Yourself</h2>
          <ul className="space-y-1 text-sm">
            {formData.registerYourself &&
              Object.entries(formData.registerYourself).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value) || "N/A"}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <ul className="list-disc pl-5 text-sm">
            {formData.services?.map((s, i) => (
              <li key={i}>
                {s.category} → {s.service}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Industries */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Industries</h2>
          <ul className="list-disc pl-5 text-sm">
            {formData.industries?.map((s, i) => (
              <li key={i}>
                {s.category} → {s.industry}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Technologies</h2>
          <ul className="list-disc pl-5 text-sm">
            {formData.technologies?.map((s, i) => (
              <li key={i}>
                {s.category} → {s.technology}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-5 text-sm">
            {formData.features?.map((s, i) => (
              <li key={i}>
                {s.category} → {s.feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Estimate */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Estimate</h2>
          {formData.estimate && (
            <>
              <p>
                Base Price: ${formData.estimate.basePrice?.min} -{" "}
                ${formData.estimate.basePrice?.max}
              </p>
              <p>
                Final Price: ${formData.estimate.finalPrice?.min} -{" "}
                ${formData.estimate.finalPrice?.max}
              </p>
              <p>Discount: {formData.estimate.discount?.percentage}%</p>
              <p>Rush Fee: {formData.estimate.rushFee?.percentage}%</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

SummaryPage.displayName = "SummaryPage";
