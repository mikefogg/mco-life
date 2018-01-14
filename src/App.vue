<template lang='pug'>
	#app
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

//
// Globals
//

a {
	text-decoration: none;
	color: #fff;
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
