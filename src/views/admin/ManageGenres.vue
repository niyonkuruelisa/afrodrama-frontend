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
              <div class="card text-white bg-primary o-hidden h-100 border-none">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fas fa-fw fa-list-ul"></i>
                  </div>
                  <div class="mr-5"><b>{{totalGenres}}</b> Genres</div>
                </div>
              </div>
            </div>

          </div>
          <hr>


          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="main-title mb-2 pb-2">

                  <button class="btn btn-outline-info btn-sm" type="button" data-toggle="modal" data-target="#createGenreModal" v-on:click="clearGenre()"><strong>Create a new genre</strong></button>
                </div>
              </div>
              <div v-for="(genre,index) in genres" class="col-xl-3 col-sm-6 mb-3" :key="index">
                <div class="category-item mt-0 mb-0">
                  <h5>{{genre.title}}</h5>

                  <div v-if="genre.status">
                    <p >Active: <i class="fas fa-check-circle text-success"></i></p>
                    <div class="category-item mt-0 mb-0" >
                      <button class="btn btn-outline-info btn-sm" type="button" v-on:click="setCurrentGenre(genre)" data-toggle="modal" data-target="#editGenreModal"><strong>Edit</strong></button> &nbsp;&nbsp;&nbsp; <button class="btn btn-outline-danger btn-sm" type="button" v-on:click="handleActivation(genre,false)"><strong>Deactivate</strong></button>
                    </div>
                  </div>
                  <div v-else>
                    <p>Active: <i class="fas fa-times-circle text-danger"></i></p>

                    <div class="category-item mt-0 mb-0">
                      <button class="btn btn-outline-info btn-sm" type="button" v-on:click="setCurrentGenre(genre)" data-toggle="modal" data-target="#editGenreModal"><strong>Edit</strong></button> &nbsp;&nbsp;&nbsp; <button class="btn btn-outline-success btn-sm" type="button" v-on:click="handleActivation(genre,true)"><strong>Activate</strong></button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="modal fade" id="createGenreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
              <form @submit.prevent="handleCreateGenre()">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create a new Genre</h5>
                  <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div v-if="info">
                    <div v-html="message(info_type,info_title,info_message)"></div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="e1">Genre Title*</label>
                        <input v-model="genreTitle" type="text"
                               placeholder="Title" id="e1"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="e2">Genre Description</label>
                        <textarea v-model="genreDescription" rows="2" id="e2" name="e2" class="form-control"></textarea>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" type="button" data-dismiss="modal"   ref="myBtn1">Cancel</button>
                  <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div v-if="currentGenre !== undefined" class="modal fade" id="editGenreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2"
             aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
              <form @submit.prevent="handleEditGenre()">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel2">Edit Genre: <strong>{{currentGenre.title}}</strong> </h5>
                  <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div v-if="info">
                    <div v-html="message(info_type,info_title,info_message)"></div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="e4">Genre Title*</label>
                        <input v-model="genreTitle" type="text"
                               placeholder="Title" id="e4"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="e3">Genre Description</label>
                        <textarea v-model="genreDescription" rows="2" id="e3" name="e2" class="form-control"></textarea>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" type="button" data-dismiss="modal"   ref="myBtn">Cancel</button>
                  <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
              </form>
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
    name: "ManageGenres",
    components: {
      Nav,
      SideBar,
      Footer
    },
    async created(){
      // get user info
      await this.getUser()
      // get genres
      await this.getGenres()

    },
    data(){
      return{
        user: [],
        genres: [],
        totalGenres: 0,
        currentGenre:[],

        // handle genre creation
        genreTitle: '',
        genreDescription: '',

        //Handling errors
        info: false,
        info_type: '',
        info_title: '',
        info_message: '',
      }
    },
    methods: {
      async handleCreateGenre(){
        const data = {
          genre: {
            title: this.genreTitle,
            description: this.genreDescription,
          }
        }
        if(data.genre.title.length < 1){

          this.info = true
          this.info_type = 'danger'
          this.info_title = 'Error:'
          this.info_message = 'Enter Genre\'s title'

        }else{
          try{
            const genresResponse = await axios.post('genres',data);
            if(genresResponse.data.success){
              // get genres
              this.info = true
              this.info_type = 'success'
              this.info_title = 'Nice!'
              this.info_message = 'Genre created successfully'

              // clear data
              this.clearGenre()
              //dismiss modal
              this.dismissModel()
              // clear message
              this.clearMessage()
              //get genres again
              await this.getGenres()
            }else{
              console.log(genresResponse.data)
              this.info = true
              this.info_type = 'danger'
              this.info_title = 'Error:'
              this.info_message = genresResponse.data
            }
          }catch (e) {
            console.log(e)
          }

        }

      },
      // set current genre when user selects one of genre to edit
      setCurrentGenre(genre){
        this.currentGenre = genre
        this.genreTitle = genre.title
        this.genreDescription = genre.description
        console.log(genre)
      },
      // handle editing of a chosen genre
      async handleEditGenre(){
        const data = {
          genre: {
            title: this.genreTitle,
            description: this.genreDescription,
            id:this.currentGenre.id
          }
        }
        if(data.genre.title.length < 1){

          this.info = true
          this.info_type = 'danger'
          this.info_title = 'Error:'
          this.info_message = 'Enter Genre\'s title'

        }else{
          const genresResponse = await axios.put('genres/'+this.currentGenre.id,data);
          if(genresResponse.data.success){

            // get genres
            this.info = true
            this.info_type = 'success'
            this.info_title = 'Nice!'
            this.info_message = 'Genre Updated successfully'

            // clear data
            this.clearGenre()

            //dismiss modal
            this.dismissModel()

            // clear message
            this.clearMessage()

            //get genres again
            await this.getGenres()
          }else{
            console.log(genresResponse.data)
            this.info = true
            this.info_type = 'danger'
            this.info_title = 'Error:'
            this.info_message = genresResponse.data
          }
        }
      },
      //activate or de-activate genre
      async handleActivation(genre,status){

        console.log("Action will be here ==>",genre)
        const dataToSend = {
          title : genre.title,
          description : genre.description,
          id : genre.id,
          status : status,
        }
        //sending request to server
        await axios.post('genre/activate',dataToSend).then( async response => {
          console.log(response)
          // clear data
          this.clearGenre()

          this.clearMessage()
          //get genres again
          await this.getGenres()
        }).catch(error => {
          console.log(error)
        })
      },
      // trigger dismiss modal click after creating genre
      dismissModel() {

        const elem1 = this.$refs.myBtn1
        elem1.click()
        const elem = this.$refs.myBtn
        elem.click()
      },
      // clear genre info whenever we are finishing/going to deal with it.
      clearGenre(){
        // clear data
        this.genreTitle  = ''
        this.genreDescription  = ''
        this.currentGenre = []
      },
      clearMessage(){
        this.info = false
        this.info_type = ''
        this.info_title = ''
        this.info_message = ''
      },
      // it's like flash message success,denger,info.
      message(type,title,message){
        return '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert"><strong>'+title+'</strong> '+message+'</div>'
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
        console.log(axios.defaults.headers.common['Authorization'])
        const genresResponse = await axios.get('genres/')
        console.log(genresResponse.data)
        this.genres = genresResponse.data.genres
        this.totalGenres = genresResponse.data.totalGenres
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
