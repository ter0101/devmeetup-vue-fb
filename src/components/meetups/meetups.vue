<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 style="padding:20px" v-for="meetup in meetups" :key="meetup.id">
        <v-card color="cyan darken-2" class="white--text" >
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex md6>
                <div>
                  <div class="headline">{{ meetup.title }}</div>
                  <div>{{ meetup.date | date }}</div>
                  <v-btn :to="'/meetups/' + meetup.id" style="margin:0px" class="mt-2">
                    <v-icon left>arrow_forward</v-icon>
                    VIEW
                  </v-btn>
                </div>
              </v-flex>
              <v-flex md6>
                <v-card-media
                :src="meetup.src"
                height="100%">
                </v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
   </v-layout>
 </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
