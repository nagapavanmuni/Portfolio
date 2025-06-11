"use client"

import dynamic from "next/dynamic"

const SoothingAnimatedBackground = dynamic(() => import("./soothing-animated-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 z-0" />,
})

export default function DynamicBackground() {
  return <SoothingAnimatedBackground />
}
