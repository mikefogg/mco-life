import Vue from 'vue'
import Router from 'vue-router'
import RegistrationsPage from '@/components/pages/registrations'
import SupplyDemandPage from '@/components/pages/supply-demand'
import FudPage from '@/components/pages/fud'

Vue.use(Router)

export default new Router({
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
