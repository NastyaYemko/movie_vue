import { createRouter, createWebHistory } from 'vue-router'
import PopularMovie from "../components/PopularMovie";
import Movie from "../components/Movie";
import PopularMovieWithStore from "../components/PopularMovieWithStore";

const routes = [
  {
    path: '/',
    component: PopularMovie
  },
  {
    path: '/movie/:id',
    component: Movie
  },
  {
    path: '/store',
    component: PopularMovieWithStore
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
