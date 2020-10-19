<template>
  <section>
    <Loader v-if="isLoading" class="mt-5"/>
    <section v-if="!isLoading">
      <img :src="backdropPath" class="backdrop" />
      <div class="container">
        <div class="row pt-5">
          <div class="col-sm-4">
            <img :src="posterPath" class="poster" />
          </div>
          <div class="col-sm-8">
            <div class="movie-details">
              <h2>{{movie.title}}</h2>
              <p>{{movie.overview}}</p>
              <div>Runtime: {{runtime}}</div>
              <div>Average Rating: {{movie.vote_average}}</div>
              <div>Product Company: {{movie.production_companies[0].name}}</div>
              <div>Release Date: {{movie.release_date}}</div>
              <div>Genre:
                <span
                  v-for="genre in movie.genres"
                  :key="genre.id">
                  {{genre.name}}
                </span>
                </div>
              <a :href="ticketPath" class="btn btn-success mt-4">Get Tickets</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import Loader from './Shared/Loader'
import BackdropImage from './Shared/BackdropImage'
import Poster from './Shared/Poster'

export default {
  components:{
    Loader,
    BackdropImage,
    Poster
  },
  data() {
    return {
      isLoading:true
    }
  },
  created() {
    this.$store.dispatch('fetchMovieDetails',this.movieId).then(res=>{
      this.isLoading=false
    })
  },
  computed: {
    movieId(){
      return this.$route.params.id;
    },
    movie(){
      //parametreli bir get işlemi yapılacaksa bu şekilde kullanılmalı, bir diğer çözüm olarak getter akıla gelebilir fakat vuex geliştiricileri getters da olabildiğince sadece ve basic get işlemlerinin olaması gerektiğini belirityorlar
      return this.$store.state.movieDetails[this.movieId]
    },
    backdropPath() {
      return `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}`;
    },
    posterPath() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
    runtime(){
      const { runtime } = this.movie;
      return `${Math.floor(runtime/60)}h ${runtime%60}m`
    },
    ticketPath(){
      return `${this.movieId}/tickets`
    }
  },
}
</script>

<style>
  img.backdrop {
    width: 100%;
    height: 100vh;
    filter: blur(30px);
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.1);
  }
  img.poster {
    width: 100%;
    border-radius: 6px;
  }
  .movie-details {
    float: left;
    color: #FFF;
    max-width: 700px;
  }
  .buy-btn {
    position: absolute;
    right: 0;
    top: -3px;
  }
</style>
