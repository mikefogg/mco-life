<template lang='pug'>
	#app
		.header
			.logo
				router-link(:to="{ name: 'RegistrationsPage' }") mco.life
			.navigation
				ul
					li: router-link(:to="{ name: 'RegistrationsPage' }") Registrations
					li: router-link(:to="{ name: 'SupplyDemandPage' }") Token Supply & Demand
					li: router-link(:to="{ name: 'FudPage' }") FUD
					//- li:router-link(:to="{ name: 'RegistrationsPage' }") Registrations
		.navigation

		router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
$blue: #0D3458;

html, body {
	position: relative;
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	background-color: $blue;
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
}

.section {
	padding: 20px;
}

//
// Header
//

.logo {
	padding: 20px 0;
	font-size: 40px;
}

.navigation {
	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			display: inline-block;
			margin: 0 5px;
			padding: 10px 10px;

			a {
				color: rgba(#fff, .60);

				&.router-link-exact-active {
					color: #fff;
				}
			}
		}
	}
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
