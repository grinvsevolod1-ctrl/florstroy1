"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Homepage = dynamic(() => import("../pages/index"), {
  ssr: false,
})

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Homepage posts={[]} />
}
