<template>
  <div>
    <h1>Posts</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>
      <p>Loading ...</p>
      <p>Imagine spinner here :)</p>
    </div>
    <div v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'By title' },
        { value: 'body', name: 'By body' }
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          }
        )
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          }
        )
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  }
}
</script>

<style>
.app__btns {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 16px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}
</style>
