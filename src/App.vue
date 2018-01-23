<template lang='pug'>
	#app
		.disclaimer
			| This is an
			strong UNOFFICIAL
			| website built to share information around the MCO token. Visit
			a(href='https://mona.co' target='_blank') https://mona.co
			| for Official Information
		router-view
		.footer
			.official-links
				a(href='#')
			.contact
				.label
					| Stay tuned for updates!
				ul.buttons
					li: a.twitter(href='https://twitter.com/mcolife' target='_blank') Follow on Twitter

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
				span Boston.
				| Find me on slack
				strong @mikef
				| or
				strong: a(href='mailto:mcolife@mikefogg.co') shoot me an email
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
