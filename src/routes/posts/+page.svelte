<script lang="ts">
  let { data } = $props();
</script>
 
<h1>Posts</h1>
<ul>
  {#each data.posts as post (post._meta.path)}
    <li>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <a href="/posts/{post._meta.path}">Read article</a>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </li>
  {/each}
</ul>
