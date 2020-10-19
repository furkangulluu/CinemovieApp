<template>
  <div>
    <Loader v-if="isLoading" class="mt-5"/>
    <section v-if="hasSeatingInfo">
      <img :src="backdropPath" class="backdrop" />
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <img :src="posterPath" class="poster" />
            <button
              @click="navigateToSuccessPage"
              :disabled="selectedTicketCount != selectedSeatCount"
              class="btn btn-success btnBuy">Buy Tickets</button>
              <p class="customAlert" v-if="seatAlert">{{alertDesc}}</p>
          </div>
          <div class="col-sm-8">
            <div class="movie-details">
              <div class="seating">
                <div class="scene">SCENE</div>
                <div class="seats" v-for="(seats, row) in seatMap" :key="seats.name">
                  <span class="row-title">{{row}}</span>
                  <div class="row">
                    <span
                      @click="toggleSeat(row, seat)"
                      v-for="(seat,index) in seats"
                      :key="index"
                      :class="{
                        'not-allowed': !seat,
                        'not-available': isSeatSold(row, seat),
                        'selected': isSeatSelected(row, seat)
                      }">
                      {{seat}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MovieDetails from './MovieDetails'

export default {
  mixins: [MovieDetails],
  data() {
    return {
      selectedSeats: [],
      alertDesc:null,
      hasSeatingInfo: false
    }
  },
  created() {
    const options = {
      movieId: this.$route.params.id,
      time: this.$store.state.selectedTime,
      hallId: this.$store.state.selectedMovieHallId,
    };

    if (!options.time || !options.hallId) {
      return this.$router.push(`/movie/${options.movieId}/tickets`);
    }

    this.$store.dispatch('fetchSeatingInfo', options).then(() => {
      this.hasSeatingInfo = true;
    });
  },
  computed: {
    seatMap() {
      const { halls, selectedMovieHallId } = this.$store.state;
      console.log(halls)
      return halls[selectedMovieHallId].seating;
    },
    soldTickets() {
      const movieId = this.$route.params.id;
      const { soldTickets, selectedTime } = this.$store.state;
      if (soldTickets && soldTickets[movieId] && soldTickets[movieId][selectedTime]) {
        return soldTickets[movieId][selectedTime];
      }
      return [];
    },
    selectedTicketCount() {
      let count = 0;
      for (let key in this.$store.state.selectedTicketCounts) {
        console.log(key)
        count += this.$store.state.selectedTicketCounts[key];
      }
      return count;
    },
    selectedSeatCount() {
      return this.selectedSeats.length;
    },
    seatAlert(){
      if(this.selectedSeats.length > this.selectedTicketCount){
        this.alertDesc = 'You have been reached the choose limit!'
        return true
      }
      if(this.selectedSeats.length < this.selectedTicketCount){
        this.alertDesc = 'You must choose seat/seats!'
        return true
      }
      return false
    }
  },
  methods: {
    isSeatSold(row, seat) {
      return this.soldTickets.indexOf(`${row}${seat}`) > -1;
    },
    isSeatSelected(row, seat) {
      return this.selectedSeats.indexOf(`${row}${seat}`) > -1;
    },
    toggleSeat(row, seat) {
      const key = `${row}${seat}`;

      if (this.selectedSeats.indexOf(key) > -1) {
        this.selectedSeats.splice(this.selectedSeats.indexOf(key), 1);
      } else {
        this.selectedSeats.push(key);
      }
    },
    navigateToSuccessPage() {
      this.$store.commit('setSelectedSeats', this.selectedSeats);
      this.$router.push('/confirmation');
    }
  },
}
</script>


<style>
.seating {
  width: 694px;
  position: relative;
  display: grid;
  place-items: center;
}
.seating .scene {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  width: 400px;
  height: 35px;
  background-color: #000;
  border-radius: 3px;
}
.seating .row-title {
  float: left;
  font-weight: bold;
  width: 50px;
}
.seating .row {
  display: inline-block;
}
.seating .row span {
  float: left;
  width: 40px;
  height: 25px;
  border: 1px solid #FFF;
  text-align: center;
  margin: 0 2px;
  cursor: pointer;
}
.seating .row span:not(.not-allowed):not(.not-available):hover {
  background: #FFF;
  color: #000;
}
.seating .row span.not-allowed {
  background: #9d9d9d;
  cursor: not-allowed;
  pointer-events:none
}
.seating .row span.not-available {
  background: #E4112B;
  cursor: not-allowed;
  pointer-events:none
}
.seating .row span.selected {
  background: #5cb85c;
}
.btnBuy {
  width: 100%;
  height: 60px;
  font-size: 22px;
  cursor: pointer;
  margin-top: 20px;
}

.customAlert{
  background-color: rgba(256, 0, 0, 0.3);
  color: #FFF;
  text-align: center;
  padding: 7px;
  font-size: 15px;
  margin-top: 15px;
  border-radius: 5px;
}
</style>
