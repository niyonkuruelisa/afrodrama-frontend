<template>
  <!--    <h1>Welcome: {{user.lastName}}</h1>-->
  <div id="page-top">
    <Nav />
    <div id="wrapper">

      <SideBar/>
      <div id="content-wrapper">
        <div class="container-fluid pb-0">
          <div class="video-block section-padding">
            <div class="row">
              <div class="col-md-6">
                <div class="single-video-left">
                  <div class="single-video-info-content box mb-3">
                    <h3>{{current_user.first_name +' '+current_user.last_name}} </h3>
                    <h6>Email:</h6>
                    <p>{{current_user.email}}</p>
                    <h6>Telephone:</h6>
                    <p>{{current_user.phone_number}} </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="main-title">
                  <h6>Settings</h6>
                </div>
                <div class="main-title float-center center-section">
                  <router-link :to="{ name: 'UserSettings'}"  class="btn btn-primary pl-4 pt-1 mb-2"><i class="fa fa-edit"></i>Edit Profile</router-link> &nbsp; &nbsp;
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
  import $ from "jquery";
  import store from '@/store'
  export default {
    name: "UserProfile",
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
