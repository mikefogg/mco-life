<template src='./registrations.pug' lang='pug'></template>

<script>
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
