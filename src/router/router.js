import About from '@/pages/About'
import Main from '@/pages/Main'
import Posts from '@/pages/Posts'
import Post from '@/pages/Post'
import PostsWithStorage from '@/pages/PostsWithStorage'
import PostsPageCompositionAPI from '@/pages/PostsPageCompositionAPI'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    component: Post
  },
  {
    path: '/store',
    component: PostsWithStorage
  },
  {
    path: '/composition',
    component: PostsPageCompositionAPI
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
