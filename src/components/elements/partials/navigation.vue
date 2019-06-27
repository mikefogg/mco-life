<template lang='pug'>
	.nav-area
		.header
			.logo
				router-link(:to="{ name: 'RegistrationsPage' }") mco.life
			.navigation
				ul
					li: router-link(:to="{ name: 'RegistrationsPage' }") Registrations
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang='scss' scoped>
a {
	text-decoration: none;
	color: #fff;
}

.header {
	height: 80px;
	padding: 0 30px;
	display: flex;
}

.logo {
	width: 150px;
	height: 80px;
	padding: 20px 0;
	font-size: 40px;
	line-height: 40px;
}

.navigation {
	flex: 1;
}

ul {
	margin: 0;
	padding: 20px 0;
	list-style: none;
	line-height: 40px;
	text-align: right;

	li {
		display: inline-block;
		margin: 0 5px;
		padding: 0 10px;

		a {
			color: rgba(#fff, .60);

			&.router-link-exact-active {
				color: #fff;
			}
		}
	}
}

//
// MOBILE RESPONSIVE
//

@media only screen and (max-width: 1025px) {
	.navigation {
		display: none;
	}

	.logo {
		margin: 0 auto;
	}
}
</style>
