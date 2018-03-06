<template lang='pug'>
.fud-page
	.section.hero
		navigation

		.header-text-container
			h1 Answering tough questions about MCO makes us stronger. Answering them repeatedly makes us annoyed. #[strong Feel free to copy & paste]

	.section.fud
		.inner-content
			h2 Frequently used FUD

			p.statement For those of you who don't know, FUD is a shorthand for #[a(href='https://en.wikipedia.org/wiki/Fear,_uncertainty_and_doubt' target='_blank') Fear, Uncertainty and Doubt]. It's used a lot in the crypto space to point out that someone is spreading information that's negative or harmful for a company or those trading a certain coin. While FUD can be true information used in a negative light, more often than not it's false information that needs to be debunked over and over. This is some common FUD you may see in the MCO community. #[em Consider these an ongoing work-in-progress.]

			.fuds
				div.fud-question(v-for="fud in fuds")
					.question {{fud.question}}
					.answer(v-html='fud.answer')
</template>

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
	color: $brand-blue;
	text-decoration: underline;
}

.section.fud {
	text-align: left;
	color: $brand-blue;
	font-size: 24px;

	a {
		color: lighten($brand-blue, 30);

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
		color: $brand-ruby;

		a {
			color: $brand-ruby;

			&:hover {
				text-decoration: none;
			}
		}
	}
	.answer {
		margin-top: 20px;
		padding: 0;
		color: $brand-blue;
		border-left: 4px solid $brand-blue;
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
	}
}

@media (min-width: 0px) and (max-width: 600px) {
  .fud-question {
  	.question {
      font-size: 20px;
    }
  }
}

</style>
