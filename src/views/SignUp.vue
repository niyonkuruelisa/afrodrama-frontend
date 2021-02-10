<template>
    <div class="login-main-body">
        <section class="login-main-wrapper">
            <div class="container-fluid pl-0 pr-0">
                <div class="row no-gutters">
                    <div class="col-md-5  pb-5 pt-2 pl-2  pr-2 bg-white full-height">
                        <div class="login-main-left">
                            <div class="text-center mb-2 login-main-left-header pt-0">
                                <img src="../assets/styles/img/favicon.png" class="img-fluid" alt="LOGO">
                                <h5 class="mt-3 mb-3">Register to Afro<span style="color: red;">Drama</span></h5>
                                <p>create an account today and access best movie collections.</p>
                            </div>
                            <form @submit.prevent="handleRegistration">


                                <div class="form-group">
                                    <label>First Name</label>
                                    <input v-model="firstName" type="text" class="form-control" placeholder="Enter first name">
                                </div>
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input v-model="lastName" type="text" class="form-control" placeholder="Enter last name">
                                </div>
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input v-model="email" type="text" class="form-control" placeholder="Enter email address">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input v-model="password" type="password" class="form-control" placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input v-model="passwordConfirmation" type="Password" class="form-control" placeholder="Confirm Password">
                                </div>
                                <div class="progress" v-if="processing">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Creating Account</div>
                                </div>
                                <div v-if="info">
                                    <div v-html="message(info_type,info_title,info_message)"></div>
                                </div>
                                <div class="" v-if="!processing">
                                    <button type="submit" class="btn btn-outline-primary btn-block btn-lg">Sign Up</button>
                                </div>
                            </form>
                            <div class="text-center mt-2">
                                <p class="light-gray">Already have an Account? <a href="/">Sign In</a></p>
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
    /* eslint-disable */
    import '../assets/styles/js/custom.js'
    /* eslint-disable */
    import axios from 'axios'
    export default {
        name: 'SignUp',

        data(){

            return {

                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirmation: '',

                //Handling errors
                info: false,
                info_type: '',
                info_title: '',
                info_message: '',

                //process and loading
                processing: false,
            }

        },

        methods:{
            handleRegistration(){
                const data =  {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    passwordConfirmation: this.passwordConfirmation,
                }
                this.info = true
                if(data.firstName === '' || data.firstName.length < 2){

                    this.info = true
                    this.info_type = 'danger'
                    this.info_title = 'Sorry:'
                    this.info_message = 'First name can\'t be less than 2 characters'

                }else if(data.lastName === '' || data.lastName.length < 2){

                    this.info = true
                    this.info_type = 'danger'
                    this.info_title = 'Sorry:'
                    this.info_message = 'Last name can\'t be less than 2 characters'
                }else if(data.email === '' || data.email.length < 4){

                    this.info = true
                    this.info_type = 'danger'
                    this.info_title = 'Sorry:'
                    this.info_message = 'Enter valid email address'
                }else if(data.password === '' || data.password.length < 8){
                    this.info = true
                    this.info_type = 'danger'
                    this.info_title = 'Sorry:'
                    this.info_message = 'Password must contain 8 or more characters'
                    this.password = ''
                }else if(data.passwordConfirmation !== data.password){
                    this.info = true
                    this.info_type = 'danger'
                    this.info_title = 'Sorry:'
                    this.info_message = 'Password did not match'
                }else{
                    this.info = false
                    this.processing = true

                    axios.post('register',data)
                        .then( res => {

                            if(res.data.error != null){

                                if(res.data.error.email != null){
                                    this.info = true
                                    this.info_type = 'danger'
                                    this.info_title = 'Sorry:'
                                    this.info_message = "Email " +res.data.error.email
                                }
                            }else if(res.data.success != null){
                                console.log(res.data)
                                this.info = true
                                this.info_type = 'success'
                                this.info_title = 'Nice!'
                                this.info_message = res.data.message
                                // resetting all the dATA
                                this.firstName = ''
                                this.lastName = ''
                                this.email = ''
                                this.password = ''
                                this.passwordConfirmation = ''
                                this.$router.go(-1)
                            }
                            this.processing = false

                        }).catch( error =>{

                            console.log(error)
                            this.processing = false

                        }
                    )
                }

            },

            message(type,title,message){
                return '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert"><strong>'+title+'</strong> '+message+'</div>'
            }
        }
    }
</script>
<style >

    @import '../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
    @import '../assets/styles/vendor/fontawesome-free/css/all.min.css';
    @import '../assets/styles/css/osahan.css';
    @import '../assets/styles/vendor/owl-carousel/owl.carousel.css';
    @import '../assets/styles/vendor/owl-carousel/owl.theme.css';
</style>
