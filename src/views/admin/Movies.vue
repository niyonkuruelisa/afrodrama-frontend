<template>
  <!--    <h1>Welcome: {{user.lastName}}</h1>-->
  <div id="page-top">
    <Nav/>
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div class="container-fluid pb-0">
          <div class="row">
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card text-white bg-dark o-hidden h-100 border-none">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fas fa-fw fa-list-ul"></i>
                  </div>
                  <div class="mr-5"><b>{{dashboard.totalGenres}}</b> Categories</div>
                </div>
                <router-link class="card-footer text-white clearfix small z-1" to="ManageGenres">
                  <span class="float-left">Click to View Details</span>
                  <span class="float-right">
                      <i class="fas fa-angle-right"></i>
                  </span>
                </router-link>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card text-white bg-dark o-hidden h-100 border-none">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fas fa-fw fa-users"></i>
                  </div>
                  <div class="mr-5"><b>{{dashboard.totalMovieCharacters}}</b> Movie Characters</div>
                </div>
                <router-link class="card-footer text-white clearfix small z-1" to="ManageCharacters">
                  <span class="float-left">Click To View Details</span>
                  <span class="float-right">
                                    <i class="fas fa-angle-right"></i>
                                </span>
                </router-link>
              </div>
            </div>
          </div>

          <hr>


          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="main-title">
                  <h6>Uploaded Movies</h6>
                </div>
              </div>
              <div v-for="(movie,flag) in movies" class="col-xl-3 col-sm-6 mb-3" :key="flag">
                <div class="video-card">
                  <div class="video-card-image">
                    <router-link class="play-icon"  :to="'movies/' + movie.id"><i class="fas fa-play-circle"></i></router-link>
                    <div v-for="(cover,index) in movie.movie_covers" :key="index">
                      <router-link v-if="cover.cover_type === 'landscape'" :to="'movies/' + movie.id"><img class="img-fluid" :src="cover.url" alt=""></router-link>

                    </div>

                    <div class="time">3:50</div>
                  </div>
                  <div class="video-card-body">
                    <div class="video-title">
                      <router-link :to="'movies/' + movie.id">{{movie.title}}</router-link>
                    </div>
                    <div class="video-view">
                      Type: {{ movie.movie_type === 1 ? "Full Movie" : "Short Movie" }} <br>Categories: <span v-for="(genre,flag) in movie.genres" :key="flag"><span v-if="flag > 0">, </span>{{genre.title}} </span><br>Year: {{movie.year}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <Footer/>
      </div>

    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import '../../assets/styles/js/custom.js'
  /* eslint-disable */
  import Nav from './Partials/Nav'
  import SideBar from "./Partials/SideBar";
  import Footer from "./Partials/Footer";
  import axios from 'axios'
  export default {
    name: "MoviesManagement",
    components: {
      Nav,
      SideBar,
      Footer
    },
    data(){
      return{
        dashboard: [],
        movies:[],
        movie_cover:'',
      }
    },
    async created(){

      //get Movies data
      await this.getMovies()
      // get dashboard data
      await this.getDashboardData()
    },
    methods: {
      //get Movies data function
      async getMovies(){
        const movieResponse = await axios.get('movies');
        this.movies = movieResponse.data.movies
        for(let i = 0;i < this.movies.length;i++){

          for(let j = 0;j < this.movies[i].length;i++){

            if( this.movies[i][j].coverType === 'landscape')
              this.movie_cover = this.movies[i][j].url
              console.log("movie cover:" +  this.movie_cover)

          }
          console.log("movie cover:" +  this.movie_cover)

        }
        //get movie cover
        console.log(movieResponse.data.movies)
      },
      // get current user function
      async getCurrentUser(){

        const userResponse = await axios.get('user');
        this.user = userResponse.data.user
      },
      // get dashboard data function
      async getDashboardData(){

        const dashboardResponse = await axios.get('admin/dashboard')
        console.log(dashboardResponse.data)
        this.dashboard = dashboardResponse.data
      }
    }
  }
</script>

<style>

  @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
  @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
  @import '../../assets/styles/css/osahan.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';
</style>
