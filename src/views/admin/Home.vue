<template>
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
                    <i class="fas fa-fw fa-users"></i>
                  </div>
                  <div class="mr-5"><b>{{dashboard.totalUsers}}</b> Users</div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="#">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                      <i class="fas fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>

          </div>
          <hr>
          <div class="video-block section-padding">
            <div class="row">

<!--              put something in here-->
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
    name: "Home",
    components: {
      Nav,
      SideBar,
      Footer
    },
    data(){
      return{
        dashboard: [],
      }
    },
    methods: {

    },
    async created(){
      // get dashboard data
      const dashboardResponse = await axios.get('admin/dashboard')
      console.log(dashboardResponse.data)
      this.dashboard = dashboardResponse.data
    },
  }
</script>

<style>

  @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
  @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
  @import '../../assets/styles/css/osahan.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
  @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';
</style>
