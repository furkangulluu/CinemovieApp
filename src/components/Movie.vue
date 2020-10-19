<template>
  <div class="col-md-4 mb-4">
    <div class="card">
      <router-link :to="movieDetailsPath">
        <Poster class="card-img-top" :src="posterPath" alt="movie.original_title" />
      </router-link>
      <div class="card-body">
          <h5 class="card-title">{{movie.original_title}}</h5>
          <p class="card-text">{{movie.overview}}</p>
      </div>
      <div class="card-footer">
        <small>Average Rating: {{movie.vote_average}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import Poster from './Shared/Poster'

export default {
  components:{
    Poster
  },
  props:{
    movie:{
      type:Object,
      required: true
    }
  },
  computed: {
    posterPath(){
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
    movieDetailsPath(){
      return `movie/${this.movie.id}`
    }
  },
}
</script>

<style>
  .card{
    transition: 0.3s;
  }
  .card-body{
    height:150px;
    overflow-y: scroll;
  }
  .card:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
</style>
