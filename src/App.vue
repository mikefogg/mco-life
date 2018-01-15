<template lang='pug'>
	#app
		.disclaimer
			| This is an
			strong UNOFFICIAL
			| website built to share information around the MCO token. Visit
			a(href='https://mona.co' target='_blank') https://mona.co
			| for Official Information
		router-view
</template>

<script>
export default {
  name: 'app'
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
	padding: 14px 20px;
	text-align: center;

	strong {
		margin: 0 10px;
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

	border-bottom: 4px solid $ruby;
}

p {
	font-size: 24px;
}

.section {
	padding: 20px;

	&.hero {
		height: 700px;
		background: $blue url('./assets/pattern.svg') no-repeat center center;
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

</style>
