import matter from 'gray-matter';
import * as fs from 'fs';
import * as path from 'path';
import { SingleArticle } from 'types';

export async function getAllPosts(): Promise<Pick<SingleArticle, 'slug' | 'meta'>[]> {
  const slugs = getAllPostsSlugs();
  return Promise.all(slugs.map(async (slug) => {
    const { meta } = await getSinglePost(slug);
    return { slug, meta };
  }));
}

export function getAllPostsSlugs(): string[] {
  return fs.readdirSync(getPostsDirectory()).filter((f) => f.endsWith('.mdx')).map(normalizePostName);
}

function normalizePostName(postName: string): string {
  return postName.replace(/\.mdx$/, '');
}

export async function getSinglePost(slug: string): Promise<SingleArticle> {
  const filePath = path.join(getPostsDirectory(), slug + '.mdx');
  const contents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(contents);

  const meta: SingleArticle['meta'] = {
    title: data.title || slug,
    description: data.description || '',
    date: data.date?.toString() || '',
    imageUrl: data.imageUrl || '/demo-illustration-1.svg',
    tags: Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? data.tags.split(',') : []),
    author: data.author || 'FlorStroy',
  };

  return { slug, content, meta };
}

function getPostsDirectory(): string {
  return path.join(process.cwd(), 'posts');
}
