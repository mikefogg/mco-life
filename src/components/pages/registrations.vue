<template lang='pug'>
.registrations-page
	.section.hero
		navigation

		.header-text-container.bold.split
			.left-area
				h1 An unofficial website built & maintained by #[i (and for)] the Monaco community
				h2 If you’re looking for the official Monaco website, please visit #[a(href='https://mona.co' target='_blank') https://mona.co]
			.right-area
				.block
					p.block-title #[strong Countdown to Money2020]
					Flipclock

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

	.section.chart
		.inner-content
			h2 Registrations Per Day

			.loading-indicator(v-if='!loaded')
				div.spinner-ruby
					div
					div
					div

			transition(name='fade')
				.slow-loader(v-if='loaded')

					.chart-container
						canvas#chart(width="800" height="600")
</template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
import Flipclock from '@/components/elements/flipclock'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import Chart from 'chart.js'
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

		chartData: function() {
			// Get the datasets
			const reservationData = _.map(this.daily, 'reservations')
			const reservationLabels = _.map(this.daily, (day) => moment(day.date).format('MMM Do, YYYY'))
			const priceData = _.map(this.daily, (day) => day.price_usd.toFixed(2))
			const priceLabels = _.map(this.daily, (day) => moment(day.date).format('MMMM Do, YYYY'))

			return {
				type: 'line',
				data: {
					labels: reservationLabels,
					datasets: [{
						label: 'Daily Reservations',
						yAxisID: 'y-axis-0',
						data: reservationData,
						// Point
						pointBorderColor: 'rgba(37, 105, 149, 1.0)',
						pointBackgroundColor: 'rgba(37, 105, 149, 1.0)',
						pointHoverBackgroundColor: 'rgba(37, 105, 149, 1.0)',
						pointHoverBorderColor: 'rgba(37, 105, 149, 1.0)',
						pointBorderWidth: 6,
						pointHoverRadius: 8,
						pointHoverBorderWidth: 1,
						pointRadius: 3,
						// Background
						backgroundColor: [
							'rgba(37, 105, 149, 0.2)',
						],
						// Border
						borderColor: [
							'rgba(37, 105, 149, 1.0)',
						],
						borderWidth: 2
					}, {
						label: 'Price (USD)',
						yAxisID: 'y-axis-1',
						data: priceData,
						// Point
						pointBorderColor: 'rgba(144, 15, 36, 0.15)',
						pointBackgroundColor: 'rgba(144, 15, 36, 0.15)',
						pointHoverBackgroundColor: 'rgba(144, 15, 36, 0.15)',
						pointHoverBorderColor: 'rgba(144, 15, 36, 0.15)',
						pointBorderWidth: 6,
						pointHoverRadius: 8,
						pointHoverBorderWidth: 1,
						pointRadius: 3,
						// Background
						backgroundColor: [
							'rgba(144, 15, 36, 0.05)',
						],
						// Border
						borderColor: [
							'rgba(144, 15, 36, 0.15)',
						],
						borderWidth: 2
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						position: 'bottom'
					},
					scales: {
						xAxes: [{
							ticks: {
								autoSkip: true
							}
						}],
						yAxes: [{
							id: 'y-axis-0',
							position: 'left',
							ticks: {
								beginAtZero:true
							},
							gridLines: {
								color: 'rgba(37, 105, 149, 0.1)'
							}
						}, {
							id: 'y-axis-1',
							position: 'right',
							ticks: {
								beginAtZero:true
							},
							gridLines: {
								color: 'rgba(144, 15, 36, 0.1)'
							}
						}]
					}
				}
			}
		},
	},
	components: {
		'navigation': Navigation,
		Flipclock
	},
	created() {
	},
	mounted() {
		// Load the data we need
		this.loadData()
	},
	watch: {
		loaded: function(loaded) {
			// Set the chart up if we haven't yet!
			if (loaded && !this.cardChart) {
				// Wait until the next dom load
				this.$nextTick().then(() =>{
					// Build the chart
					var ctx = document.getElementById('chart')
					// Build the chart
					this.cardChart = new Chart(ctx, this.chartData)
				})
			}
		}
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
// Chart
//

.chart-container {
	position: relative;
	height: 800px;
	padding: 0px;
	margin-top: 40px;

	canvas#chart {
		height: 100% !important;
	}
}

//
// Responsive
//

@media (min-width: 0px) and (max-width: 800px) {
	.chart-container {
		height: 600px;
	}
}

</style>
