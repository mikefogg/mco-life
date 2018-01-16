<template src='./supply-demand.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import RecentData from '@/components/data/recent'
// Helpers
import numeral from 'numeral'
import $ from 'jquery';

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
	mounted() {
		// TODO: Move this to global so we don't repeat
    // Make sure the hero is the correct height
		this.resizeHero = _.throttle(this.resizeHero, 50)
		$(window).resize(this.resizeHero);
    // Call it once
		this.resizeHero()
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
	&.advice {
		font-size: 20px;
		padding: 20px;
		background: rgba($ruby, 0.1);
		border-radius: 6px;
	}

	span.ruby {
		color: $ruby;
		margin-right: 10px;
	}
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
