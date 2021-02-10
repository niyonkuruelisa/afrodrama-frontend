<template>
  <div id="page-top">
    <Nav/>
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div class="container-fluid pb-0">

          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="osahan-slider mr-4 ml-4">
                  <div v-for="(movie,index) in newMovies" :key="index">
                    <div v-for="(cover,index) in movie.movie_covers" :key="index">
                        <div v-if="cover.cover_type === 'cover'"  class="osahan-slider-item">
                          <router-link :to="'/movies/' + movie.id"><img :src="cover.url" class="img-fluid rounded" :alt="movie.title"></router-link>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-0">
          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="main-title">
                  <div class="btn-group float-right right-action">
                    <RouterLink :to="'/movies/Latest Movies/all'" class="right-action-link text-gray" >
                      Watch all <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </RouterLink>

                  </div>
                  <h6>Latest Movies</h6>
                </div>
              </div>
              <div class="col-xl-3 col-sm-3 col-md-2 mb-2" v-for="(movie,index) in latestMovies" :key="index">
                <div class="video-card">
                  <div class="video-card-image">
                    <router-link :to="'/movies/' + movie.id" class="play-icon"><i class="fas fa-play-circle"></i></router-link>
                    <div v-for="(cover,index) in movie.movie_covers" :key="index">
                      <router-link v-if="cover.cover_type === 'landscape'" :to="'/movies/' + movie.id"><img class="img-fluid" :src="cover.url" alt=""></router-link>

                    </div>
                    <div class="time">{{movie.year}}</div>
                  </div>
                  <div class="video-card-body">
                    <div class="video-title">
                      <router-link :to="'/movies/' + movie.id">{{movie.title}}</router-link>
                    </div>
                    <div class="video-view">
                      Category: <span v-for="(genre, index) in movie.genres" :key="index"><span v-if="index > 0">, </span>{{genre.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-0">
          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="main-title">
                  <div class="btn-group float-right right-action">
                    <RouterLink :to="'/movies/Full Movies/all'" class="right-action-link text-gray" >
                      Watch all <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </RouterLink>

                  </div>
                  <h6>Full Movies</h6>
                </div>
              </div>
              <div class="col-xl-2 col-sm-2 col-md-1 mb-1" v-for="(movie,index) in fullMovies" :key="index">
                <div class="video-card">
                  <div class="video-card-image">
                    <router-link :to="'/movies/' + movie.id" class="play-icon"><i class="fas fa-play-circle"></i></router-link>
                    <div v-for="(cover,index) in movie.movie_covers" :key="index">
                      <router-link v-if="cover.cover_type === 'portrait'" :to="'/movies/' + movie.id"><img class="img-fluid" :src="cover.url" alt=""></router-link>

                    </div>
                    <div class="time">{{movie.year}}</div>
                  </div>
                  <div class="video-card-body">
                    <div class="video-title">
                      <router-link :to="'/movies/' + movie.id">{{movie.title}}</router-link>
                    </div>
                    <div class="video-view">
                      Category: <span v-for="(genre, index) in movie.genres" :key="index"><span v-if="index > 0">, </span>{{genre.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-0">
          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="main-title">
                  <div class="btn-group float-right right-action">
                    <RouterLink :to="'/movies/Short Movies/all'" class="right-action-link text-gray" >
                      Watch all <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </RouterLink>

                  </div>
                  <h6>Short Movies</h6>
                </div>
              </div>
              <div class="col-xl-3 col-sm-3 col-md-2 mb-2" v-for="(movie,index) in shortMovies" :key="index">
                <div class="video-card">
                  <div class="video-card-image">
                    <router-link :to="'/movies/' + movie.id" class="play-icon"><i class="fas fa-play-circle"></i></router-link>
                    <div v-for="(cover,index) in movie.movie_covers" :key="index">
                      <router-link v-if="cover.cover_type === 'landscape'" :to="'/movies/' + movie.id"><img class="img-fluid" :src="cover.url" alt=""></router-link>
                    </div>
                    <div class="time">{{movie.year}}</div>
                  </div>
                  <div class="video-card-body">
                    <div class="video-title">
                      <router-link :to="'/movies/' + movie.id">{{movie.title}}</router-link>
                    </div>
                    <div class="video-view">
                      Category: <span v-for="(genre, index) in movie.genres" :key="index"><span v-if="index > 0">, </span>{{genre.title}}</span>
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
  /* eslint-disable */
  import $ from 'jquery'
  import '../../assets/styles/vendor/slick/slick.min'

  /* eslint-disable */
  export default {
      name: "Home",
      components: {
        Nav,
        SideBar,
        Footer
      },
      data(){
        return{
          home: 'home',
          newMovies:[],
          latestMovies:[],
          fullMovies:[],
          shortMovies:[],
        }
      },

      async created(){
        await this.getNewMovies()
        await this.getLatestMovies()
        await this.getFullMovies()
        await this.getShortMovies()


      },

      methods: {

        loadSlideShow(){
          setTimeout(function () {
            $("#toggleThis").addClass("toggled")
            $("body").addClass("sidebar-toggled")
            $(".osahan-slider").slick({ centerMode: !0, centerPadding: "200px", slidesToShow: 1, autoplay: true, responsive: [{ breakpoint: 768, settings: { arrows: !1, centerMode: !0, centerPadding: "40px", slidesToShow: 1 } }, { breakpoint: 480, settings: { arrows: !1, centerMode: !0, centerPadding: "40px", slidesToShow: 1 } }] })
          }, 10); // 555ms timing to load jQuery.js + network estimated delay

        },

        async getFullMovies(){
          const fullMoviesData = {
            "type": "fullMovies"
          }
          const fullMoviesResponse = await axios.get('movies',{params: fullMoviesData});
          this.fullMovies = fullMoviesResponse.data.movies
        },

        async getShortMovies(){
          const shortMoviesData = {
            "type": "shortMovies"
          }
          const shortMoviesResponse = await axios.get('movies',{params: shortMoviesData});
          this.shortMovies = shortMoviesResponse.data.movies
        },

        async getLatestMovies(){
          const latestMoviesData = {
            "type": "latestMovies"
          }
          const latestMoviesResponse = await axios.get('movies',{params: latestMoviesData});
          this.latestMovies = latestMoviesResponse.data.movies
        },

        async getNewMovies(){
          const newMoviesData = {
            "type": "newMovies"
          }
          const newMoviesResponse = await axios.get('movies',{params: newMoviesData});
          this.newMovies = newMoviesResponse.data.movies
          this.loadSlideShow()
        }
      }
    }
</script>

<style scoped>

  @import '../../assets/styles/vendor/slick/slick.min.css';
  @import '../../assets/styles/vendor/slick/slick-theme.min.css';
  @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
  @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
  @import '../../assets/styles/css/osahan.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';
  .osahan-slider-item{margin:0 8px;outline:0;cursor:pointer}
  .osahan-slider{margin:0 -24px}
</style>
