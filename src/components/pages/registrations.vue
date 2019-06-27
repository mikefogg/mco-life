<template lang='pug'>
.registrations-page
	.section.hero
		navigation

		.header-text-container.bold.split
			.left-area
				h1 An unofficial website built & maintained by #[i (and for)] the Crypto.com community
				h2 If you’re looking for the official Crypto.com website, please visit #[a(href='https://crypto.com' target='_blank') crypto.com]
			.right-area

				.block
					.loading-indicator(v-if='!loaded')
						div.spinner-white
							div
							div
							div
					transition(name='fade')
						.slow-loader(v-if='loaded')
							p.block-title #[strong Total Card Reservations]
							p.reserved-count #[strong {{formatNumeral(reservations.total)}}]
							p.updated-at Updated {{updatedAt}}
</template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
import Flipclock from '@/components/elements/flipclock'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import $ from 'jquery'

export default {
	name: 'RegistrationsPage',

	data () {
		return {
			loaded: false,
			cardChart: null,
			price: {
				availableSupply: null,
				totalSupply: null,
				priceBtc: null,
				priceUsd: null,
				rank: null,
				timestamp: null,
			},
			reservations: {
				today: null,
				total: null,
				timestamp: null
			},
			daily: null
		}
	},

	computed: {
		apiResponse: function() {
			return this.$store.state.apiResponse
		},

		updatedAt: function() {
			return this.reservations.timestamp ? moment(this.reservations.timestamp).calendar() : null
		}
	},

	components: {
		'navigation': Navigation,
		Flipclock
	},

	mounted() {
		// Load the data we need
		this.loadData()
	},

	methods: {
		// Go get the data from our api (or use the existing one)
		loadData: function() {
			if (this.apiResponse) {
				// We have it already! Use that
				this.handleApiResponse(this.apiResponse)
			} else {
				// We need it, so now let's store and use the json response
				$.get('https://mco-life-api.herokuapp.com/status').then(response => {
					this.$store.commit('apiResponse', response)
					this.handleApiResponse(this.apiResponse)
				}).catch(error => {
					console.log('error:', error)
				})
			}
		},

		// Actually handle the api response and set it
		handleApiResponse: function(response) {
			// Store the prices
			this.price.availableSupply = response.price.available_supply
			this.price.totalSupply = response.price.available_supply
			this.price.priceBtc = response.price.price_btc
			this.price.priceUsd = response.price.price_usd
			this.price.rank = response.price.rank
			this.price.timestamp = response.price.timestamp

			this.reservations.timestamp = response.reservations.timestamp
			this.reservations.today = response.reservations.today
			this.reservations.total = response.reservations.total

			// Set the daily amount
			this.daily = response.daily

			// Tell everything we're loaded
			this.loaded = true
		},

		formatNumeral: (number) => {
			return numeral(number).format('0,0')
		},
		formatPrice: (number) => {
			return numeral(number).format('$0,0.00')
		},
		formatPriceSmall: (number) => {
			return numeral(number).format('$0,0')
		},
		formatPercent: (number) => {
			return numeral(number).format('0,0.00%')
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.registrations-page {
	text-align: center;
}

.section.hero {
	height: auto;

	.header-text-container {
		display: block;
	}
}

.block-title {
	color: #fff;
	font: $font-weight-base 18px/26px $font-family-base;
}

.reserved-count {
	color: #fff;
	font: $font-weight-bold 92px/100px $font-family-base;
}

.updated-at {
	color: rgba(#fff, 0.6);
	font: $font-weight-base 14px/26px $font-family-base;
}

//
// MOBILE RESPONSIVE
//

@media only screen and (max-width: 1025px) {
	.block-title {
		color: #fff;
		font: $font-weight-base 16px/28px $font-family-base;
	}

	.reserved-count {
		color: #fff;
		font: $font-weight-bold 42px/54px $font-family-base;
	}

	.updated-at {
		color: rgba(#fff, 0.6);
		font: $font-weight-base 12px/24px $font-family-base;
	}
}
</style>
