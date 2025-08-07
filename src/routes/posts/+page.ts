import { allPosts, type Post } from 'content-collections';
 
export function load() {
  const posts = allPosts.toSorted(
    (a: Post, b: Post) => b.date.getTime() - a.date.getTime(),
  )
 
  return {
    posts,
  };
};
