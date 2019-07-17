<template lang='pug'>
.registrations-page
	.section.hero
		navigation

		.header-text-container.bold.split
			.left-area
				h1 An unofficial website built & maintained by #[i (and for)] the Crypto.com community
				//- h2 If you’re looking for the official Crypto.com website, please visit #[a(href='https://crypto.com' target='_blank') crypto.com]
				h2 The most recent (and last available &#x1F614;) reservation count was #[strong 277,210]!
				h3 Last Recorded {{recordedAt}} with a new daily record of #[strong 10,908]
</template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
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
		recordedAt: function() {
			return moment('Wed, 17 Jul 2019 01:21:47 EDT -04:00').calendar()
		}
	},

	components: {
		'navigation': Navigation
	},

	mounted() {
		// Load the data we need
		this.loadData()
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
		margin-left: 20px;

		&:last-of-type {
			margin-right: 20px;
		}

		.bar {
			width: 100%;
			position: absolute;
			background: #fff;
			opacity: 0.65;

			&.today {
				background: transparent;
				border: 2px solid rgba(#fff, 0.25);
				border-bottom: none;

				.count {
					color: #fff;
				}
			}

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
