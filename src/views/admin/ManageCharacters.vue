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
                    <i class="fas fa-fw fa-users"></i>
                  </div>
                  <div class="mr-5"><b>{{totalCharacters}}</b> Characters</div>
                </div>
              </div>
            </div>

          </div>
          <hr>


          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-12">
                <div class="main-title mb-2 pb-2">

                  <button class="btn btn-outline-info btn-sm" type="button" data-toggle="modal" data-target="#createCharacterModal" v-on:click="clearCharacter()"><strong>Create a new character</strong></button>
                </div>
              </div>
              <div v-for="(character,index) in characters" class="col-xl-3 col-sm-6 mb-3" :key="index">
                <div class="channels-card">
                  <div class="channels-card-image">
                    <a v-if="character.avatar === ''" href="#"><img class="img-fluid" src="../../assets/styles/img/avatar.jpg" alt=""></a>

                  </div>
                  <div class="channels-card-body">
                    <div class="channels-title">
                      <a href="#">{{character.names}}</a>
                      <p v-if="character.soft_delete === 0">Active: <i class="fas fa-check-circle text-success"></i></p>
                      <p v-else>Active: <i class="fas fa-times-circle text-danger"></i></p>
                    </div>
                    <div v-if="character.soft_delete === 0">

                      <div class="category-item mt-0 mb-0" >
                        <button class="btn btn-outline-success btn-sm" type="button" v-on:click="setCurrentCharacter(character)" data-toggle="modal" data-target="#editCharacterModal"><strong>Edit</strong></button> &nbsp;&nbsp;&nbsp; <button class="btn btn-outline-danger btn-sm" type="button"><strong>Deactivate</strong></button>
                      </div>
                    </div>
                    <div v-else>


                      <div class="category-item mt-0 mb-0">
                        <button class="btn btn-outline-success btn-sm" type="button"><strong>Activate</strong></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="modal fade" id="createCharacterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
              <form @submit.prevent="handleCreateCharacter()">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create a new Character</h5>
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
                        <label for="characterNames">Character Names *</label>
                        <input v-model="characterNames" type="text"
                               placeholder="Names" id="characterNames"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="characterEmail">Character Email </label>
                        <input v-model="characterEmail" type="text"
                               placeholder="Email" id="characterEmail"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="characterPhone">Character Phone </label>
                        <input v-model="characterPhone" type="text"
                               placeholder="Phone" id="characterPhone"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="characterAge">Character Age </label>
                        <input v-model="characterAge" type="text"
                               placeholder="Age" id="characterAge"
                               class="form-control">
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
        <div v-if="currentCharacter !== undefined" class="modal fade" id="editCharacterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2"
             aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
              <form @submit.prevent="handleEditCharacter()">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel2">Edit Genre: <strong>{{currentCharacter.title}}</strong> </h5>
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
                        <label for="characterNamesEdit">Character Names *</label>
                        <input v-model="characterNames" type="text"
                               placeholder="Names" id="characterNamesEdit"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="characterEmailEdit">Character Email </label>
                        <input v-model="characterEmail" type="text"
                               placeholder="Email" id="characterEmailEdit"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="characterPhoneEdit">Character Phone </label>
                        <input v-model="characterPhone" type="text"
                               placeholder="Phone" id="characterPhoneEdit"
                               class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="characterAgeEdit">Character Age</label>
                        <input v-model="characterAge" type="text"
                               placeholder="Age" id="characterAgeEdit"
                               class="form-control">
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
    name: "ManageCharacters",
    components: {
      Nav,
      SideBar,
      Footer
    },
    async created(){
      // get user info
      await this.getUser()
      // get genres
      await this.getCharacters()

    },
    data(){
      return{
        user: [],
        characters: [],
        totalCharacters: 0,
        currentCharacter:[],

        // handle genre creation
        characterPhone: '',
        characterNames: '',
        characterAge: '',
        characterEmail: '',

        //Handling errors
        info: false,
        info_type: '',
        info_title: '',
        info_message: '',
      }
    },
    methods: {
      async handleCreateCharacter(){
        const data = {
          character: {
            names: this.characterNames,
            phone: this.characterPhone,
            email:this.characterEmail,
            age:this.characterAge,
          }
        }
        if(data.character.names.length < 1){

          this.info = true
          this.info_type = 'danger'
          this.info_title = 'Error:'
          this.info_message = 'Enter Character Names'

        }else{
          const charactersResponse = await axios.post('characters',data);
          if(charactersResponse.data.success){
            // get getCharacters
            this.info = true
            this.info_type = 'success'
            this.info_title = 'Nice!'
            this.info_message = 'Character created successfully'

            // clear data
            this.clearCharacter()
            //dismiss modal
            this.dismissModel()
            // clear message
            this.clearMessage()
            //get genres again
            await this.getCharacters()
          }else{
            console.log(charactersResponse.data)
            this.info = true
            this.info_type = 'danger'
            this.info_title = 'Error:'
            this.info_message = charactersResponse.data
          }
        }

      },
      // set current genre when user selects one of genre to edit
      setCurrentCharacter(character){

        this.characterNames   = character.names
        this.characterEmail   = character.email
        this.characterPhone   = character.phone
        this.characterAge     = character.age
        this.currentCharacter = character

        console.log(character)
      },
      // handle editing of a chosen character
      async handleEditCharacter(){
        const data = {
          character: {
            names: this.characterNames,
            phone: this.characterPhone,
            email:this.characterEmail,
            age:this.characterAge,
            id:this.currentCharacter.id
          }
        }
        if(data.character.names.length < 1){

          this.info = true
          this.info_type = 'danger'
          this.info_title = 'Error:'
          this.info_message = 'Enter Character Names'

        }else{
          const charactersResponse = await axios.put('characters/'+this.currentCharacter.id,data);
          if(charactersResponse.data.success){

            // get characters
            this.info = true
            this.info_type = 'success'
            this.info_title = 'Nice!'
            this.info_message = 'Character Updated successfully'

            // clear data
            this.clearCharacter()

            //dismiss modal
            this.dismissModel()

            // clear message
            this.clearMessage()

            //get characters again
            await this.getCharacters()
          }else{
            console.log(charactersResponse.data)
            this.info = true
            this.info_type = 'danger'
            this.info_title = 'Error:'
            this.info_message = charactersResponse.data
          }
        }
      },
      // trigger dismiss modal click after creating Character
      dismissModel() {

        const elem1 = this.$refs.myBtn1
        elem1.click()
        const elem = this.$refs.myBtn
        elem.click()
      },
      // clear character info whenever we are finishing/going to deal with it.
      clearCharacter(){
        // clear data
        this.characterNames  = ''
        this.characterEmail  = ''
        this.characterPhone  = ''
        this.characterAge  = ''
        this.currentCharacter = []
      },
      clearMessage(){
        this.info = false
        this.info_type = ''
        this.info_title = ''
        this.info_message = ''
      },
      // it's like flash message success,denger,info,
      message(type,title,message){
        return '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert"><strong>'+title+'</strong> '+message+'</div>'
      },
      // getting current user info
      async getUser(){
        // get current user
        const userResponse = await axios.get('user');

        this.user = userResponse.data.user
      },
      // getting all characters
      async getCharacters(){
        // get characters data
        const charactersResponse = await axios.get('characters')
        console.log(charactersResponse.data.characters.length)
        if(charactersResponse.data.success){
          this.characters = charactersResponse.data.characters
          this.totalCharacters = charactersResponse.data.characters.length
        }
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
