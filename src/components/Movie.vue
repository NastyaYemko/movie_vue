<template>
  <div class="movie">
    <div>
  <img :src="path" alt="">
    </div>
    <div class="description">
<h3><span class="name">Title:</span> {{movie.original_title}}</h3>
  <ul>
    <li v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</li>
  </ul>
  <div><span class="name">Overview:</span> {{movie.overview}}</div>
  <div><span class="name">Homepage:</span> {{movie.homepage}}</div>
  <div><span class="name">Popularity:</span> {{movie.popularity}}</div>
  <ul>
    <li v-for="company in movie.production_companies" :key="company.id">{{company.name}}</li>
  </ul>

  <div><span class="name">Date:</span> {{movie.release_date}}</div>
  <div><span class="name">Runtime:</span> {{movie.runtime}}</div>
  <div><span class="name">Votes:</span> {{movie.vote_average}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Movie",
  data(){
    return {
      isLoading: false,
      movie_id: this.$route.params.id,
      movie: {},
      path: "",
      poster: "",
      api_key: 'c6ec616f288a182ed86f78577f09a1df'
    }
  },
  methods: {
    async fetchMovie() {
      try {
        this.isLoading = true
        const details = await axios.get(`https://api.themoviedb.org/3/movie/${this.movie_id}`, {
          params: {
            api_key: this.api_key
          }
        })
        this.movie = details.data
        console.log(this.movie)
        this.poster = this.movie.poster_path
        this.path = "https://image.tmdb.org/t/p/w500" + this.poster
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.fetchMovie()
  },
}
</script>

<style scoped>
.movie{
  display: flex;
  flex-direction: row;
}
.description{
  padding: 20px;
}
.name{
  font-size: 20px;
  font-style: italic;
  color: forestgreen;
}
</style>
