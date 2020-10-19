import service from '../services/service'

const state={
  movies:[],
  movieDetails:{},
  selectedMovieId:null,
  movieTimes: {},
  ticketPrices: [],
  halls: {},
  soldTickets: {},
}

const getters={
  getMovies(state){
    return state.movies;
  }
}

const mutations={
  setMovies(state,movies){
    state.movies.push(movies)
  },
  setMovieDetails(state,payload){
    // const {id,data}= payload; bu kullanımında vâr olduğunu bilmek için gösterdim ES6 ÖZELLİĞİ
    const movie= {[payload.id]:payload.data} //bu kullanım es6 ile gelen bi key/value pair'ında object add için kullanılan bi çözüm
    state.movieDetails = {...state.movieDetails,...movie};
  },
  setSelectedMovieId(state, id) {
    state.selectedMovieId = id;
  },
  setTicketPrices(state, prices) {
    state.ticketPrices = prices;
  },
  setMovieTimes(state, payload) {
    const times= {[payload.id]:payload.times}
    state.movieTimes={...state.movieTimes,...times}
  },
  setSelectedTime(state, time) {
    state.selectedTime = time;
  },
  setSelectedTicketOptions(state, tickets) {
    state.selectedTicketCounts = tickets;
  },
  setSelectedMovieHallId(state, id) {
    state.selectedMovieHallId = id;
  },
  setSeatingMap(state, payload) {

    console.log('Şuan setSeatingMapin içindeyim',payload)

    const { hallId, seating } = payload;
    state.halls[hallId] = seating;

    console.log('halls state',state.halls)

  },
  setSoldTickets(state, payload) {

    console.log('Şuan setSoldTicketsın içindeyim',payload)

    const { movieId, time, tickets } = payload;

    console.log('soldTickets state 1',state.soldTickets)

    state.soldTickets[movieId] = state.soldTickets[movieId] || {};
    state.soldTickets[movieId][time] = tickets;

    console.log('soldTickets state 2',state.soldTickets)
  },
  setSelectedSeats(state, seats) {
    state.selectedSeats = seats;
  },
}

const actions={
  fetchMovies(context){
    return service.fetchMovies().then(res=>{
      context.commit('setMovies',res.val())
     })
  },
  fetchMovieDetails(context,id){
    return service.fetchMovieDetail(id).then((res)=>{
      context.commit('setMovieDetails',{
        id:id,
        data:res.val()
      })
    })
  },
  fetchTicketPrices(context) {
    return service.fetchTicketPrices().then(res => {
      context.commit('setTicketPrices', res.val());
    });
  },
  fetchMovieTimes(context, id) {
    return service.fetchMovieTimes(id).then(res => {
      context.commit('setMovieTimes', { id, times: res.val() });
    });
  },
  fetchTicketingInfo(context, id) {
    return context.dispatch('fetchTicketPrices').then(() => {
      return context.dispatch('fetchMovieTimes', id);
    });
  },
  fetchSeatMap(context, hallId) {

    console.log('Şuan fetchSeatMapin içindeyim',hallId)

    return service.fetchSeating(hallId).then((res) => {
      context.commit('setSeatingMap', { hallId, seating: res.val() });
    });
  },
  fetchSoldTickets(context, { movieId, time }) {

    console.log('Şuan fetchSoldTicketsın içindeyim',movieId,time)

    return service.fetchSoldTickets({ movieId, time }).then((res) => {
      context.commit('setSoldTickets', { movieId, time, tickets: res.val() });
    });
  },
  fetchSeatingInfo(context, { movieId, time, hallId }) {
    console.log('Şuan fetchSeatingInfoun içindeyim',movieId,time,hallId)
    return context.dispatch('fetchSeatMap', hallId).then(() => {
      return context.dispatch('fetchSoldTickets', { movieId, time });
    });
  }

}

export default{
  state,
  getters,
  mutations,
  actions
}
