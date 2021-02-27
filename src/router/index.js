
import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from '@/views/Signin'
import SignUp from '@/views/SignUp'
//user
import Home from '@/views/user/Home'
import UserMovieDetails from '@/views/user/MovieDetails'
import UserBrowseMovies from '@/views/user/BrowseMovies'
import SearchMovies from '@/views/user/SearchMovies'
import UserSettings from '@/views/user/UserSettings'
//admin
import AdminHome from '@/views/admin/Home'
import AdminUpload from '@/views/admin/Upload'
import MoviesManagement from '@/views/admin/Movies'
import MovieDetails from '@/views/admin/MovieDetails'
import MovieEdit from '@/views/admin/MovieEdit'
import ManageGenres from '@/views/admin/ManageGenres'
import ManageCharacters from '@/views/admin/ManageCharacters'
import ManagePackages from '@/views/admin/ManagePackages'
import SystemSettings from '@/views/admin/SystemSettings'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: SignIn,
    beforeEnter: (to,from,next) => {

      if(store.getters['auth/authenticated']) {
        if (store.getters['auth/user'].role === "admin") {
          return next({name: 'AdminHome'})
        } else if (store.getters['auth/user'].role === "user") {
          return next({name: 'Home'})
        } else {
          return next({name: 'Login'})
        }
      }
      next()
    }
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  //------------------------------------ User Routes ----------------------------------->

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/movies/:id',
    name: 'UserMovieDetails',
    component: UserMovieDetails,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/movies/:type/all',
    name: 'BrowseMovies',
    component: UserBrowseMovies,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/movies/search/:query',
    name: 'SearchMovies',
    component: SearchMovies,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'UserSettings',
    component: UserSettings,
    meta: {
      requiresAuth: true
    }
  },
    //------------------------------------ Admin Routes ----------------------------------->
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    }
  },

  {
    path: '/admin/upload',
    name: 'AdminUpload',
    component: AdminUpload,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/movies',
    name: 'MoviesManagement',
    component: MoviesManagement,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/movies/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/movies/:id/edit',
    name: 'MovieEdit',
    component: MovieEdit,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/manageGenres',
    name: 'ManageGenres',
    component: ManageGenres,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/manageCharacters',
    name: 'ManageCharacters',
    component: ManageCharacters,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/packages',
    name: 'ManagePackages',
    component: ManagePackages,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
  {
    path: '/admin/settings',
    name: 'SystemSettings',
    component: SystemSettings,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({name: 'Login'})
      }
      next()
    },
  },
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters['auth/authenticated']){
      return next({name: 'Login'})
    }else{
      next();
    }
  } else {
      next();
  }
});

export default router
