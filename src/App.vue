<template lang='pug'>
	#app
		.disclaimer
			| This is an
			strong UNOFFICIAL
			| website built to share information around the MCO token. Visit
			a(href='https://mona.co' target='_blank') https://mona.co
			| for Official Information
		router-view
		.footer
			.official-links
				a(href='#')
			.contact
				.label
					| Stay tuned for updates!
				ul.buttons
					li: a.twitter(href='https://twitter.com/mcolife' target='_blank') Follow on Twitter

			.donations
				.label
					| As always, donations are always appreciated to help keep the servers running
					em #willworkformco
				ul.methods
					li
						span BTC:
						| 18HXh3Z6v284cy6F1PA6mPtFQig39zrNWq
					li
						span ETH/MCO:
						| 0x2415f94dF452C91BbfF510aEEc7eF89640b1cB63
			.built-by
				| Built with
				span 100% Pure Believe
				| from
				span Boston.
				| Find me on slack
				strong @mikef
				| or
				strong: a(href='mailto:mcolife@mikefogg.co') shoot me an email
</template>

<script>
export default {
  name: 'app',
	metaInfo: {
		title: 'mco.life | MCO Token Information',
		link: [
    	{ rel: 'favicon', href: './assets/images/favicon-32x32.png' }
		]
  }
}
</script>

<style lang='scss'>
$blue: #0D3458;
$ruby: #900F24;

html, body {
	position: relative;
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
	font-weight: 600;
}

.disclaimer {
	color: #fff;
	background: lighten($blue, 10);
	border-bottom: 1px solid $blue;
	padding: 14px 20px;
	text-align: center;

	strong {
		margin: 0 6px;
	}

	a {
		margin: 0 10px;
		color: #fff;
		text-decoration: underline;
	}
}

.header-text-container {
	height: 400px;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
}

//
// Globals
//

a {
	color: lighten($blue, 30);
	text-decoration: underline;
}

h1 {
	margin: 0;
	padding: 0;
	font-weight: 500;
	line-height: 80px;
}

h2 {
	margin: 0;
	padding: 0;
	font-size: 52px;
	font-weight: 500;
	line-height: 80px;
	color: $blue;
	border-bottom: 4px solid $ruby;
	text-align: left;
}

p {
	font-size: 24px;
}

.section {
	position: relative;
	padding: 20px;

	&.hero {
		height: 700px;
		background: $blue url('./assets/images/pattern.svg') no-repeat center center;
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;
		background-size: cover;
	}

	.inner-content {
		max-width: 1200px;
		margin: 0 auto;
	}
}

//
// Header
//

.logo {
	padding: 20px 0;
	font-size: 40px;
}


//
// Pages
//

h1 {
	margin: 0 auto;
	padding: 20px;
	max-width: 1200px;
	font-size: 52px;
	color: rgba(#fff, .60);

	strong {
		color: #fff;
		margin: 0 20px;
		font-size: 58px;
	}
}

//
// Footer
//

.contact {
	padding: 60px 40px;
	background: $blue;
	text-align: center;
	color: #fff;

	.label {
		font-size: 40px;

		em {
			margin-left: 10px;
			color: rgba(#fff, 0.6);
		}
	}

	ul.buttons {
		margin: 40px 0 0;
		padding: 0;
		list-style: none;
		font-size: 14px;

		li {
			display: inline-block;

			a {
				background: #fff;
				color: $blue;
				display: inline-block;
				padding: 20px 40px;
				border-radius: 40px;
				text-decoration: none;
				font-size: 24px;

				&:hover {
					background: rgba(#fff, 0.9);
				}
			}
		}

		span {
			color: rgba(#fff, 0.6);
			margin-right: 10px;
		}
	}
}

.donations {
	padding: 60px 40px;
	background: darken($blue, 10);
	text-align: center;
	color: #fff;

	.label {
		font-size: 24px;

		em {
			margin-left: 10px;
			color: rgba(#fff, 0.6);
		}
	}

	ul.methods {
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
		font-size: 14px;

		span {
			color: rgba(#fff, 0.6);
			margin-right: 10px;
		}
	}
}

.built-by {
	background: darken($blue, 10);
	border-top: 1px solid rgba(#fff, 0.05);
	color: rgba(#fff, 0.35);
	font-size: 14px;
	text-align: center;
	padding: 20px;

	span, strong {
		margin: 0 5px;
		color: rgba(#fff, 0.45);
	}

	a {
		text-decoration: underline;
		color: rgba(#fff, 0.45);
	}
}

</style>
