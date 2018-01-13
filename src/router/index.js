import Vue from 'vue'
import Router from 'vue-router'
import RegistrationsPage from '@/components/registrations-page'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'RegistrationsPage',
			component: RegistrationsPage
		}
	]
})
