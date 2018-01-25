<template src='./supply-demand.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import Cards from '@/components/data/cards'
import DailyData from '@/components/data/daily'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import Chart from 'chart.js'
import $ from 'jquery'

export default {
  name: 'SupplyDemandPage',
  data () {
    return {
			dynamicAfter: 3,
			dynamicReductionAmount: 0.6,
      // monthlyGrowthRateType is whether or not we grow
			// linearly each month or more month by month
			monthlyGrowthRateType: 'dynamic',
			annualCardsTotal: 1000000,
			monthlyCirculationIncrease: 400000,
			// Null here and monthlyGrowthRateType `dynamic` will
			// use the growth rate for the last 30 days over the previous 30
			monthlyGrowthRate: null,
      // Set the initial price
			initialPrice: Cards.currentPrice,
      // Store the card chart
			cardChart: null
    }
  },
	computed: {
		gridRows: function() {
			const params = {
				dynamicAfter: this.dynamicAfter,
				dynamicReductionAmount: this.dynamicReductionAmount,
				monthlyGrowthRateType: this.monthlyGrowthRateType,
				monthlyGrowthRate: this.monthlyGrowthRate,
				annualCardsTotal: this.annualCardsTotal,
				monthlyCirculationIncrease: this.monthlyCirculationIncrease,
				initialPrice: this.initialPrice,
			}

			return Cards.rowsByMonths(7, params)
		},

		settingOptions: function() {
			return [
				{
					name: 'Initial MCO Price',
					key: 'initialPrice',
					values: [
						{
							value: _.mean(_.takeRight(_.map(DailyData, 'price'), 7)),
							label: `Last 7 Day Average (${this.formatPrice(Cards.currentPrice)})`
						},
						{
							value: 10,
							label: '$10'
						},
						{
							value: 20,
							label: '$20'
						},
						{
							value: 30,
							label: '$30'
						},
						{
							value: 40,
							label: '$40'
						},
						{
							value: 50,
							label: '$50'
						},
						{
							value: 60,
							label: '$60'
						},
						{
							value: 70,
							label: '$70'
						},
						{
							value: 80,
							label: '$80'
						},
						{
							value: 90,
							label: '$90'
						},
						{
							value: 90,
							label: '$100'
						},
						{
							value: 187,
							label: '$187'
						}
					]
				}, {
					name: 'Card Reservation Growth Rate',
					key: 'monthlyGrowthRate',
					values: [
						{
							value: null,
							label: `Current (${this.formatPercent(Cards.currentGrowthRate())})`
						},
						{
							value: 1,
							label: '100%'
						},
						{
							value: 1.25,
							label: '125%'
						},
						{
							value: 1.5,
							label: '150%'
						},
						{
							value: 1.75,
							label: '175%'
						},
						{
							value: 2.0,
							label: '200%'
						},
					]
				}, {
					name: 'Monthly Dynamic MCO Reduction',
					key: 'dynamicReductionAmount',
					values: [
						{
							value: 1.0,
							label: 'Not Dynamic'
						},
						{
							value: 0.9,
							label: '10%'
						},
						{
							value: 0.8,
							label: '20%'
						},
						{
							value: 0.7,
							label: '30%'
						},
						{
							value: 0.6,
							label: '40%'
						},
						{
							value: 0.5,
							label: '50%'
						},
						{
							value: 0.4,
							label: '60%'
						},
						{
							value: 0.3,
							label: '70%'
						},
						{
							value: 0.2,
							label: '80%'
						},
						{
							value: 0.1,
							label: '90%'
						},
					]
				}, {
					name: 'MCO Added To Circulation Monthly',
					key: 'monthlyCirculationIncrease',
					values: [
						{
							value: 100000,
							label: '100k'
						},
						{
							value: 200000,
							label: '200k'
						},
						{
							value: 300000,
							label: '300k'
						},
						{
							value: 400000,
							label: '400k'
						},
						{
							value: 500000,
							label: '500k'
						},
						{
							value: 600000,
							label: '600k'
						},
						{
							value: 700000,
							label: '700k'
						},
						{
							value: 800000,
							label: '800k'
						},
						{
							value: 900000,
							label: '900k'
						},
						{
							value: 1000000,
							label: '1 Million'
						},
					]
				}
			]
		},
		chartData: function() {
			return {
				type: 'line',
				data: {
					labels: this.gridRows.months,
					datasets: [{
						label: 'Monthly Cards',
						yAxisID: 'y-axis-0',
						data: this.gridRows.cardCounts.total,
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
						label: 'MCO Value (USD)',
						yAxisID: 'y-axis-1',
						data: this.gridRows.values.prices,
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
		}
	},
	components: {
		'navigation': Navigation
	},
  created() {
	},
	mounted() {
		// Build the chart
		var ctx = document.getElementById('chart')

    // Build the chart
		if (!this.cardChart) {
			this.cardChart = new Chart(ctx, this.chartData)
		}
	},
	watch: {
    'gridRows.cardCounts.total': function () {
      // Set the chart data, then fire update on it
			this.cardChart.data = this.chartData.data
			if (this.cardChart) { this.cardChart.update() }
    }
  },
	methods: {
    // Set the option value when clicked
		setOption: function(optionName, value) {
			this.$set(this, optionName, value)
		},
		isOptionActive: function(optionName, value) {
			return this[optionName] == value
		},
		formatDecimal: (number) => {
			return numeral(number).format('0,0.00')
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
h2 {
	margin-top: 40px;

	em {
		color: $brand-ruby;
	}

	&:first-child {
		margin-top: 0;
	}
}

.section.grid {
	color: $brand-blue;
	text-align: left;
	font-size: 14px;

	table {
		width: 100%;
	}

	tr.important {
		td {
			background: $brand-blue;
			color: #fff;
		}
	}

	tr.price {
		td {
			background: $brand-ruby;
			color: #fff;
			font-size: 18px;
		}
	}

	tr.empty {
		td {
			background: #fff;
			height: 20px;
			border: 0;
		}
	}

	td, th {
		padding: 5px 10px;
		border: 1px solid #e2e2e2;
	}

	th {
		text-align: center;
	}
}

.grid-table-wrapper {
  overflow-x: auto;
}

p.note {
	padding: 10px 20px;
	background: rgba($brand-ruby, 0.65);
	color: rgba(#fff, 0.8);
	border-radius: 3px;

	strong {
		color: #fff;
	}
}

.settings {
	margin-bottom: 40px;
}

.setting-group {
  margin-bottom: 16px;
	a {
		display: inline-block;
		padding: 10px 20px;
		margin: 0 10px 10px 0;
		font-size: 12px;
		border: 1px solid #d2d2d2;
		border-radius: 3px;
		text-decoration: none;

		&:hover {
			background: #f2f2f2;
			text-decoration: none !important;
		}

		&.active, &.active:hover {
			background: $brand-blue;
			color: #fff !important;
			border: 1px solid $brand-blue;
		}
	}
}

.section.explaination {
	text-align: left;
	color: $brand-blue;

	a {
		color: lighten($brand-blue, 30);

		&:hover {
			text-decoration: underline;
		}
	}
}

.statement {
	padding: 60px 0;

	&.advice {
		font-size: 20px;
		padding: 20px;
		background: rgba($brand-ruby, 0.1);
		border-radius: 6px;
	}

	span.ruby {
		color: $brand-ruby;
		margin-right: 10px;
	}
}

.answer {
	padding: 0;
	color: $brand-ruby;
	border-left: 4px solid $brand-ruby;
	padding: 20px;
	background: rgba($brand-blue, .10);
	border-radius: 6px;

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		color: $brand-blue;

		strong {
			color: $brand-ruby;
		}

		&.list {
			margin-left: 20px;
			list-style: square;

			li {
				margin: 20px 0;
			}
		}
	}

	font-size: 24px;
}

//
// Chart
//

.chart-container {
	position: relative;
	max-height: 300px;
	padding: 0px;
	margin-top: 40px;

	canvas#chart {
		height: 300px;
	}
}
</style>
