<template>
<div>{{movie.title}}</div>
  <img :src="path" alt="">
  <div>Genres:</div>
  <ul>
    <li v-for="genre in correctGenres" :key="genre.id">{{genre.name}}</li>
  </ul>
  <div>{{movie.release_date}}</div>
  <button @click="$router.push(`/movie/${movie.id}`)"> Open </button>
  <button @click="addToFavourite">Add to favourite</button>
</template>

<script>

export default {
  name: "movie-item",
  data(){
    return {
      correctGenres: [],
      path: "https://image.tmdb.org/t/p/w500" + this.movie.backdrop_path
    }
  },
  props: {
    movie: {
      type: Object
    },
    genres: {
      type: Array
    }
  },
  methods: {
    selectGenres(){
      this.movie.genre_ids.forEach(genreId => {
        this.genres.forEach(genre => {
          if(genreId == genre.id) this.correctGenres.push(genre)
        })
      })
    },
    addToFavourite(){
      this.$emit('like', this.movie)
    }
  },
  mounted() {

    this.selectGenres()
  },
}
</script>

<style scoped>

</style>
