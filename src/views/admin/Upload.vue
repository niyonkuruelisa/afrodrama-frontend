<template>
  <!--    <h1>Welcome: {{user.lastName}}</h1>-->
  <div id="page-top">
    <Nav/>
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div v-if="movieUploading" class="container-fluid upload-details">
          <div class="row">
            <div class="col-lg-12">
              <div class="main-title">
                <h6>Upload Details</h6>
              </div>
            </div>
            <div class="col-lg-2">
              <div id="MoviePreview"></div>
            </div>
            <div class="col-lg-10">
              <div class="osahan-title">{{movie.title}}</div>
              <div class="osahan-size" id="movieProgress">0 Remaining</div>
              <div class="osahan-progress">
                <div class="progress" id="movieProgressBarLoad">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0"   aria-valuemin="0" aria-valuemax="100" id="movieProgressBar" style="width: 0%"></div>
                </div>
              </div>
              <div class="osahan-desc" id="movieUploadingMessage">Your Video is still uploading, please keep this page open until it's done.</div>
            </div>
            <div class="col-lg-12" id="movieFinished" style="display: none">
              <div class="form-group">
                <div class="osahan-area text-center mt-3">
                  <a href="movies" class="btn btn-outline-primary">Finish</a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div v-if="coverSaved && !movieUploading" class="container-fluid pt-5 pb-5">
          <div class="row">
            <div class="col-md-8 mx-auto text-center upload-video pt-5 pb-5">
              <h1><i class="fas fa-file-upload text-primary"></i></h1>
              <h4 class="mt-5">Select movie file to upload</h4>
              <!--              <p class="land">or drag and drop video files</p>-->
              <div class="mt-4">
                <input type="file"
                       ref="movieFile"
                       style="display: none"
                       v-on:change="uploadMovieFile()"
                       accept="video/mp4,video/x-m4v,video/*"
                       id="movieFile">
                <button class="btn btn-outline-primary" onclick="document.getElementById('movieFile').click()" >Upload Movie</button>
              </div>
            </div>
          </div>
        </div>


        <div v-else class="container-fluid pb-0">

          <div class="row" v-if="movieId !== '' && !movieUploading">


            <div class="col-lg-12">
              <div class="main-title">
                <h6>Upload Cover Art</h6>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group">
                <label for="movieCoverArtButton">Choose Cover Art</label>
                <input type="file"
                       ref="coverArt"
                       style="display: none"
                       v-on:change="uploadCoverArtImage()"
                       accept="image/x-png,image/gif,image/jpeg,image/png"
                       id="movieCoverArt">
                <button class="form-control btn btn-outline-primary" type="button" id="movieCoverArtButton" onclick="document.getElementById('movieCoverArt').click()" >Select Cover Art to upload</button>
              </div>
            </div>
            <div v-if="thumbnailCoverIsSelected" class="col-lg-4">
              <div  id="coverArtPreview"></div>
            </div>
            <div v-if="thumbnailCoverIsSelected" class="col-lg-8 mb-10">
              <div class="osahan-title">{{thumbnailCover}}</div>
              <div class="osahan-size">{{thumbnailCoverSize}}</div>
              <div class="osahan-progress">
                <div v-if="!isCoverUploaded" class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0"   aria-valuemin="0" aria-valuemax="100" :style="{ width: `${thumbnailCoverProgress}%` }"></div>
                </div>
              </div>
              <div class="osahan-desc">{{thumbnailCoverUploadingMessage}}</div>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <label for="moviePortraitArtButton">Choose Portrait Art</label>
                <input type="file"
                       ref="portraitArt"
                       style="display: none"
                       v-on:change="uploadPortraitArtImage()"
                       accept="image/x-png,image/gif,image/jpeg,image/png"
                       id="moviePortraitArt">
                <button class="form-control btn btn-outline-primary" type="button" id="moviePortraitArtButton" onclick="document.getElementById('moviePortraitArt').click()" >Select Portrait Art to upload</button>
              </div>
            </div>
            <div v-if="thumbnailPortraitIsSelected" class="col-lg-2">
              <div id="portraitArtPreview"></div>
            </div>
            <div v-if="thumbnailPortraitIsSelected" class="col-lg-10 mb-10">
              <div class="osahan-title">{{thumbnailPortrait}}</div>
              <div class="osahan-size">{{thumbnailPortraitSize}}</div>
              <div class="osahan-progress">

                <div v-if="!isPortraitUploaded" class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0"   aria-valuemin="0" aria-valuemax="100" :style="{ width: `${thumbnailPortraitProgress}%` }"></div>
                </div>

              </div>
              <div class="osahan-desc">{{thumbnailPortraitUploadingMessage}}</div>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <label for="moviePortraitArtButton">Choose Landscape Art</label>
                <input type="file"
                       ref="landscapeArt"
                       style="display: none"
                       v-on:change="uploadLandscapeArtImage()"
                       accept="image/x-png,image/gif,image/jpeg,image/png"
                       id="movieLandscapeArt">
                <button class="form-control btn btn-outline-primary" type="button" id="movieLandscapeArtButton" onclick="document.getElementById('movieLandscapeArt').click()" >Select Landscape Art to upload</button>
              </div>
            </div>
            <div  v-if="thumbnailLandscapeIsSelected" class="col-lg-4">
              <div id="landscapeArtPreview"></div>
            </div>
            <div  v-if="thumbnailLandscapeIsSelected" class="col-lg-8 mb-10">
              <div class="osahan-title">{{thumbnailLandscape}}</div>
              <div class="osahan-size">{{thumbnailLandscapeSize}}</div>
              <div class="osahan-progress">
                <div v-if="!isLandscapeUploaded" class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0"   aria-valuemin="0" aria-valuemax="100" :style="{ width: `${thumbnailLandscapeProgress}%` }"></div>
                </div>
              </div>
              <div class="osahan-desc">{{thumbnailLandscapeUploadingMessage}}</div>
            </div>
            <div class="col-lg-12">
              <div class="form-group">
                <div class="osahan-area text-center mt-3">
                  <button v-on:click="handleMovieCovers()" class="btn btn-outline-primary">Continue To Upload Movie</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="movieId == '' && !coverSaved">

            <div class="col-lg-12">
              <div class="main-title">
                <h6>Upload Details</h6>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="osahan-form">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieTitle">Movie Title</label>
                      <input v-model="movieTitle" type="text"
                             placeholder="Rust" id="movieTitle"
                             class="form-control" >
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieTitleLong">Movie Title Long</label>
                      <input v-model="movieTitleLong" type="text"
                             placeholder="Rust, return of the reign (2020)" id="movieTitleLong"
                             class="form-control" >
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieTitleEnglish">Movie Title English</label>
                      <input v-model="movieTitleEnglish" type="text"
                             placeholder="Rust, return of the reign (2020)" id="movieTitleEnglish"
                             class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieSummary">Movie Summary</label>
                      <textarea v-model="movieSummary" rows="2" id="movieSummary" name="e2" class="form-control"></textarea>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieDescription">Movie Description</label>
                      <textarea v-model="movieDescription" rows="5" id="movieDescription" name="e2" class="form-control"></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="movieType">Movie Type</label>
                      <select v-model="movieType" id="movieType" class="custom-select">
                        <option value="0">Choose Movie Type</option>
                        <option value="1">Full Movie</option>
                        <option value="2">Short Movie</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <label for="movieResolution">Movie Resolution</label>
                      <select v-model="movieResolution" id="movieResolution" class="custom-select">
                        <option value="">Choose Movie Resolution</option>
                        <option value="720">720p</option>
                        <option value="240">240p</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">

                      <label for="movieYear">Movie Released Year</label>
                      <input v-model="movieYear" type="month"  id="movieYear" class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label for="movieYoutubeTrailerCode">Youtube Trailer Code (Optional)</label>
                      <input v-model="movieYoutubeTrailerCode" type="text"
                             placeholder="Like this (dqw4w9wgxcq)" id="movieYoutubeTrailerCode"
                             class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row ">
                  <div class="col-lg-12">
                    <div class="main-title">
                      <h6>Category / Genre</h6>
                    </div>
                  </div>
                </div>
                <div class="row category-checkbox">

                  <div v-for="(genre, index) in genres" class="col-lg-2 col-xs-6 col-4" :key="index">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" :id="genre.id" v-on:change="selectGenre(genre.id)">
                      <label class="custom-control-label" :for="genre.id">{{genre.title}}</label>
                    </div>
                  </div>

                </div>
              </div>
              <div class="osahan-area text-center mt-3">
                <button v-on:click="handleMovieInfo()" class="btn btn-outline-primary">Save Changes & Continue</button>
              </div>
              <hr>
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
    name: "AdminUpload",
    components: {
      Nav,
      SideBar,
      Footer
    },
    async created(){
      // get genres
      await this.getGenres()
    },
    data(){
      return{
        //working with movie file upload
        movieUploading:false,
        // working with uploading thumbnails
        thumbnailCover: '',
        thumbnailCoverUpload: {},
        thumbnailCoverIsSelected: false,
        thumbnailCoverSize: 0,
        isCoverUploaded: false,
        thumbnailCoverSizeLoaded: '',
        thumbnailCoverProgress: 0,
        thumbnailCoverUploadingMessage: 'Your Cover is still uploading, please keep this page open until it\'s done.',


        thumbnailPortrait: '',
        thumbnailPortraitIsSelected: false,
        thumbnailPortraitUpload: {},
        thumbnailPortraitSize: 0,
        isPortraitUploaded: false,
        thumbnailPortraitSizeLoaded: '',
        thumbnailPortraitProgress: 0,
        thumbnailPortraitUploadingMessage: 'Your Portrait is still uploading, please keep this page open until it\'s done.',



        thumbnailLandscape: '',
        thumbnailLandscapeIsSelected: false,
        thumbnailLandscapeUpload: {},
        thumbnailLandscapeSize: 0,
        isLandscapeUploaded: false,
        thumbnailLandscapeSizeLoaded: '',
        thumbnailLandscapeProgress: 0,
        thumbnailLandscapeUploadingMessage: 'Your Landscape is still uploading, please keep this page open until it\'s done.',


        coverSaved: false,


        movieUploadedSize: '0 Kb',
        movieTotalSize: '0 Kb',
        movieUploading: false,
        isMovieUploaded:false,
        movieProgress: 0,


        movie: [],
        movieId: '',
        movieTitle: '',
        movieTitleEnglish: '',
        movieTitleLong: '',
        movieSummary: '',
        movieDescription: '',
        movieType: 0,
        movieYoutubeTrailerCode: '',
        movieYear: '',
        selectedGenres: [],
        movieResolution: '',
        genres: [],
      }
    },
    methods: {
      //handle movie finish
      handleMovieFinish(){
        this.$routes.push('/movies')
      },
      //handle uploading a movie
      async uploadMovieFile() {
        //close upload layout and display uploading layout
        this.movieUploading = true
        let URL_UPLOAD_MOVIE = 'http://localhost:4000/'
        let file = this.$refs.movieFile.files[0]
        if (!file) return;

        // load image
        let fileURL = URL.createObjectURL(this.thumbnailLandscapeUpload);
        this.thumbnailLandscapeSize = bytesToSize(this.thumbnailLandscapeUpload.size, 1)
        const intel = setInterval(function () {
          $('#MoviePreview').html('<img class="imgplace" src="' + fileURL + '" />')
          clearInterval(intel);
        }, 1)

        const form = new FormData()
        form.append('movie', file)
        form.append('name', file.name)
        form.append('size', file.size)
        form.append('movie_id', this.movieId)
        form.append('resolutions', this.movieResolution)

        const response = await axios.post('uploadMovieFile', form, {
          onUploadProgress: (event) => {
            document.getElementById('movieProgress').innerHTML = bytesToSize(event.loaded) + ' of ' + bytesToSize(event.total) + ' Remaining';
            document.getElementById("movieProgressBar").style.width = Math.ceil((event.loaded / event.total) * 100) + "%";
            //console.log(Math.ceil((event.loaded / event.total )*  100))
            if (event.loaded === event.total) {
              document.getElementById("movieProgressBarLoad").style.display = "none";
              document.getElementById("movieFinished").style.display = "";
              document.getElementById("movieUploadingMessage").innerHTML = "Movie is Successfully Uploaded!";

            }
          }
        });
        if (response.data.success) {

        } else {
          console.log(response)
        }
        //movie progress
      },
      //check if all covers are being saved
      handleMovieCovers(){
        if(this.isCoverUploaded && this.isPortraitUploaded &&this.isLandscapeUploaded){
          this.coverSaved = true

        }else{
          alert("Warning: Please Upload All Movie Covers")
        }
      },
      // upload cover art
      async uploadCoverArtImage(){
        // resetting all data whenever the function is called
        this.isCoverUploaded = false
        this.thumbnailCoverUploadingMessage = 'Your Cover is still uploading, please keep this page open until it\'s done.'
        this.thumbnailCoverProgress = 0

        if(this.$refs.coverArt.files[0] !== undefined){
          this.thumbnailCoverUpload = this.$refs.coverArt.files[0]
          this.thumbnailCover = this.thumbnailCoverUpload.name
          this.thumbnailCoverIsSelected = true


          // load image
          let fileURL = URL.createObjectURL(this.thumbnailCoverUpload);
          this.thumbnailCoverSize = bytesToSize(this.thumbnailCoverUpload.size,1)
          const intel  = setInterval(function (){
            $('#coverArtPreview').html('<img class="imgplace1" src="'+fileURL+'" />')
            clearInterval(intel);
          },1)

          const form = new FormData()
          form.append('cover',this.thumbnailCoverUpload)
          form.append('type','cover')
          form.append('name',this.thumbnailCoverUpload.name)
          form.append('size',this.thumbnailCoverUpload.size)
          form.append('movie_id',this.movieId)

          const response = await axios.post('uploadMovieCover',form,{
            onUploadProgress: (event) => {
              this.thumbnailCoverSizeLoaded = bytesToSize(event.loaded,1)
              this.thumbnailCoverProgress = Math.ceil((event.loaded / event.total )*  100)
              //console.log(Math.ceil((event.loaded / event.total )*  100))
            }
          });
          if(response.data.success){
            this.isCoverUploaded = true
            this.thumbnailCoverUploadingMessage = 'Cover Uploaded Successfully'
          }else{
            console.log(response)
          }
        }
      },
      async uploadPortraitArtImage(){
        // resetting all data whenever the function is called
        this.isPortraitUploaded = false
        this.thumbnailPortraitUploadingMessage = 'Your Portrait is still uploading, please keep this page open until it\'s done.'
        this.thumbnailPortraitProgress = 0

        //check if file is selected
        if(this.$refs.portraitArt.files[0] !== undefined){
          this.thumbnailPortraitUpload = this.$refs.portraitArt.files[0]
          this.thumbnailPortrait = this.thumbnailPortraitUpload.name
          this.thumbnailPortraitIsSelected = true

          // load image
          let fileURL = URL.createObjectURL(this.thumbnailPortraitUpload);
          this.thumbnailPortraitSize = bytesToSize(this.thumbnailPortraitUpload.size,1)
          const intel  = setInterval(function (){
            $('#portraitArtPreview').html('<img class="imgplace2" src="'+fileURL+'" />')
            clearInterval(intel);
          },1)

          // creating form-data to upload file with info
          const form = new FormData()
          form.append('cover',this.thumbnailPortraitUpload)
          form.append('type','portrait')
          form.append('name',this.thumbnailPortraitUpload.name)
          form.append('size',this.thumbnailPortraitUpload.size)
          form.append('movie_id',this.movieId)

          // uploading form to server
          const response = await axios.post('uploadMovieCover',form,{
            onUploadProgress: (event) => {
              // calculating progress and display uploading progress
              this.thumbnailPortraitSizeLoaded = bytesToSize(event.loaded,1)
              this.thumbnailPortraitProgress = Math.ceil((event.loaded / event.total )*  100)

            }
          });
          // check if form was uploaded successfully or no
          if(response.data.success){
            this.isPortraitUploaded = true
            this.thumbnailPortraitUploadingMessage = 'Portrait Uploaded Successfully'
          }else{
            console.log(response)
          }

        }
      },
      async uploadLandscapeArtImage(){
        // resetting all data whenever the function is called
        this.isLandscapeUploaded = false
        this.thumbnailLandscapeUploadingMessage = 'Your Landscape is still uploading, please keep this page open until it\'s done.'
        this.thumbnailLandscapeProgress = 0

        //check if file is selected
        if(this.$refs.landscapeArt.files[0] != undefined){
          this.thumbnailLandscapeUpload = this.$refs.landscapeArt.files[0]
          this.thumbnailLandscape = this.thumbnailLandscapeUpload.name
          this.thumbnailLandscapeIsSelected = true

          // load image
          let fileURL = URL.createObjectURL(this.thumbnailLandscapeUpload);
          this.thumbnailLandscapeSize = bytesToSize(this.thumbnailLandscapeUpload.size,1)
          const intel  = setInterval(function (){
            $('#landscapeArtPreview').html('<img class="imgplace2" src="'+fileURL+'" />')
            clearInterval(intel);
          },1)

          // creating form-data to upload file with info
          const form = new FormData()
          form.append('cover',this.thumbnailLandscapeUpload)
          form.append('type','landscape')
          form.append('name',this.thumbnailLandscapeUpload.name)
          form.append('size',this.thumbnailLandscapeUpload.size)
          form.append('movie_id',this.movieId)

          // uploading form to server
          const response = await axios.post('uploadMovieCover',form,{
            onUploadProgress: (event) => {
              // calculating progress and display uploading progress
              this.thumbnailLandscapeSizeLoaded = bytesToSize(event.loaded,1)
              this.thumbnailLandscapeProgress = Math.ceil((event.loaded / event.total )*  100)

            }
          });

          // check if form was uploaded successfully or no
          if(response.data.success){
            this.isLandscapeUploaded = true
            this.thumbnailLandscapeUploadingMessage = 'Landscape Uploaded Successfully'
            console.log(response.data)
          }else{
            console.log(response)
          }

        }
      },

      async handleMovieInfo(){
        const data  = {
          movie: {
            "imdb_code": "",
            "title": this.movieTitle,
            "title_english": this.movieTitleEnglish,
            "title_long": this.movieTitleLong,
            "runtime": "",
            "movie_type": this.movieType,
            "year": this.movieYear.substring(0, 4),
            "summary": this.movieSummary,
            "description": this.movieDescription,
            "yt_trailer_code": this.movieYoutubeTrailerCode,
            "status": "inactive",
            "movieGenres": this.selectedGenres
          }
        }
        let responseMovies = []
        if (data.movie.title === ''){
          alert('ERROR: Please Enter Movie Title')}
        else if (data.movie.title_english === 0){
          alert('ERROR: Please Choose Movie English Title')}
        else if (data.movie.title_long === 0){
          alert('ERROR: Please Enter Movie Summary')}
        else if (data.movie.description === 0){
          alert('ERROR: Please Movie Description')}
        else if (data.movie.movie_type === 0){
          alert('ERROR: Please Choose Movie type')}
        else if (this.movieResolution === ''){
          alert('ERROR: Please Choose Movie Resolution')}
        else if (data.movie.year === ''){
          alert('ERROR: Please Choose Movie Released Year')}
        else if (data.movie.movieGenres.length < 1){
          alert('ERROR: Please Choose At least one movie category/genre')}
        else{
          responseMovies.data = {}
          responseMovies = await axios.post('movies', data);
          if(responseMovies.data.success){
            this.movie = responseMovies.data.movie
            this.movieId = responseMovies.data.movie.id
            this.selectedGenres = responseMovies.data.movieGenres
          }
        }

      },
      //get selected genre
      selectGenre(genreID){
        console.log(this.selectedGenres)
        const movie_genre = {
          genre_id: genreID,
          movie_id: this.movieId
        }
        let found = false;
        for (let i = 0; i < this.selectedGenres.length; i++) {
          if (this.selectedGenres[i].genre_id === genreID) {
            found = true;
            this.selectedGenres.splice(i,1)
            break;
          }
        }
        if (!found){

          this.selectedGenres.push(movie_genre)
        } else{
          this.selectedGenres = this.selectedGenres.filter(function(item) {
            return item.genreId !== genreID
          })
        }

        console.log(this.selectedGenres)
      },
      // getting current user info
      async getUser(){
        // get current user
        const userResponse = await axios.get('user');

        this.user = userResponse.data.user
      },
      // getting all genres
      async getGenres(){
        // get genres data
        const genresResponse = await axios.get('genres/')
        console.log(genresResponse.data)
        this.genres = genresResponse.data.activeGenres
        this.totalGenres = genresResponse.data.totalGenres
      },
    }
  }



  //defined functions for handling errors and logs
  function log(html) {
    //document.getElementById('log').innerHTML = html;
    console.log(html);
  }

  function  bytesToSize(bytes,decimals) {
    if(bytes === 0) return '0 Bytes';
    let k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
</script>

<style>

  @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
  @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
  @import '../../assets/styles/css/osahan.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';
</style>
