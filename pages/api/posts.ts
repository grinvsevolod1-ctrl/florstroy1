import type { NextApiRequest, NextApiResponse } from "next"
import { getAllPosts } from "utils/postsFetcher"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json([])
  }
}
