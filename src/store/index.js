import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id: '1',
        title: 'Konosuba',
        date: '2018-07-17'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: '2',
        title: 'Konosuba2',
        date: '2018-7-19'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setLoadMeetups (state, payload) {
      state.loadedMeetups = payload
    }
  },
  actions: {
    loadedMeetup ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetup = []
          const odj = data.val()
          for (let key in odj) {
            meetup.push({
              id: key,
              title: odj[key].title,
              description: odj[key].description,
              src: odj[key].src,
              date: odj[key].date,
              location: odj[key].location,
              creatorId: odj[key].creatorId
            })
          }
          commit('setLoadMeetups', meetup)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', true)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.loadUser.id
      }
      // let src
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          console.log(data)
          commit('createMeetup', {...meetup, id: key})
          return key
        })
        .then(key => {
          const filename = payload.img.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups' + key + '.' + ext).put(payload.img)
        })
        // .then(filedata => {
        //   let imagePath = filedata.metadata.fullPath
        //   return firebase.database().ref('meetups').child(imagePath).getDownloadURL()
        // })
        // .then(url => {
        //   src = url
        //   return firebase.database().ref('meetups').child(key).update({src: src})
        // })
        // .then(() => {
        //   commit('createMeetup', {...meetup, src: src, id: key})
        // })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    signUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newsUser = {
              id: user.uid,
              registerMeetups: []
            }
            commit('setUser', newsUser)
          }
        ).catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newsUser = {
              id: user.uid,
              registerMeetups: []
            }
            commit('setUser', newsUser)
          }
        ).catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.uid, registerMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.data > meetupB.data
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    loadUser (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
