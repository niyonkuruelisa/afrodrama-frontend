<template>
    <div class="login-main-body">
        <section class="login-main-wrapper">
            <div class="container-fluid pl-0 pr-0">
                <div class="row no-gutters">
                    <div class="col-md-5 p-5 bg-white full-height">
                        <div class="login-main-left">
                            <div class="text-center mb-5 login-main-left-header pt-4">
                                <img src="../assets/styles/img/favicon.png" class="img-fluid" alt="LOGO">
                                <h5 class="mt-3 mb-3">Welcome Back to Afro<span style="color: red;">Drama</span></h5>
                                <p>access best movie collections.</p>
                            </div>
                            <form @submit.prevent="submit()">

                              <div class="progress" v-if="processing">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Authorizing Account</div>
                              </div>

                              <div v-if="info">
                                <div v-html="message(info_type,info_title,info_message)"></div>
                              </div>


                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="text" v-model="form.email" class="form-control" placeholder="Enter an email address">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" v-model="form.password" class="form-control" placeholder="Password">
                                </div>

                                <div class="" v-if="!processing">
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="submit" value="Sign In" class="btn btn-outline-primary btn-block btn-lg"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="text-center mt-5">
                                <p class="light-gray">Don’t have an account? <a href="/register">Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="login-main-right bg-white p-5 mt-5 mb-5">
                            <div class="owl-carousel owl-carousel-login">
                                <div class="item">
                                    <div class="carousel-login-card text-center">
                                        <img src="../assets/styles/img/login.png" class="img-fluid" alt="LOGO"/>
                                        <h5 class="mt-5 mb-3">Watch videos Offline</h5>
                                        <p class="mb-4">when an unknown printer took a galley of type and scrambled<br> it
                                            to make a type specimen book. It has survived not <br>only five centuries</p>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="carousel-login-card text-center">
                                        <img src="../assets/styles/img/login.png" class="img-fluid" alt="LOGO">
                                        <h5 class="mt-5 mb-3">Download videos effortlessly</h5>
                                        <p class="mb-4">when an unknown printer took a galley of type and scrambled<br> it
                                            to make a type specimen book. It has survived not <br>only five centuries</p>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="carousel-login-card text-center">
                                        <img src="../assets/styles/img/login.png" class="img-fluid" alt="LOGO">
                                        <h5 class="mt-5 mb-3">Create GIFs</h5>
                                        <p class="mb-4">when an unknown printer took a galley of type and scrambled<br> it
                                            to make a type specimen book. It has survived not <br>only five centuries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import 'jquery'
import 'jquery-slim'
import 'jquery-ui'
/* eslint-disable */
import '../assets/styles/js/custom.js'
setTimeout(function () {
     // Login Owl Carousel
    const mainslider = $('.owl-carousel-login');
    if (mainslider.length > 0) {
        mainslider.owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        navigation : true,
        });
    }
}, 555*1.33); // 555ms timing to load jQuery.js + network estimated delay


 
/* eslint-disable */

import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
      return {
        form: {
              password: '',
              email: ''
          },
        //Handling errors
        info: false,
        info_type: '',
        info_title: '',
        info_message: '',

        //process and loading
        processing: false,
      }
  },
  methods: {
      // to access actions from store/auth.js
      ...mapActions({
          signIn: 'auth/signIn'
      }),
      submit() {
          this.info = false
          this.processing =  true
          this.signIn(this.form).then( response =>{

            if (response.error){
                this.info = true
                this.info_type = 'danger'
                this.info_title = 'error:'
                this.info_message = response.error
                // resetting all the dATA
                this.email = ''
                this.password = ''
                this.processing =  false
                return
            }
            this.info = true
            this.info_type = 'success'
            this.info_title = 'Nice!'
            this.info_message = 'successfully logged in'
            // resetting all the dATA
            this.email = ''
            this.password = ''
            if(response.role === 'user'){

                this.$router.replace({
                    name: 'Home'
                })
            }else if (response.role === 'admin') {

                this.$router.replace({
                    name: 'AdminHome'
                })
            }
          }).catch( error => {
            this.processing =  false
            this.info = true
            this.info_type = 'danger'
            this.info_title = 'error:'
            this.info_message = error.message
          })
      },
      message(type,title,message){
        return '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert"><strong>'+title+'</strong> '+message+'</div>'
      }
  }
}
</script>
<style>
@import '../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
@import '../assets/styles/vendor/fontawesome-free/css/all.min.css';
@import '../assets/styles/css/osahan.css';
@import '../assets/styles/vendor/owl-carousel/owl.carousel.css';
@import '../assets/styles/vendor/owl-carousel/owl.theme.css';

</style>