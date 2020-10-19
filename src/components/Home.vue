<template>
  <div>
    <Header/>
    <Loader v-if="isLoading"/>
    <div class="container mt-3">
      <div class="row hidden-md-up">
        <Movie :movie="movie" v-for="movie in movies[0]" :key="movie.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Shared/Header'
import Loader from './Shared/Loader'
import Movie from './Movie'

import {mapGetters} from 'vuex'

export default {
  components:{
    Header,
    Loader,
    Movie
  },
  data() {
    return {
      isLoading:true
    }
  },
  computed: {
    ...mapGetters({ movies:'getMovies'})
  },
  created() {
    this.$store.dispatch('fetchMovies').then(()=>{
      this.isLoading=false
    })
  }
}
</script>

