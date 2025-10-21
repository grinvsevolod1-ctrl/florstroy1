"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import Hero from "../views/HomePage/Hero"
import Partners from "../views/HomePage/Partners"
import ScrollableBlogPosts from "../views/HomePage/ScrollableBlogPosts"
import Testimonials from "../views/HomePage/Testimonials"
import Cta from "../views/HomePage/Cta"
import Features from "../views/HomePage/Features"
import FeaturesGallery from "../views/HomePage/FeaturesGallery"

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setMounted(true)
    // Fetch posts on client side
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <HomepageWrapper>
      <WhiteBackgroundContainer>
        <Hero />
        <Partners />
        <Features />
        <FeaturesGallery />
        <Testimonials />
        <ScrollableBlogPosts posts={posts} />
      </WhiteBackgroundContainer>
      <DarkerBackgroundContainer>
        <Cta />
      </DarkerBackgroundContainer>
    </HomepageWrapper>
  )
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`
