<template src='./registrations.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import RecentData from '@/components/data/recent'
// Helpers
import numeral from 'numeral'

export default {
  name: 'RegistrationsPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
	computed: {
		recentData: () => {
			return RecentData
		}
	},
	components: {
		'navigation': Navigation
	},
	methods: {
		formatNumeral: (number) => {
			return numeral(number).format('0,0')
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.registrations-page {
	text-align: center;
}
</style>
