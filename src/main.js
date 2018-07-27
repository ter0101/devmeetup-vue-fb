import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filter/date'
import * as firebase from 'firebase'
import Alert from './components/shared/alert.vue'
import editDialog from './components/meetups/edit/editDetailDialog.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-dialog', editDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBGus0BjRg3j7RWCYIUiRrwIJ96e87p9OE',
      authDomain: 'vuejs-vuetify-firebase.firebaseapp.com',
      databaseURL: 'https://vuejs-vuetify-firebase.firebaseio.com',
      projectId: 'vuejs-vuetify-firebase',
      storageBucket: 'gs://vuejs-vuetify-firebase.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })
    this.$store.dispatch('loadedMeetup')
  }
})
