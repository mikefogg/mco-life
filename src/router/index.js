import Vue from 'vue'
import Router from 'vue-router'
import RegistrationsPage from '@/components/pages/registrations'
import SupplyDemandPage from '@/components/pages/supply-demand'
import FudPage from '@/components/pages/fud'

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
		},
		{
			path: '/supply-and-demand',
			name: 'SupplyDemandPage',
			component: SupplyDemandPage
		},
		{
			path: '/fud',
			name: 'FudPage',
			component: FudPage
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
