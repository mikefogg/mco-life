<template lang='pug'>
	#app
		.disclaimer
			| This is an
			strong UNOFFICIAL
			| website built to share information around the MCO token. Visit
			a(href='https://crypto.com' target='_blank') crypto.com
			| for Official Information.
		router-view
		.footer
			.donations
				.label
					| As always, donations are always appreciated to help keep the servers running
					em #willworkformco
				ul.methods
					li
						span BTC:
						| 18HXh3Z6v284cy6F1PA6mPtFQig39zrNWq
					li
						span ETH/MCO:
						| 0x2415f94dF452C91BbfF510aEEc7eF89640b1cB63
			.built-by
				| Built with
				span 100% Pure Believe
				| from
				span Austin, TX.
				| Find me on the Crypto.com Discord
				strong @mikef
</template>

<script>
export default {
  name: 'app',
	metaInfo: {
		title: 'mco.life | MCO Token Information',
		link: [
    	{ rel: 'favicon', href: './assets/images/favicon-32x32.png' }
		]
  }
}
</script>

<style lang='scss'>
// Import common styles
@import './assets/styles/project';
</style>
