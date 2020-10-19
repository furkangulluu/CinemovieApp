<template>
  <img class="backdropImage" :src="imagePath">
</template>

<script>
export default {
  props:{
    imageName:{
      type: String,
      required:true
    }
  },
  computed: {
    imagePath(){
      return `https://image.tmdb.org/t/p/w1280${this.imageName}`
    }
  },
}
</script>

<style scoped>
  img{
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    filter: blur(30px);
    transform: scale(1.1);
  }
</style>
