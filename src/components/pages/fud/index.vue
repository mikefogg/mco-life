<template src='./fud.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'

export default {
  name: 'FudPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
	components: {
		'navigation': Navigation
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.fud-page {
	text-align: center;
}
</style>
