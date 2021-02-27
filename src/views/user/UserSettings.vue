<template>
  <!--    <h1>Welcome: {{user.lastName}}</h1>-->
  <div id="page-top">
    <Nav />
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div class="container-fluid upload-details">
          <div class="row">
            <div class="col-lg-12">
              <div class="main-title">
                <h6>Settings</h6>
              </div>
            </div>
          </div>
          <form>
            <div class="row" v-if="processing">
              <div class="col-sm-12">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Saving Changes</div>
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="control-label">First Name <span class="required">*</span></label>
                  <input v-model="current_user.first_name" class="form-control border-form-control" value="" placeholder="Olive"
                         type="text">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="control-label">Last Name <span class="required">*</span></label>
                  <input v-model="current_user.last_name" class="form-control border-form-control" value="" placeholder="Betty"
                         type="text">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="control-label">Phone</label>
                  <input v-model="current_user.phone_number" class="form-control border-form-control" value="" placeholder="245 456 7890"
                         type="tel">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="control-label">Email Address <span class="required">*</span></label>
                  <input v-model="current_user.email" class="form-control border-form-control " value=""
                         placeholder="iamosahan@gmail.com" disabled="" type="email">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 text-right">
                <RouterLink :to="{ name: 'Home'}" class="btn btn-danger border-none"> Cencel </RouterLink>
                <button type="button" v-on:click="updateUserInfo" class="btn btn-success border-none"> Save Changes </button>
              </div>
            </div>
          </form>
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
  import $ from "jquery";
  import store from '@/store'
  export default {
    name: "UserSettings",
    components: {
      Nav,
      SideBar,
      Footer
    },
    data(){
      return{
        current_user: {},
        processing:false,
      }
    },
    async created(){
      // check for movie type
      this.loadSlideShow()
      this.current_user = store.getters['auth/user']
    },

    methods: {
      async updateUserInfo(){
        const user = {
          'user' : this.current_user
        }
        console.log(user)
        this.processing = true
        await axios.patch('user',user).then(res => {
          console.log(res.data)
          this.processing = false
        }).catch(err => {
          this.processing = false
          console.log(err)
        })
      },
      loadSlideShow(){
        setTimeout(function () {
          $("#toggleThis").addClass("toggled")
          $("body").addClass("sidebar-toggled")
          $(".osahan-slider").slick({ centerMode: !0, centerPadding: "200px", slidesToShow: 1, autoplay: true, responsive: [{ breakpoint: 768, settings: { arrows: !1, centerMode: !0, centerPadding: "40px", slidesToShow: 1 } }, { breakpoint: 480, settings: { arrows: !1, centerMode: !0, centerPadding: "40px", slidesToShow: 1 } }] })
        }, 10); // 555ms timing to load jQuery.js + network estimated delay

      },
    },

  }
</script>

<style>

  @import '../../assets/styles/vendor/slick/slick.min.css';
  @import '../../assets/styles/vendor/slick/slick-theme.min.css';
  @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
  @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
  @import '../../assets/styles/css/osahan.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';

</style>
