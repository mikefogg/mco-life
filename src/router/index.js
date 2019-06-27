import Vue from 'vue'
import Router from 'vue-router'
import RegistrationsPage from '@/components/pages/registrations'

import VueAnalytics from 'vue-analytics'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'RegistrationsPage',
			component: RegistrationsPage
		}
	]
})

// Add GA
if (process.env.NODE_ENV === 'production') {
	Vue.use(VueAnalytics, {
		id: 'UA-112492567-1',
		router
	})
}

export default router
