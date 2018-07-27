<template>
 <v-container>
  <v-layout row wrap>
   <v-flex xs12>
    <h1>{{ meetups.title }}</h1>
    <template v-if="true">
      <v-spacer></v-spacer>
      <app-edit-dialog></app-edit-dialog>
    </template>
    <hr>
    <section>
     <div class="row">
      <v-card>
       <!-- <img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" class="img"> -->
       <v-card-media 
       :src="meetups.src" 
       height="400px">
       </v-card-media> 
       <v-card-text>
        <div class="info--text">{{ meetups.date | date }} - {{ meetups.location }}</div>
        <div>{{ meetups.description }}</div>
       </v-card-text> 
       <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="red white--text">Register</v-btn>
       </v-card-actions>                  
      </v-card>
     </div>
    </section>
   </v-flex>          
  </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>



<style scoped>
.img {
  width: 100%;
  height: auto;
}
section {
  padding: 40px 0;
}
.row {
  margin: 0 auto;
  max-width: 90%;
}
</style>
