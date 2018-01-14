<template src='./supply-demand.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import RecentData from '@/components/data/recent'
// Helpers
import numeral from 'numeral'

export default {
  name: 'SupplyDemandPage',
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
	methods: {
		formatNumeral: (number) => {
			return numeral(number).format('0,0')
		},
		formatPrice: (number) => {
			return numeral(number).format('0,0')
		},
		formatPercent: (number) => {
			return numeral(number).format('0,0.00%')
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
$blue: #0D3458;
$ruby: #900F24;

.section.explaination {
	text-align: left;
	color: $blue;

	a {
		color: lighten($blue, 30);

		&:hover {
			text-decoration: underline;
		}
	}
}

.statement {

}

.answer {
	padding: 0;
	color: $ruby;
	border-left: 4px solid $ruby;
	padding: 20px;
	background: rgba($blue, .10);
	border-radius: 6px;

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		color: $blue;

		strong {
			color: $ruby;
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
</style>
