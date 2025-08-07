import { error } from '@sveltejs/kit';
import { allPosts, allAuthors } from 'content-collections';
 
export async function load({ params }) {
  const post = allPosts.find((post) => post._meta.path == params.slug);

  if (!post) {
    error(404, `Could not find ${params.slug}`);
  }

  console.log(allAuthors)
  const author = allAuthors.find((author) => author._meta.path == post.author)
 
  return {
    post,
    author
  };
};

