<template src='./fud.pug' lang='pug'></template>

<script>
// Partials
import Navigation from '@/components/elements/partials/navigation'
// Helpers
import $ from 'jquery';

export default {
  name: 'FudPage',
  data () {
    return {
      fuds: [
				{
					tag: 'visa',
					question: 'Monaco isn’t a VISA Program Manager',
					answer: '<p>First, <a href="https://help.mona.co/our-company/monaco-as-a-visa-program-manager" target="_blank">I’ll point you at their own FAQ</a>. Check it out!</p><p>Monaco is a VISA Program Manager. When the recent WaveCrest news came out, every company affected was forced to shut all cards off, effective immediately. Monaco is in no way affected since they do not work with WaveCrest. Period.</p><p>Incase you’re not sure what really happened here, WaveCrest got in trouble with VISA for violating the terms of their agreement. This is what Monaco was trying to avoid, a middleman that controls their destiny. To do that, they took the long route to develop a relationship with VISA directly and are now able to issue cards without the need for a third party like WaveCrest.</p>',
					references: [{
						label: 'Twitter post about something',
						url: 'http://google.com'
					}]
				}, {
					tag: 'token',
					question: 'The MCO token has no value',
					answer: "<p>In order to gain access to some of the more premium features of the Monaco card (cashback, lounge access, and more) you will need to lock up a certain number of MCO for six months. As the growth in card registrations grows so will the number of people that require tokens to be locked up... at the same time that the supply of tokens is getting smaller. As you can imagine, this will increase the demand for the token itself. The token has value.</p><p>Step over to the <a href='/#/supply-and-demand'>Token Supply & Demand Prediction</a> page to see the value of Token Lockup in action!</p>",
					references: [{
						label: 'Twitter post about something',
						url: 'http://google.com'
					}]
				}, {
					tag: 'no-product',
					question: 'Monaco doesn’t even have a product yet',
					answer: "<p>While I personally would consider the current app a product, I understand your concern about not having a working card out there right now or an app that functions like a wallet. While I can’t combat that specific point… it's very clear that the team over at Monaco is working tirelessly to get this app out the door. It's worth stating that they have an even larger stake in the game than we do. They obviously want to get out the door as fast as possible.</p><p>The recent WaveCrest news has also pointed out the importance of compliance and following the rules. Since Day 1, Monaco has made it very clear that compliance is at the core of what they are trying to accomplish and will not take any shortcuts to get out to market faster than regulations allow. While I can see that's annoying now in this fast-paced crypto world we live in every day, in the long run it will help build a company that's global, sustainable and prosperous.</p>",
					references: [{
						label: 'Twitter post about something',
						url: 'http://google.com'
					}]
				}, {
					tag: 'app-broken',
					question: 'The app doesn’t even work',
					answer: '<p>Agree to disagree. I used the app on iOS perfectly fine and multiple people close to me have used the Android version.</p><p>It’s possible that there may be a country specific issue. I suggest you <a href="https://mona.co/company#page-contact" target="_blank">reach out to the team</a> and let them know as many details as you can. Before you do that, <a href="https://developer.apple.com/bug-reporting/" target="_blank">check out these guidelines for sending a bug report</a>, it’ll help them debug it even faster and get your issue worked out!</p>',
					references: [{
						label: 'Twitter post about something',
						url: 'http://google.com'
					}]
				}, {
					tag: 'silent',
					question: 'Monaco doesn’t communicate with the community',
					answer: '<p>I’ve gotta say, in Sept - November that was definitely true. We were all in awe of the lack of communication from the team.</p><p>But, like any company worth their merit, Monaco has listened to the community and made an amazing effort to improve their communication. They added two new members of the team (Ally and Yvonne, they’re awesome) who are on slack answering questions and liking meme’s every day. Come join the discussion by sending an email to <a href="mailto:contact@mona.co">contact@mona.co</a> with the email address you used to sign up for the app! Their addition, along with Kris’s consistent weekly Q&A’s have helped improve transparency and reduced the community anxiety levels.</p>',
					references: [{
						label: 'Twitter post about something',
						url: 'http://google.com'
					}]
				}
			]
    }
  },
	components: {
		'navigation': Navigation
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

.fud-page {
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
