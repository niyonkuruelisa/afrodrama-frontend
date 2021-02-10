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
                            <div class="col-md-12">
                                <div class="main-title">

                                    <h6>Results for : {{this.$route.params.query}}</h6>
                                </div>
                            </div>

                            <div v-if="!movie_found" class="container-fluid pt-5 pb-5">
                                <div class="row">
                                    <div class="col-md-8 mx-auto text-center upload-video pt-5 pb-5">
                                        <h1><i class="fas fa-file-upload text-primary"></i></h1>
                                        <h4 class="mt-5">No movies found for: {{this.$route.params.query}}</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-sm-2 col-md-1 mb-1" v-for="(movie,index) in movies" :key="index">
                                <div class="video-card">
                                    <div class="video-card-image">
                                        <router-link :to="'/movies/' + movie.id" class="play-icon"><i class="fas fa-play-circle"></i></router-link>
                                        <div v-for="(cover,index) in movie.movie_covers" :key="index">
                                            <router-link v-if="cover.cover_type === 'portrait'" :to="'/movies/' + movie.id"><img class="img-fluid" :src="cover.url" alt=""></router-link>

                                        </div>
                                        <div class="time">{{movie.year}}</div>
                                    </div>
                                    <div class="video-card-body">
                                        <div class="video-title">
                                            <router-link :to="'/movies/' + movie.id">{{movie.title}}</router-link>
                                        </div>
                                        <div class="video-view">
                                            Category: <span v-for="(genre, index) in movie.genres" :key="index"><span v-if="index > 0">, </span>{{genre.title}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="end" class="container-fluid pt-1 pb-1">
                                <div class="row">
                                    <div class="col-md-8 mx-auto text-center upload-video pt-1 pb-1">
                                        <h4 class="mt-1">End:)</h4>
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
    /* eslint-disable */
    import '../../assets/styles/js/custom.js'
    /* eslint-disable */
    import Nav from './Partials/Nav'
    import SideBar from "./Partials/SideBar";
    import Footer from "./Partials/Footer";
    import axios from 'axios'

    export default {
        name: "SearchMovies",
        components: {
            Nav,
            SideBar,
            Footer
        },
        props:['query'],
        data(){
            return{
                movie_category: "",
                item: '',
                movie_found: true,
                movies:[],
                limit: 12,
                offset:0,
                end: false,
            }
        },
        async beforeRouteUpdate(to,from ,next){

            await this.getAllMovies(to.params.query,this.offset,this.limit)
            next()
        },
        async created(){
            // check for movie type
            await this.getAllMovies(this.$route.params.query,this.offset,this.limit)
            this.scroll(this.movies,this.$route.params.query,this.offset,this.limit);
            this.closeToggle()
        },

        methods: {
            closeToggle(){

                setTimeout(function () {
                    $("body").removeClass("sidebar-toggled")
                    $("#toggleThis").removeClass("toggled")

                    $("#toggleThis").addClass("toggled")
                    $("body").addClass("sidebar-toggled")
                }, 1); // 555ms timing to load jQuery.js + network estimated delay

            },
            async getAllMovies(query,offset,limit){

                const moviesData = {
                    "type": 'searchMovie',
                    "query": query,
                    "offset": offset,
                    "limit": limit,
                }
                const moviesResponse = await axios.get('movies',{params: moviesData});
                console.log(moviesResponse)
                this.movies = moviesResponse.data.movies
                this.movie_found = this.movies.length > 0;
            },
            scroll (movies,query,offset,limit) {

                const moviesData = {
                    "type": 'searchMovie',
                    "query": query,
                    "offset": offset,
                    "limit": limit,
                }

                // this.offset = this.offset+12
                console.log(moviesData)
                window.onscroll = async () => {

                    if(document.documentElement.scrollTop >=  document.documentElement.offsetHeight - window.innerHeight) {

                        const moviesResponse = await axios.get('movies',{params: moviesData});
                        if (moviesResponse.data.movies.length < 1){
                            console.log("No More Videos")
                            this.end = true
                        } else{

                            console.log(moviesResponse.data.movies)
                            movies.push(moviesResponse.data.movies);
                            this.offset = this.offset + 12
                        }

                    }

                };
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
