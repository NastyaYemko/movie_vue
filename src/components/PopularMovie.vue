<template>
  <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..."
            v-focus
  />
  <my-select
      :model-value="selectedSort"
      @update:model-value="setSelectedSort"
      :options="sortOptions"
  />
  <div v-if="!isLoading">
    <movies-list
        :movies="sortedAndSearchedMovies"
        :genres="genres"/>
    <pagination
        class="paginate"
        :page="page"
        :totalPages="totalPages"
        @change:page="setPage"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import axios from "axios";
import MoviesList from "@/components/MoviesList";
import Pagination from "@/components/Pagination";
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: "PopularMovie",
  components: {MoviesList, Pagination},
  methods: {
    ...mapMutations({
      setPage: 'movie/setPage',
      setSearchQuery: 'movie/setSearchQuery',
      setSelectedSort: 'movie/setSelectedSort'
    }),
    ...mapActions({
      fetchMovies: 'movie/fetchMovies'
    }),
  },
  mounted() {
    this.fetchMovies()
  },
  computed: {
    ...mapState({
      movies: state => state.movie.movies,
      genres: state => state.movie.genres,
      isLoading: state => state.movie.isLoading,
      selectedSort: state => state.movie.selectedSort,
      sortOptions: state => state.movie.sortOptions,
      searchQuery: state => state.movie.searchQuery,
      page: state => state.movie.page,
      totalPages: state => state.movie.totalPages,
      api_key: state => state.movie.api_key
    }),
    ...mapGetters({
      sortedMovies: 'movie/sortedMovies',
      sortedAndSearchedMovies: 'movie/sortedAndSearchedMovies'
    }),
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
