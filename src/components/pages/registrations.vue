<template lang='pug'>
.registrations-page
	.section.hero
		navigation

		.header-text-container.bold.split
			.left-area
				h1 An unofficial website built & maintained by #[i (and for)] the Crypto.com community
				//- h2 If you’re looking for the official Crypto.com website, please visit #[a(href='https://crypto.com' target='_blank') crypto.com]
				h2(v-if='loaded') There are currently #[strong {{formatNumeral(reservations.total)}}] card reservations!
				h3(v-if='loaded') Last Updated {{updatedAt}}

			.loading-indicator(v-if='!loaded')
				div.spinner-white
					div
					div
					div
			transition(name='fade')
				.right-area(v-if='loaded')
					.chart-label Daily New Card Reservations
					.custom-chart
						.row(v-for='result in dailyResults')
							.bar(:style="{ 'height': `${result.percent}%`,  'top': `${result.margin}%`, 'opacity': result.opacity }")
								.count {{result.count}} #[span.date {{result.timestamp}}]
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
		},

		dailyResults: function() {
			const daily = _.take(_.reverse(this.daily), 14)
			if (_.isEmpty(daily)) { return }

			const max = _.max(daily.map(val => val.reservations))
			const count = _.size(daily)

			return _.map(_.reverse(daily), (val, index) => {
				const top = ((val.reservations / max) * 100)

				return {
					count: val.reservations,
					percent: top,
					margin: 100 - top,
					opacity: 0.1 + (index / count),
					timestamp: moment(val.date).format('MM/DD')
				}
			})
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

/* Grid */

.right-area {
	position: relative;
	display: flex;
	flex-direction: column;
	padding-top: 20px;
}

.chart-label {
	position: absolute;
	top: -8px;
	width: 200px;
	left: 50%;
	margin-left: -100px;
	height: 30px;
	border-radius: 4px 4px 0 0;
	font: $font-weight-base 14px/32px $font-family-base;
	background: $brand-blue;
	color: rgba(#fff, 0.5);
	border: 2px solid rgba(#fff, 0.5);
	border-bottom: 0;
	z-index: 2;
}

.custom-chart {
	position: relative;
	background: $brand-blue;
	flex: 1;
	display: flex;
	flex-direction: row;
	padding-top: 40px;
	border-top: 2px solid rgba(#fff, 0.5);

	.row {
		position: relative;
		flex: 1;

		&:not(:first-of-type) {
			margin-left: 20px;
		}

		.bar {
			width: 100%;
			position: absolute;
			background: #fff;
			opacity: 0.65;

			&:hover {
				opacity: 1;
			}

			.count {
				color: $brand-blue;
				padding-top: 10px;
				font-weight: bold;
				font: $font-weight-bold 14px/16px $font-family-base;

				span.date {
					display: block;
					font-size: 10px;
					font-weight: $font-weight-base;
				}
			}
		}
	}
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

	.custom-chart .row {
		&:nth-child(11) {
			margin-left: 0;
		}

		&:nth-child(-n+10) {
			display: none;
		}
	}
}
</style>
