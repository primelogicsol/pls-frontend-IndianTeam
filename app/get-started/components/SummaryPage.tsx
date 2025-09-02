"use client";

import { forwardRef } from "react";
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
    <div
      ref={ref}
      className="w-[850px] mx-auto bg-white shadow-lg rounded-xl p-10 space-y-8 border border-gray-200"
    >
      {/* Header */}
      <header className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-indigo-700">
          Project Summary
        </h1>
        <p className="text-gray-500 text-sm">
          Auto-generated overview of your project
        </p>
      </header>

      {/* Register Info */}
      <section>
        <h2 className="text-xl font-semibold text-indigo-600 mb-3">
          👤 Register Yourself
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {formData.registerYourself &&
            Object.entries(formData.registerYourself).map(([key, value]) => (
              <div key={key}>
                <span className="flex bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded mr-2">
                  {key}
                </span>
                <span className="text-gray-800">
                  {String(value) || "N/A"}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold text-purple-600 mb-3">🛠️ Services</h2>
        <div className="flex flex-wrap gap-2">
          {formData.services?.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
            >
              {s.category} → {s.service}
            </span>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section>
        <h2 className="text-xl font-semibold text-green-600 mb-3">🌍 Industries</h2>
        <div className="flex flex-wrap gap-2">
          {formData.industries?.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
            >
              {s.category} → {s.industry}
            </span>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section>
        <h2 className="text-xl font-semibold text-blue-600 mb-3">💻 Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {formData.technologies?.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
            >
              {s.category} → {s.technology}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xl font-semibold text-pink-600 mb-3">✨ Features</h2>
        <div className="flex flex-wrap gap-2">
          {formData.features?.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-pink-100 text-pink-700 text-sm font-medium rounded-full"
            >
              {s.category} → {s.feature}
            </span>
          ))}
        </div>
      </section>

      {/* Estimate */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-600 mb-3">📊 Estimate</h2>
        {formData.estimate && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 border rounded-lg bg-yellow-50">
              <p className="text-gray-600 text-xs">Base Price</p>
              <p className="font-bold text-gray-800">
                ${formData.estimate.basePrice?.min} – $
                {formData.estimate.basePrice?.max}
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-yellow-50">
              <p className="text-gray-600 text-xs">Final Price</p>
              <p className="font-bold text-gray-800">
                ${formData.estimate.finalPrice?.min} – $
                {formData.estimate.finalPrice?.max}
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-yellow-50">
              <p className="text-gray-600 text-xs">Discount</p>
              <p className="font-bold text-green-700">
                {formData.estimate.discount?.percentage}%
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-yellow-50">
              <p className="text-gray-600 text-xs">Rush Fee</p>
              <p className="font-bold text-red-600">
                {formData.estimate.rushFee?.percentage}%
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="pt-6 border-t text-center text-xs text-gray-500">
        Generated on {new Date().toLocaleDateString()} | Confidential
      </footer>
    </div>
  );
});

SummaryPage.displayName = "SummaryPage";
