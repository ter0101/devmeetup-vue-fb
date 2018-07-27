<template>
<v-container>
  <form @submit.prevent="onCreateMeetup">
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <H1 class="primary--text">Create a new Meetup</H1>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-2">
      <v-flex xs12 md6 offset-sm3>
        <v-text-field
        v-model="title"
        name="title"
        label="Title"
        id="title"
        required>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-text-field
        v-model="location"
        name="location"
        label="Location"
        id="location"
        append-icon="place"
        required>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
        <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onPickFiled">
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <img :src="src" class="img">
      </v-flex>
    </v-layout>
    <v-layout row class="mt-3">
      <v-flex xs12 md6 offset-sm3>
        <v-textarea
        v-model="description"
        name="description"
        label="Description"
        id="descrition"
        box
        required>
        </v-textarea>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px">
        <v-text-field
          slot="activator"
          v-model="date"
          label="Pick up date"
          prepend-icon="event"
          readonly>
        </v-text-field>
        <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
      </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px">
          <v-text-field
            slot="activator"
            v-model="time"
            label="Pickup time"
            prepend-icon="access_time"
            readonly>
          </v-text-field>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            @change="$refs.menu2.save(time)"
          ></v-time-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3 class="mt-3">
        <v-btn class="red white--text" depressed block 
        :disabled="!formIsValid"
        type="submit">Create
        </v-btn>
      </v-flex>
    </v-layout>
  </form>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      time: null,
      title: '',
      src: '',
      location: '',
      description: '',
      menu: false,
      menu2: false,
      img: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
      this.location !== '' &&
      this.src !== '' &&
      this.description !== '' &&
      this.date !== '' &&
      this.time !== null
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const mintes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(mintes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      console.log(date)
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      if (!this.img) {
        return
      }
      const data = {
        title: this.title,
        location: this.location,
        img: this.img,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', data)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onPickFiled (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.src = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.img = files[0]
    }
  }
}
</script>

<style scoped>
.img{
  width: 100%;
  height: auto;
}
</style>
