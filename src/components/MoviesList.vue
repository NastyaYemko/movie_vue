<template>
  <div class="favourites" v-if="favourites.length > 0">
    <div class="name">Favourite movies:</div>
    <div class="favourite_movie">
    <favourite-movies
        class="block"
        v-for="favourite in favourites"
        :movie="favourite"
        :key="favourite.id"
        @dislike="removeFromFavourite"
    />
    </div>
  </div>
  <div v-if="movies.length > 0">
    <movie-item
        class="searched_movie"
        v-for="movie in movies"
        :movie="movie"
        :genres="genres"
        :key="movie.id"
        @like="addToFavourite"
    />
  </div>
  <div v-else>List of movies is empty :(</div>
</template>

<script>
import MovieItem from "./MovieItem";
import FavouriteMovies from "./FavouriteMovies";

export default {
  components:{
    MovieItem, FavouriteMovies
  },
  name: "movies-list",
  data(){
    return {
      favourites: []
    }
  },
  props: {
    movies: {
      type: Array
    },
    genres: {
      type: Array
    },
  },
  methods: {
    addToFavourite(movie){
      const isPresent = this.favourites.find(favourite_movie => favourite_movie.id == movie.id)
      if(!isPresent) {
        this.favourites.push(movie)
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
        alert('Movie is added')
      }
      else alert('This movie was added to favourites')

    },
    removeFromFavourite(movie){
      this.favourites = this.favourites.filter( favourite_movie => movie.id != favourite_movie.id)
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    }
  },
  mounted() {
    if(localStorage.getItem('favourites')) {
      this.favourites = JSON.parse(localStorage.getItem('favourites'));
    }
  },
}
</script>

<style scoped>
.favourites {
  width: 90vw;
  height: 38vh;
  border-top: 5px double cornflowerblue;
  border-bottom: 5px double cornflowerblue;
  scrollbar-width: thin;
  overflow-x: auto
}
.favourite_movie {
  display: flex;
  flex-direction: row;
  margin: 5px;
}
.block {
  display: flex;
  flex-direction: column;
}
.name{
  text-align: center;
  font-size: 20px;
  font-style: italic;
  color: forestgreen;
}
.searched_movie{
  margin: 10px;
  padding: 5px;
}
</style>
