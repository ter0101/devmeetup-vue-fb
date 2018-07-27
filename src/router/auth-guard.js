import { store } from '../store'

export default (toolbar, from, next) => {
  if (store.getters.loadUser) {
    next()
  } else {
    next('/signin')
  }
}
