<template src='./registrations.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import RecentData from '@/components/data/recent'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import Chart from 'chart.js';
import $ from 'jquery';

export default {
	name: 'RegistrationsPage',
	data () {
		return {
			recentData: {}
		}
	},
	components: {
		'navigation': Navigation
	},
	created() {
    // Store the recent data so we calculate it once
		this.recentData = RecentData
	},
	mounted() {
    // TODO: Move this to global so we don't repeat
    // Make sure the hero is the correct height
		this.resizeHero = _.throttle(this.resizeHero, 50)
		$(window).resize(this.resizeHero);
		// Call it once
		this.resizeHero()

		// Build the chart
		var ctx = document.getElementById("chart");
    // Get the datasets
		const validData = _.filter(this.recentData.daily, (day) => { return !day.ignore })
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
				},{
					label: 'Price (USD)',
					yAxisID: 'y-axis-1',
					data: priceData,
          // Point
					pointBorderColor: 'rgba(126, 186, 132, 0.3)',
          pointBackgroundColor: 'rgba(126, 186, 132, 0.3)',
          pointHoverBackgroundColor: 'rgba(126, 186, 132, 0.3)',
          pointHoverBorderColor: 'rgba(126, 186, 132, 0.3)',
          pointBorderWidth: 6,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          // Background
					backgroundColor: [
						'rgba(126, 186, 132, 0.1)',
					],
          // Border
					borderColor: [
						'rgba(126, 186, 132, 0.3)',
					],
					borderWidth: 2
				}]
			},
			options: {
				global: {
		      responsive: true,
		      maintainAspectRatio: false
		    },
				scales: {
					yAxes: [{
						id: 'y-axis-0',
						position: 'left',
						ticks: {
							beginAtZero:true
						}
					}, {
						id: 'y-axis-1',
						position: 'right',
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
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
    // Make sure the hero is the right height
		resizeHero: () => {
			const windowHeight = $(window).outerHeight()
			const disclaimerHeight = $('.disclaimer').outerHeight()
			const navHeight = $('.nav-area').outerHeight()
			const heroHeight = windowHeight - disclaimerHeight - 40 // for padding
      // Set the heights
			$('.section.hero').height(heroHeight)
			$('.section.hero .header-text-container').height(heroHeight - navHeight)
		}
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
	max-height: 300px;

	canvas#chart {
		height: 300px;
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
