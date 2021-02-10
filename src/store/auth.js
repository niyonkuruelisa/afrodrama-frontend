/* eslint-disable */
import axios from "axios";

export default {
    // it's important to namespace
    namespaced:  true,
    state: {
        token: null,
        user: null
    },
    getters: {
      authenticated(state) {
          return state.token && state.user
      },
        user(state) {
            return state.user ? state.user : {}
        }
    },
    mutations: {
        SET_TOKEN (state,token){
            state.token = token
        },
        SET_USER (state,user){
            state.user = user
        }
    },
    actions: {
        async signIn({ dispatch }, credentials){
            //send request to server
            let response  = await axios.post('login',credentials)

            //check if there is any error or not
            if(response.data.error === undefined){
                return dispatch('attempt',response.data)
            }else{
                //console.log(response.data.error.message)
                return {error : response.data.error.message}
            }
        },
        signOut({ commit }){

            commit('SET_TOKEN',null)
            commit('SET_USER',null)
            return true
        },
        async attempt({ commit },data){

            commit('SET_TOKEN',data.token)
            commit('SET_USER',data.user)
            return {role : data.user.role}
        },

        async checkAuth({ commit, state },token){
            if(token){
                commit('SET_TOKEN',token)
            }
            if(!state.token){
                return
            }

            try{
                let response  = await axios.get('checkAuth');

                commit('SET_USER',response.data.user)
                return response.data.user
            }catch (e) {
                commit('SET_TOKEN',null)
                commit('SET_TOKEN',null)
            }

        }
    }
}
