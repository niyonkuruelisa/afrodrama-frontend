<template>
  <!--    <h1>Welcome: {{user.lastName}}</h1>-->
  <div id="page-top">

    <Nav/>
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div class="container-fluid pb-0">
          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-8">
                <div class="single-video-left">
                  <div class="single-video">
                    <video
                      controls
                      crossorigin
                      playsinline
                      :poster="movie_cover"
                      id="player">
                      <source v-for="(movie,index) in movie.movie_files"
                        :size="movie.resolutions"
                        :src="movie.streamURL"
                        type="video/mp4"
                              :key="index"
                      />
                    </video>

                  </div>
                  <div class="single-video-title box mb-3">
                    <h2>{{movie.title}}</h2>
                    <p class="mb-0"><i class="fas fa-list-alt"></i>
                      <span v-if="movie.movie_type === 1">Full Movie</span>
                      <span v-else-if="movie.movie_type === 2">Short Movie</span>
                      <span v-else-if="movie.movie_type === 3">TV Show</span>
                    </p>
                  </div>
                  <div class="single-video-author box mb-3">

                    <p><a href="#"><strong>{{movie.title}}</strong></a>
                      <i v-if="movie.status === 'active'" class="fas fa-check-circle text-success"></i>
                      <i v-else class="fas fa-times-circle text-danger"></i>
                    </p>
                    <small>Published on {{moment(movie.created_at)}}</small>
                    <input type="button"
                           style="display: none"
                           id="showPopup" data-toggle="modal"
                           data-target="#PackageModal"
                           data-backdrop="static"
                           data-keyboard="false">
                  </div>
                  <div class="single-video-info-content box mb-3">

                    <h6>English TiTle :</h6>
                    <p>{{movie.title_english}}</p>
                    <h6>Summary :</h6>
                    <p>{{movie.summary}}</p>
                    <h6>Description :</h6>
                    <p>{{movie.description}}</p>
                    <h6>Cast:</h6>
                    <p>under Construction</p>
                    <h6>Category :</h6>
                    <p class="tags mb-0"><span v-for="(genre, index) in movie.genres" :key="index"><a href="#">{{genre.title}}</a> &nbsp; </span></p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="single-video-right">
                  <div class="row">
                    <div class="col-md-12">
<!--                      <div class="adblock">-->
<!--                        <div class="img">-->
<!--                          Google AdSense<br>-->
<!--                          336 x 280-->
<!--                        </div>-->
<!--                      </div>-->
                      <div class="main-title">
<!--                        <div class="btn-group float-right right-action">-->
<!--                          <a href="#" class="right-action-link text-gray" data-toggle="dropdown"-->
<!--                             aria-haspopup="true" aria-expanded="false">-->
<!--                            Sort by <i class="fa fa-caret-down" aria-hidden="true"></i>-->
<!--                          </a>-->
<!--                          <div class="dropdown-menu dropdown-menu-right">-->
<!--                            <a class="dropdown-item" href="#"><i class="fas fa-fw fa-star"></i>-->
<!--                              &nbsp; Top Rated</a>-->
<!--                            <a class="dropdown-item" href="#"><i-->
<!--                              class="fas fa-fw fa-signal"></i> &nbsp; Viewed</a>-->
<!--                            <a class="dropdown-item" href="#"><i-->
<!--                              class="fas fa-fw fa-times-circle"></i> &nbsp; Close</a>-->
<!--                          </div>-->
<!--                        </div>-->
                        <h6>Up Next</h6>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div v-for="(movie, index) in nextMovies"  :key="index" class="video-card video-card-list">
                        <div class="video-card-image">
                          <div v-for="(cover,index) in movie.movie_covers" :key="index">
                            <router-link class="play-icon" v-if="cover.cover_type === 'landscape'" :to="'/movies/' + movie.id" :key="$route.fullPath"><i class="fas fa-play-circle"></i></router-link>
                            <router-link v-if="cover.cover_type === 'landscape'" :to="'/movies/' + movie.id" :key="$route.fullPath"><img class="img-fluid" :src="cover.url" :alt="movie.title"></router-link>

                          </div>
                          <div class="time">{{movie.year}}</div>
                        </div>
                        <div class="video-card-body">
                          <div class="video-title">
                            <router-link :to="'/movies/' + movie.id">{{movie.title}}</router-link>
                          </div>
                          <div class="video-page text-success">
                            Category: <span v-for="(genre, index) in movie.genres" :key="index"><span v-if="index > 0">, </span>{{genre.title}}</span>
                          </div>
                          <div class="video-view">
                            Type: {{ movie.movie_type === 1 ? "Full Movie" : "Short Movie" }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="PackageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                  <h5 class="modal-title" id="exampleModalLabel">Buy Subscription</h5>
                </div>
                <div class="modal-body">
                  <div class="card text-white bg-danger o-hidden h-100 border-none" v-if="!pack.undefined">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-play-circle"></i>
                      </div>
                      <div class="text-center"><h1><b>${{pack.amount}}</b></h1></div>
                      <div class="text-center"><h1><b>{{pack.package_type}}</b></h1></div>
                    </div>
                    <div class="card-footer text-white clearfix small z-1">
                      <div  class="main-title float-center center-section">
                        <button v-on:click="buySubscription(pack)" class="btn btn-lg btn-block btn-primary pl-4 pt-1 mb-2">Buy Now</button> &nbsp; &nbsp;
                      </div>

                    </div>
                  </div>

                </div>
                <div class="modal-footer float-center">
                  <button class="btn btn-danger" id="cancelSubscription" type="button" data-dismiss="modal"   ref="myBtn1">Cancel</button>
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

    import Nav from "./Partials/Nav";
    import SideBar from "./Partials/SideBar";
    import Footer from "./Partials/Footer";
    import axios from "axios";
    import moment from 'moment'
    import Plyr from 'plyr';
    /* eslint-disable */
    import {mapGetters} from "vuex";
    /* eslint-disable */
    export default {
      name: "UserMovieDetails",
      props:['id'],
      components: {
        Nav,
        SideBar,
        Footer
      },

      async created(){
        this.closeToggle()

        //get Movies data
        await this.getMovie()
        await this.getNextMovies()
        await this.checkSubscription()
      },
      mounted () {

        this.player = new Plyr('#player',{
          title: 'Movie Stream',
          debug: false,
          quality: { default: 240,},
          autoplay: false
        })


        this.player.on('ended', event => {
          const instance = event.detail.plyr
          if(instance.fullscreen.active) {

            instance.fullscreen.exit()
          }
        });
      },
      data(){
        return{
          movie_id: this.$route.params.id,
          dashboard: [],
          movie:[],
          nextMovies:[],
          notPublishing: true,
          movie_stream: '',
          movie_cover: '',
          player: [],
          previousTime: 0,
          currentTime: 0,
          seekStart: null,
          subscribed: false,
          pack: [],
          trackTimeFlag: 0,
        }
      },
      async beforeRouteUpdate(to,from ,next){
        //get Movies data
        const movie_id = to.params.id
        await this.updateMovie(movie_id)
        await this.updateNextMovies(movie_id)
        await this.checkSubscription()
        $('#cancelSubscription').click()
        next()
      },
      beforeRouteLeave(to,from ,next){
        $('#cancelSubscription').click()
        next()
      },
      methods: {
        buySubscription(pack){

        },
        async getNextMovies(){
          const latestMoviesData = {
            "type": "nextMovies",
            "movie_id": this.movie.id
          }
          const nextMoviesResponse = await axios.get('movies',{params: latestMoviesData});
          console.log(nextMoviesResponse)
          this.nextMovies = nextMoviesResponse.data.movies
        },

        async updateNextMovies(movie_id){
          const latestMoviesData = {
            "type": "nextMovies",
            "movie_id": movie_id
          }
          const nextMoviesResponse = await axios.get('movies',{params: latestMoviesData});
          console.log(nextMoviesResponse)
          this.nextMovies = nextMoviesResponse.data.movies
        },
        closeToggle(){

          setTimeout(function () {
            $("body").removeClass("sidebar-toggled")
            $("#toggleThis").removeClass("toggled")

            $("#toggleThis").addClass("toggled")
            $("body").addClass("sidebar-toggled")
          }, 1); // 555ms timing to load jQuery.js + network estimated delay
        },
        async movieActivation(){
          this.notPublishing = false

          const data = {
            id: this.movie.id,
            status: this.movie.status === 'inactive' ? 'active' : 'inactive'
          }

          const responseStatus = await axios.post('movie/activate',data);
          if(responseStatus.data.success){
            this.movie.status = responseStatus.data.status
            this.notPublishing = true
          }else{
            console.log(responseStatus.data)
          }

        },
        //get Movies data function
        async getMovie() {

          const movieResponse = await axios.get('movies/'+this.movie_id);
          this.movie = movieResponse.data.movie

          for(let i = 0;i < this.movie.movie_covers.length;i++){

            if( this.movie.movie_covers[i].coverType === 'landscape')
              this.movie_cover = this.movie.movie_covers[i].url
              console.log("movie cover:" +  this.movie_cover)

          }
          let sources = []

          for(let i = 0;i < this.movie.movie_files.length;i++){
            let source = {
              src: this.movie.movie_files[i].streamURL,
              type: 'video/mp4',
              size: this.movie.movie_files[i].resolutions,
            }
            console.log("source: "+source.src)
            sources.push(source)
          }

          this.player.source = {
            type: 'video',
            title: 'Movie Stream',
            sources: sources,
            poster: this.movie_cover,
            quality: {  default: 240, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]}
          }
          console.log(this.player)

          //get movie cover

        },
        async updateMovie(movie_id) {

          const movieResponse = await axios.get('movies/'+movie_id);
          this.movie = movieResponse.data.movie

          for(let i = 0;i < this.movie.movie_covers.length;i++){

            if( this.movie.movie_covers[i].coverType === 'landscape')
              this.movie_cover = this.movie.movie_covers[i].url
            console.log("movie cover:" +  this.movie_cover)

          }
          let sources = []

          for(let i = 0;i < this.movie.movie_files.length;i++){
            let source = {
              src: this.movie.movie_files[i].streamURL,
              type: 'video/mp4',
              size: this.movie.movie_files[i].resolutions,
            }
            console.log("source: "+source.src)
            sources.push(source)
          }

          this.player.source = {
            type: 'video',
            title: 'Movie Stream',
            sources: sources,
            poster: this.movie.movie_covers[1].url,
            quality: {  default: 240, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]}
          }
          console.log(this.player)

          //get movie cover

        },
        moment(date) {
          return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },
        async showPupUp(){
          this.trackTimeFlag++

          $('#showPopup').click()
          if (this.trackTimeFlag === 2){
            //console.log("times")
            axios.get('packages').then(res => {
              this.pack = res.data.packages[0]
              console.log(this.pack)
            })
          }

        },
        async checkSubscription(){
          await axios.get('subscription/subscription').then( res => {
            console.log(res.data)
            if(!res.data.success){
              this.player.on('timeupdate', event => {
                const instance = event.detail.plyr
                this.previousTime = this.currentTime
                this.currentTime = instance.currentTime
                //console.log(Math.round(instance.currentTime))
                if(Math.round(instance.currentTime) >= 5){
                  instance.currentTime = 5
                  instance.pause()
                  this.showPupUp()
                }
              });
              this.player.on('seeking', event => {
                if(this.seekStart === null) {
                  this.seekStart = this.previousTime
                }
              });
              this.player.on('seeked', event => {
                const instance = event.detail.plyr
                if(this.currentTime > this.seekStart) {

                  instance.currentTime = this.seekStart
                }
                this.seekStart = null;
              });
            }else{

            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
    }

</script>

<style>
  /*@import "~plyr/dist/plyr.css";*/
  @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
  @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
  @import '../../assets/styles/css/osahan.css';
  @import '../../assets/styles/css/vue-plyr.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';
</style>
