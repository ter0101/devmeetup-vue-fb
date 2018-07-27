<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" 
        :key="item.title" 
        :to="item.link">
          <v-list-tile-action>
             <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>          
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="onLogout" v-if="userIsAuthenticated">
          <v-list-tile-action>
             <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>          
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">  
          meet<span class="blue--text lighten-1">UP</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat 
        v-for="item in menuItems" 
        :key="item.title" 
        :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat
        @click="onLogout"
        v-if="userIsAuthenticated">
          <v-icon left="">exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>


  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign UP', link: '/signup' },
        { icon: 'lock_open', title: 'Sign IN', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'VIEW MEETUP', link: '/meetups' },
          { icon: 'room', title: 'Organize MEETUP', link: '/meetups/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.loadUser !== null && this.$store.getters.loadUser !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
