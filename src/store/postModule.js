import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    dialogVisible: false,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'id', name: 'By ID' },
      { value: 'title', name: 'By title' },
      { value: 'body', name: 'By body' }
    ]
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        typeof post1[state.selectedSort] === 'number'
          ? post1[state.selectedSort] > post2[state.selectedSort]
          : post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    createPost(state, post) {
      state.posts.push(post)
      state.dialogVisible = false
    },
    removePost(state, post) {
      state.posts = state.posts.filter(p => p.id !== post.id)
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool
    },
    setDialogVisible(state) {
      state.dialogVisible = true
    },
    setDialogInvisible(state) {
      state.dialogVisible = false
    },
    setPage(state, page) {
      state.page = page
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      console.log('fetchPosts')
      try {
        commit('setLoading', true)
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit
            }
          }
        )
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )
        commit('setPosts', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoading', false)
      }
    },
    async loadMorePosts({ state, commit }) {
      console.log('loadMorePosts')
      try {
        commit('setPage', state.page + 1)
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit
            }
          }
        )
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )
        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        console.log(e)
      }
    }
  },
  namespaced: true
}
