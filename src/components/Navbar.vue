<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3 test</div>
    <div class="navbar__btns">
      <my-button class="btn" @click="$router.push('/about')">About</my-button>
      <my-button class="btn" @click="$router.push('/posts')">Posts</my-button>
      <my-button class="btn" @click="$router.push('/store')"
        >Posts with storage</my-button
      >
      <my-button class="btn" @click="$router.push('/composition')"
        >Posts with Composition API</my-button
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: gray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.navbar__btns {
  margin-left: auto;
}

.btn:not(:first-child) {
  margin-left: 16px;
}
</style>
