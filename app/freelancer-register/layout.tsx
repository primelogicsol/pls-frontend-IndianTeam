import type React from "react"
export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-slate-50 py-12">{children}</div>
}
