<template>
  <div class="direction">
  <div><img :src="path" alt=""></div>
  <div class="description">
    <div>
      <h3>{{movie.title}}</h3>
      <div>{{movie.overview}}</div>
  <div><b>Genres:</b></div>
  <ul>
    <li v-for="genre in correctGenres" :key="genre.id">{{genre.name}}</li>
  </ul>
    </div>
  <div>Release data: {{movie.release_date}}</div>
    <div>
  <button class="open_button" @click="$router.push(`/movie/${movie.id}`)"> Open </button>
  <button class="like_button" @click="addToFavourite">Add to favourite</button>
    </div>
    </div>
  </div>
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
.direction{
  display: flex;
  flex-direction: row;
}
.description{
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}
.open_button{
  border-radius: 40px;
  border: 1px solid green;
  color: green;
  margin: 3px;
  padding: 5px;
  cursor: pointer;
}
.like_button{
  border-radius: 40px;
  border: 1px solid lightsalmon;
  color: lightsalmon;
  margin: 3px;
  padding: 5px;
  cursor: pointer;
}
</style>
