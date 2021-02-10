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
                    <h2><a href="#">{{movie.title}}</a></h2>
                    <p class="mb-0"><i class="fas fa-list-alt"> </i>
                      <span v-if="movie.movie_type === 1">Full Movie</span>
                      <span v-else-if="movie.movie_type === 2">Short Movie</span>
                      <span v-else-if="movie.movie_type === 3">TV Show</span>
                    </p>
                  </div>
                  <div class="single-video-author box mb-3">
                    <div class="float-right" v-if="notPublishing">
                      <button v-if="movie.status === 'active'" class="btn btn-danger btn-sm" type="button" v-on:click="movieActivation()"><strong>Un-publish</strong>
                      </button>
                      <button v-else class="btn btn-success btn-sm" type="button" v-on:click="movieActivation()"><strong>Publish</strong>
                      </button>
                      <router-link :to="'' + movie.id+'/edit'" class="btn-sm btn btn btn-outline-info"><i class="fas fa-pen"></i>
                      </router-link>
                    </div>
                    <div class="osahan-progress" v-if="!notPublishing">
                      <div class="progress" >
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"   aria-valuemin="100" aria-valuemax="100" id="movieProgressBar" style="width: 100%">Processing</div>
                      </div>
                    </div>
                    <p><a href="#"><strong>{{movie.title}}</strong></a>
                      <i v-if="movie.status === 'active'" class="fas fa-check-circle text-success"></i>
                      <i v-else class="fas fa-times-circle text-danger"></i>
                    </p>
                    <small>Published on {{moment(movie.created_at) }}</small>
                  </div>
                  <div class="single-video-info-content box mb-3">

                    <h6>English Title:</h6>
                    <p>{{movie.title_english}}</p>
                    <h6>Summary:</h6>
                    <p>{{movie.summary}}</p>
                    <h6>Description:</h6>
                    <p>{{movie.description}}</p>
                    <h6>Cast:</h6>
                    <p>under Construction</p>
                    <h6>Category:</h6>
                    <p class="tags mb-0"><span v-for="(genre, index) in movie.genres" :key="index"><a href="#">{{genre.title}}</a> &nbsp; </span></p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="single-video-right">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="adblock">
                        <div class="img">
                          Google AdSense<br>
                          336 x 280
                        </div>
                      </div>
                      <div class="main-title">
                        <div class="btn-group float-right right-action">
                          <a href="#" class="right-action-link text-gray" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="false">
                            Sort by <i class="fa fa-caret-down" aria-hidden="true"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#"><i class="fas fa-fw fa-star"></i>
                              &nbsp; Top Rated</a>
                            <a class="dropdown-item" href="#"><i
                              class="fas fa-fw fa-signal"></i> &nbsp; Viewed</a>
                            <a class="dropdown-item" href="#"><i
                              class="fas fa-fw fa-times-circle"></i> &nbsp; Close</a>
                          </div>
                        </div>
                        <h6>Up Next</h6>
                      </div>
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

    import Nav from "./Partials/Nav";
    import SideBar from "./Partials/SideBar";
    import Footer from "./Partials/Footer";
    import axios from "axios";
    import moment from 'moment'
    import Plyr from 'plyr';
    export default {
      name: "MovieDetails",
      props:['id'],
      components: {
        Nav,
        SideBar,
        Footer
      },

      async created(){
        //get Movies data
        await this.getMovie()

      },
      mounted () {
        this.player = new Plyr('#player',{
          title: 'Movie Stream',
          debug: false,
          quality: { default: 240,},
          autoplay: false
        })
      },
      data(){
        return{
          movie_id: this.$route.params.id,
          user: [],
          dashboard: [],
          movie:[],
          notPublishing: true,
          movie_stream: '',
          movie_cover: '',
          player: []
        }
      },
      methods: {
        moment(date) {
          return moment(date).format('MMMM Do YYYY, h:mm:ss a');
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
            quality: {  default: 240, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]}
          }
          console.log(this.player)

          //get movie cover

        },
        // get current user function
        async getCurrentUser() {

          const userResponse = await axios.get('user');
          this.user = userResponse.data.user
        },
      }
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
