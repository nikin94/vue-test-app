<template>
  <div class="root">
    <h1>Welcome</h1>
    <p>Vue 3 basic project for testing stuff</p>
    <p>Pages look similar but made in a different ways</p>
    <p>Not much styling, sorry ^_^</p>
    <br />
    <router-link to="/about">About</router-link>
    <router-link to="/posts">Posts</router-link>
    <router-link to="/store">Posts with storage</router-link>
    <router-link to="/composition">Posts with composition</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
}
</style>
