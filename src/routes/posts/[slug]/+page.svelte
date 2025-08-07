<script lang="ts">
  let { data } = $props();
 
  const { author, post } = $derived(data);
</script>

<h1>{post.title}</h1>

<pre>{JSON.stringify(author, null, 2)}</pre>
<pre>{JSON.stringify(post, null, 2)}</pre>

{@html post.html}
