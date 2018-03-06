// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import $ from 'jquery'
window.$ = $;

import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

//
// Create a VERY simple vuex store
// TODO: Split these into their own variables inside
// /store
//

const store = new Vuex.Store({
	state: {
		apiResponse: null
	},
	mutations: {
		apiResponse (state, response) {
			state.apiResponse = response
		}
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
