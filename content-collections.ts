import { defineCollection, defineConfig, defineParser } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";
import rehypeShiki from '@shikijs/rehype'
import JSON5 from 'json5'


// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration
const jsonParser = defineParser((content) => {
  return JSON5.parse(content)
})

type Meta = {
  _meta: {
    path: string
  }
}
function transform<T extends Meta>(document: T) {
  return {
    ...document,
    id: document._meta.path
  };
}

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    banner: z.string().optional(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()).optional()
  }),
  transform: async (document, context) => {
    const rehypePlugins = [
      [
        rehypeShiki,
        {
          langs: ['javascript', 'ruby', 'html', 'css', 'sql'],
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        }
      ]
    ]

    const html = await compileMarkdown(context, document, { rehypePlugins });

    return {
      ...document,
      id: document._meta.path,
      html,
    };
  },
});

const authors = defineCollection({
  name: "authors",
  directory: "content/authors",
  include: "*.json5",
  parser: jsonParser,
  transform,
  schema: z.object({
    name: z.string(),
  }),
})

const services = defineCollection({
  name: "services",
  directory: "content/services",
  include: "*.json5",
  parser: jsonParser,
  transform,
  schema: z.object({
    name: z.string(),
    price: z.number(),
  }),
})

export default defineConfig({
  collections: [authors, posts, services],
});
