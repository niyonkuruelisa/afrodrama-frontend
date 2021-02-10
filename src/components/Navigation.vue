<template>
  <div>
    <h1>Ubufasha</h1>
    <ul>

      <template v-if="authenticated">
        <li>
          <router-link :to="{ name: 'Dashboard' }"> Dashboard </router-link>
        </li>

        <li>
          <p>{{this.user.name}}</p>
        </li>
        <li>
          <a href="#"  @click.prevent="logout"> Logout </a>
        </li>
      </template>

      <template v-else>
        <li>
          <router-link :to="{ name: 'Home' }"> Home </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Login' }"> Login </router-link>
        </li>

      </template>

    </ul>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
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
          this.$router.replace({
            name: 'Login'
          })
        }).catch( () => {
          console.log("There was an Error!!")
        })
      }
    }
  }
</script>