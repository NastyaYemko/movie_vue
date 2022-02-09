<template>
  <div class="favourite_movie">
<div>{{movie.title}}</div>
  <img class="pic" :src="path" alt="">
  <div>{{movie.release_date}}</div>
  <button class="open_button" @click="$router.push(`/movie/${movie.id}`)"> Open </button>
  <button class="remove_button" @click="removeFromFavourite">Remove from favourites</button>
  </div>
</template>

<script>

export default {
  name: "favourite-movies",
  data(){
    return {
      path: "https://image.tmdb.org/t/p/w500" + this.movie.backdrop_path
    }
  },
  props: {
    movie: {
      type: Object
    }
  },
  methods: {
    removeFromFavourite(){
      this.$emit('dislike', this.movie)
    }
  },
}
</script>

<style scoped>
.favourite_movie {
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pic {
  width: 200px;
}
.open_button{
  border-radius: 40px;
  border: 1px solid green;
  color: green;
  margin: 3px;
  padding: 5px;
  cursor: pointer;
}
.remove_button{
  border-radius: 40px;
  border: 1px solid red;
  color: red;
  margin: 3px;
  padding: 5px;
  cursor: pointer;
}
</style>
