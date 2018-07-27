import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Meetups from '@/components/meetups/meetups'
import CreateMeetup from '@/components/meetups/createMeetup'
import Profile from '@/components/user/profile'
import SignUp from '@/components/user/signUp'
import SignIn from '@/components/user/signIn'

import MeetUp from '@/components/meetups/meetUp'
import Auth from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'MeetUps',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: Auth
    },
    {
      path: '/meetups/:id',
      name: 'MeetUp',
      props: true,
      component: MeetUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: Auth
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
