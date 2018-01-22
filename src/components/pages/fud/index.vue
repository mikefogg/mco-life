<template src='./fud.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Data
import FudResponses from '@/components/data/fud-responses'
// Helpers
import $ from 'jquery';

export default {
  name: 'FudPage',
  data () {
    return {
      fuds: FudResponses
    }
  },
	components: {
		'navigation': Navigation
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
a {
	color: $blue;
	text-decoration: underline;
}

.section.fud {
	text-align: left;
	color: $blue;
	font-size: 24px;

	a {
		color: lighten($blue, 30);

		&:hover {
			text-decoration: underline;
		}
	}
}

.fuds {
	margin-top: 40px;
}

.fud-targets {
	list-style: square;
	font-size: 18px;

	li {
		padding: 5px 0;
	}
}

.fud-question {
	margin-bottom: 40px;

	.question {
		font-size: 32px;
		color: $ruby;

		a {
			color: $ruby;

			&:hover {
				text-decoration: none;
			}
		}
	}
	.answer {
		margin-top: 20px;
		padding: 0;
		color: $blue;
		border-left: 4px solid $blue;
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
	}
}
</style>
