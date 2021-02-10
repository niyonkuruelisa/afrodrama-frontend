<template>
  <div id="page-top">
    <Nav/>
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div class="container-fluid pb-0">
          <div class="row" >
            <div class="col-lg-12">
              <div class="main-title">
                <h6>Update Movie</h6>
              </div>
              <div class="main-title float-center center-section">
                <button v-on:click="showInfoSection()" class="btn btn-success pl-4 pt-1 mb-2"><i class="fa fa-edit"></i> Manage Movie Info</button> &nbsp; &nbsp;
                <button v-on:click="showCoversSection()" class="btn btn-primary pl-4 pt-1 mb-2"><i class="fa fa-images"></i> Manage Movie Covers</button> &nbsp; &nbsp;
                <button v-on:click="showFilesSection()" class="btn btn-primary pl-4 pt-1 mb-2"><i class="fa fa-file-video"></i> Manage Movie Videos</button>
              </div>
              <hr>
            </div>

            <div  v-if="editFiles" class="col-lg-12">
              <div class="osahan-form">
                <div class="row">
                  <div v-if="movieUploading" class="pl-4">
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
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieResolution">Movie Resolution</label>
                      <select v-model="movieResolution" id="movieResolution" class="custom-select" v-on:change="showSelectMovie()">
                        <option value="">Choose Movie Resolution</option>
                        <option value="720">720p</option>
                        <option value="240">240p</option>
                      </select>
                    </div>
                  </div>
                  <div v-if="showFileInput" class="col-md-8 mx-auto text-center upload-video pt-5 pb-5">
                    <h1><a href="#" onclick="document.getElementById('movieFile').click()"><i class="fas fa-file-upload text-primary"></i></a></h1>
                    <h4 class="mt-5">Select movie file to upload</h4>
                    <!--              <p class="land">or drag and drop video files</p>-->
                    <div class="mt-4">
                      <input type="file"
                             ref="movieFile"
                             style="display: none"
                             v-on:change="uploadMovieFile()"
                             accept="video/mp4,video/x-m4v,video/*"
                             id="movieFile">
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="movieFinished" class="osahan-area text-center mt-3">
                <button v-on:click="showFilesSection()" class="btn btn-outline-primary">Save Changes</button>
              </div>
              <hr>
            </div>
            <div  v-if="editCovers" class="col-lg-12">
              <div class="osahan-form">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="main-title">
                      <h6>Update Movie Covers</h6>
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
                  <div class="col-lg-4">
                    <div  id="coverArtPreview"></div>
                  </div>
                  <div class="col-lg-8 mb-10">
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
                  <div class="col-lg-2">
                    <div id="portraitArtPreview"></div>
                  </div>
                  <div class="col-lg-10 mb-10">
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
                  <div class="col-lg-4">
                    <div id="landscapeArtPreview"></div>
                  </div>
                  <div class="col-lg-8 mb-10">
                    <div class="osahan-title">{{thumbnailLandscape}}</div>
                    <div class="osahan-size">{{thumbnailLandscapeSize}}</div>
                    <div class="osahan-progress">
                      <div v-if="!isLandscapeUploaded" class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0"   aria-valuemin="0" aria-valuemax="100" :style="{ width: `${thumbnailLandscapeProgress}%` }"></div>
                      </div>
                    </div>
                    <div class="osahan-desc">{{thumbnailLandscapeUploadingMessage}}</div>
                  </div>
                </div>
              </div>
              <div class="osahan-area text-center mt-3">
                <button v-on:click="showCoversSection()" class="btn btn-outline-primary">Save Changes</button>
              </div>
              <hr>

            </div>
            <div  v-if="editInfo" class="col-lg-12">
              <div class="osahan-form">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="main-title">
                      <h6>Update Movie Files</h6>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieTitle">Movie Title</label>
                      <input  type="text"
                             placeholder="Rust" id="movieTitle" v-model="movieTitle"
                             class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="movieTitleLong">Movie Title Long</label>
                      <input v-model="movieTitleLong" type="text"
                             placeholder="Rust, return of the reign (2020)" id="movieTitleLong"
                             class="form-control">
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
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label for="movieType">Movie Type</label>
                      <select v-model="movieType" id="movieType" class="custom-select">
                        <option value="0">Choose Movie Type</option>
                        <option value="1">Full Movie</option>
                        <option value="2">Short Movie</option>
                        <option value="3">Tv Show</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-4">
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

                  <div v-for="(genre, idx)  in checkedCategories" class="col-lg-2 col-xs-6 col-4" v-bind:key="idx">
                    <div class="custom-control custom-checkbox">
                      <input @click="check($event)" :checked="genre.checked" type="checkbox" class="custom-control-input" :id="genre.id" :value="genre.id">
                      <label class="custom-control-label" :for="genre.id">{{genre.title}}</label>
                    </div>
                  </div>

                </div>
              </div>
              <div class="osahan-area text-center mt-3">
                <button v-on:click="handleMovieUpdate()" class="btn btn-outline-primary">Save Changes</button>
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

  import Nav from "./Partials/Nav";
  import SideBar from "./Partials/SideBar";
  import Footer from "./Partials/Footer";
  import axios from "axios";
  import moment from 'moment'
  import  $ from 'jquery'
  export default {
    name: "MovieEdit",
    props:['id'],
    components: {
      Nav,
      SideBar,
      Footer
    },
    async created(){

      //get Movies data
      await this.getMovie()
      // get genres
      await this.getGenres()
    },
    data(){
      return{
        movie_id: this.$route.params.id,
        dashboard: [],
        movie:[],
        genres:[],
        selectedGenres: [],
        movieId: 0,
        movieTitle: '',
        movieTitleEnglish: '',
        movieTitleLong: '',
        movieSummary: '',
        movieDescription: '',
        movieType: 0,
        movieYoutubeTrailerCode: '',
        movieYear: '',

        newGenres: [],
        //handle edits
        editInfo: false,
        editFiles: false,
        editCovers: false,

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

        movieResolution: '',
        showFileInput: false,
        movieFinished: true,
      }
    },
    computed: {
      checkedCategories: function () {
        let checkedIds = []
        let results = []
        for (let i = 0; i < this.selectedGenres.length; i++ ) {
          checkedIds.push(this.selectedGenres[i].id)

        }
        for (let j = 0; j < this.genres.length; j++ ) {
          let item = this.genres[j];
          if (checkedIds.includes(this.genres[j].id)) {
            item.checked = true

          } else {
            item.checked = false
          }
          results.push(item)
        }
        //console.log(this.newGenres)
        return results
      }
    },
    methods: {
      //handle uploading a movie
      async uploadMovieFile() {
        //close upload layout and display uploading layout
        this.movieUploading = true
        this.showFileInput = false
        this.movieFinished = false
        let file = this.$refs.movieFile.files[0]
        if (!file) return;

        // load image
        let fileURL = this.movie.movie_covers[1].url
        this.thumbnailLandscapeSize = bytesToSize(this.thumbnailLandscapeUpload.size, 1)
        const intel = setInterval(function () {
          $('#MoviePreview').html('<img class="imgplace" src="' + fileURL + '" />')
          clearInterval(intel);
        }, 1)

        const form = new FormData()
        form.append('movie', file)
        form.append('name', file.name)
        form.append('size', file.size)
        form.append('movie_id', this.movie.id)
        form.append('resolutions', this.movieResolution)

        const response = await axios.post('uploadMovieFile', form, {
          onUploadProgress: (event) => {
            document.getElementById('movieProgress').innerHTML = bytesToSize(event.loaded) + ' of ' + bytesToSize(event.total) + ' Remaining';
            document.getElementById("movieProgressBar").style.width = Math.ceil((event.loaded / event.total) * 100) + "%";
            //console.log(Math.ceil((event.loaded / event.total )*  100))
            if (event.loaded === event.total) {
              document.getElementById("movieProgressBarLoad").style.display = "none";
              document.getElementById("movieUploadingMessage").innerHTML = "Movie is Successfully Uploaded!";

            }
          }
        });
        if (!response.data.success) {
          console.log(response)
        }else{
          this.movieFinished = true
        }
        //movie progress
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
          form.append('movie_id',this.movie.id)

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
          form.append('movie_id',this.movie.id)

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
        if(this.$refs.landscapeArt.files[0] !== undefined){
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
          form.append('movie_id',this.movie.id)

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
      //load images
      loadImages(){
        this.thumbnailCoverUploadingMessage     = ""
        this.thumbnailPortraitUploadingMessage  = ""
        this.thumbnailLandscapeUploadingMessage = ""

        this.isCoverUploaded      =true;
        this.isPortraitUploaded   =true;
        this.isLandscapeUploaded  =true;

        this.thumbnailCoverSize      = "";
        this.thumbnailPortraitSize   = "";
        this.thumbnailLandscapeSize  = "";

        for(let i = 0;i < this.movie.movie_covers.length;i++){

          let cover = this.movie.movie_covers[i]
          const interval  = setInterval(function (){

            $('#'+cover.cover_type+'ArtPreview').html('<img :class="imgplace'+i+' " src="'+cover.url+'" style="width: auto; height: 200px;" />')
            clearInterval(interval)
          },1)

        }
      },
      //show movie
      showSelectMovie(){
        this.showFileInput = this.movieResolution !== '';
      },
      //handle shows
      showInfoSection(){
        this.editInfo = !this.editInfo
        this.editFiles = false
        this.editCovers = false
      },

      showCoversSection(){
        this.editCovers = !this.editCovers
        this.editFiles = false
        this.editInfo = false
        if(this.editCovers){
          this.loadImages()
        }
      },

      showFilesSection(){
        this.editInfo = false
        this.editCovers = false
        this.movieUploading = false;
        this.editFiles = !this.editFiles
      },
      // handling updating movie4
      async handleMovieUpdate(){
        const data  = {
          movie: {
            "imdb_code": this.movie.imdb_code,
            "title": this.movieTitle,
            "title_english": this.movieTitleEnglish,
            "title_long": this.movieTitleLong,
            "runtime": this.movie.runtime,
            "movie_type": this.movieType,
            "year": this.movieYear.substring(0, 4),
            "summary": this.movieSummary,
            "description": this.movieDescription,
            "yt_trailer_code": this.movieYoutubeTrailerCode,
            "status": this.movie.status,
            "movieGenres": this.newGenres
          }
        }
        //console.log(data)
        let responseMovie = []
        if (data.movie.title === ''){
          alert('ERROR: Please Enter Movie Title')}
        else if (data.movie.title_english === 0){
          alert('ERROR: Please Choose Movie English Title')}
        else if (data.movie.summary === 0){
          alert('ERROR: Please Enter Movie Summary')}
        else if (data.movie.description === 0){
          alert('ERROR: Please Movie Description')}
        else if (data.movie.movie_type === 0){
          alert('ERROR: Please Choose Movie type')}
        else if (data.movie.year === ''){
          alert('ERROR: Please Choose Movie Released Year')}
        else if (data.movie.movieGenres.length < 1){
          alert('ERROR: Please Choose At least one movie category/genre')}
        else{
          responseMovie = await axios.put('movies/'+this.movie.id, data);
          if(responseMovie.data.success){
            this.movie = responseMovie.data.movie
            this.$router.go(-1)
          }else{
            //console.log(responseMovie.data)
          }
        }

      },
      //checking check box
      check (e) {
        if (e.target.checked) {

          let newCat = {
            0: e.target.value,
            genre_id: e.target.value,
            movie_id: this.movie_id
          }
          this.selectedGenres.push(newCat)
          this.newGenres.push(newCat)
          console.log(this.newGenres)
        } else {
          for (let i = 0; i < this.selectedGenres.length; i++ ) {
            if (this.selectedGenres[i].id === e.target.value) {
              this.selectedGenres.splice(i, 1)
            }
          }

          for (let i = 0; i < this.newGenres.length; i++ ) {
            if (this.newGenres[i].genre_id === e.target.value) {
              this.newGenres.splice(i, 1)
            }
          }
        }
      },
      //get Movies data function
      async getMovie() {
        //console.log(this.movie_id)
        const movieResponse = await axios.get('movies/'+this.movie_id);
        //get movie info
        this.movie = movieResponse.data.movie
        // assigning info for edit
        this.movieTitle = movieResponse.data.movie.title
        this.movieTitleEnglish = movieResponse.data.movie.title_english
        this.movieTitleLong = movieResponse.data.movie.title_long
        this.movieType = movieResponse.data.movie.movie_type
        this.movieYear = movieResponse.data.movie.year+"-01"
        this.movieSummary = movieResponse.data.movie.summary
        this.movieDescription = movieResponse.data.movie.description
        this.movieYoutubeTrailerCode = movieResponse.data.movie.yt_trailer_code

        // get all movie genres
        this.selectedGenres= movieResponse.data.movie.genres
        for(let i = 0; i < this.selectedGenres.length; i++ ){
          const genre = {
            genre_id: this.selectedGenres[i].id,
            movie_id: this.movie.id
          }
          this.newGenres.push(genre)
        }
        //get movie cover
        //console.log(movieResponse.data.movie)
      },
      // getting all genres
      async getGenres(){
        // get genres data
        const genresResponse = await axios.get('genres/')
        //console.log(genresResponse.data)
        this.genres = genresResponse.data.activeGenres
        this.totalGenres = genresResponse.data.totalGenres
      },

      moment(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
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
