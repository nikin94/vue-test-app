<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input
      v-focus
      v-model="post.title"
      type="text"
      placeholder="Name"
      class="input"
    />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Description"
      class="input"
    />
    <my-button class="btn" @click="createPost">Create</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      if (!this.post.title || !this.post.body) return
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: flex-end;
}
</style>
