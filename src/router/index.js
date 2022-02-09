import { createRouter, createWebHistory } from 'vue-router'
import PopularMovie from "../components/PopularMovie";
import Movie from "../components/Movie";

const routes = [
  {
    path: '/',
    component: PopularMovie
  },
  {
    path: '/movie/:id',
    component: Movie
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
