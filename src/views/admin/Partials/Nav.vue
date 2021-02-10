<template>
  <nav class="navbar navbar-expand navbar-light bg-white static-top osahan-nav sticky-top">
    &nbsp;&nbsp;
    <button class="btn btn-link btn-sm text-secondary order-1 order-sm-0" id="sidebarToggle">
      <i class="fas fa-bars"></i>
    </button> &nbsp;&nbsp;
    <router-link class="navbar-brand mr-1 text-white" :to="'/admin'">Afro<span style="color: red;">Drama</span></router-link>

    <div class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-5 my-2 my-md-0 osahan-navbar-search">

    </div>

    <ul class="navbar-nav ml-auto ml-md-0 osahan-right-navbar">

      <li class="nav-item dropdown no-arrow osahan-right-navbar-user">
        <a class="nav-link dropdown-toggle user-dropdown-link" href="#" id="userDropdown" role="button"
           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img alt="Avatar" src="../../../assets/styles/img/user.png">
          {{user.first_name}} {{user.last_name}}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
          <a class="dropdown-item" href="account.html"><i class="fas fa-fw fa-user-circle"></i> &nbsp; My
            Account</a>
          <a class="dropdown-item" href="settings.html"><i class="fas fa-fw fa-cog"></i> &nbsp; Settings</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click.prevent="logout"><i
            class="fas fa-fw fa-sign-out-alt"></i> &nbsp; Logout</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

    export default {
      name: "Nav",
      computed:{
        ...mapGetters({

          authenticated: 'auth/authenticated',
          user: 'auth/user'

        }),

      },
      methods: {
        ...mapActions({
          signOutAction: 'auth/signOut'

        }),
        logout(){
          this.signOutAction().then( () =>{
            window.location = '/'
          }).catch( () => {
            console.log("There was an Error!!")
          })
        }
      }
    }
</script>

<style scoped>

</style>
