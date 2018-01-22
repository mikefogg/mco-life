<template src='./registrations.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import DailyData from '@/components/data/daily'
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
		}
	},
	computed: {
		lastDay: function() {
			const data = _.last(DailyData)
			return {
				date: moment(data.date).format('MMMM Do, YYYY'),
				count: data.reservations,
				price: data.price // ).format('$0,0.00')
			}
		},
		totalReservations: function() {
			const days = _.filter(DailyData, (d) => { return !d.ignore })
			const newCount = _.sumBy(days, 'reservations')
			// initial tracking amount
			const initialTracking = 26675
			return newCount + initialTracking
		},
		lastThirtyDaysAverage: function() {
			// Get the averages
			const reservations = _.meanBy(_.takeRight(DailyData, 30), (res) => {
				return res.reservations
			})
			// Return them sexily
			return reservations
		}
	},
	components: {
		'navigation': Navigation
	},
	created() {
	},
	mounted() {
		// Find the chart
		var ctx = document.getElementById("chart");
    // Get the datasets
		const validData = _.filter(DailyData, (day) => { return !day.ignore })
		const reservationData = _.map(validData, 'reservations')
		const reservationLabels = _.map(validData, 'date')
		const priceData = _.map(validData, 'price')
		const priceLabels = _.map(validData, 'date')
    // Build the chart
		var myChart = new Chart(ctx, {
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
		})
	},
	methods: {
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

//
// Chart
//

.chart-container {
	position: relative;
	max-height: 800px;
	padding: 0px;
	margin-top: 40px;

	canvas#chart {
		height: 800px;
	}
}

//
// Responsive
// TODO: Global
//

@media (min-width: 0px) and (max-width: 600px) {
	.section.hero {
		h1 {
			margin: 0;
			padding: 0;
			font-size: 32px;
			font-weight: 500;
			line-height: 40px;

			strong {
				font-size: 32px;
				margin: 0 8px;
			}
		}
	}
}

</style>
