<template>
  <my-input v-focus v-model="searchQuery" placeholder="Search..."/>
  <my-select v-model="selectedSort" :options="sortOptions"/>
  <h1>{{ $store.state.likes }}</h1>
  <h1>{{ $store.getters.doubleLikes }}</h1>
  <button @click="$store.commit('incrementLikes')">Like</button>
  <button @click="$store.commit('decrementLikes')">Dislike</button>
  <div v-if="!isLoading">
    <movies-list :movies="sortedAndSearchedMovies" :genres="genres"/>
    <pagination
        class="paginate"
        :page="page"
        :totalPages="totalPages"
        @change="setPage"
    />
  </div>
  <div v-else>Loading...</div>
  <div v-intersection="{name: 'www'}"></div>
</template>

<script>
import axios from "axios";
import MoviesList from "@/components/MoviesList";
import Pagination from "@/components/Pagination";

export default {
  name: "PopularMovie",
  components: {MoviesList, Pagination},
  data(){
    return{
      movies: [],
      genres: [],
      isLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'release_date', name: 'By date'},
      ],
      searchQuery: '',
      page: 1,
      totalPages: 0,
      api_key: 'c6ec616f288a182ed86f78577f09a1df'
    }
  },
  methods: {
    async fetchMovies () {
      try {
        this.isLoading = true
        const responce = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: this.api_key,
            page: this.page
          }
        })
        const genres = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: this.api_key
          }
        })
        this.totalPages = responce.data.total_pages
        this.movies = responce.data.results
        this.genres = genres.data.genres
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    setPage(pageNum){
      this.page = pageNum
    }
  },
  mounted() {
    this.fetchMovies()
  },
  computed: {
    sortedMovies() {
      return [...this.movies].sort((movie1, movie2) => {
        return movie1[this.selectedSort]?.localeCompare(movie2[this.selectedSort])
      })
    },
    sortedAndSearchedMovies() {
      return this.sortedMovies.filter(movie => movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    page() {
      this.fetchMovies()
    }
  }
}
</script>

<style scoped>
.paginate{
  width: 80%;
  scrollbar-width: thin;
  overflow-x: auto;
  margin: auto;
}
</style>
