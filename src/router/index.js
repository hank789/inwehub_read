import Vue from 'vue'
import Router from 'vue-router'
import Topic from './topic'
import News from './news'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/news',
      name: 'News',
      component: News
    }
  ]
})
