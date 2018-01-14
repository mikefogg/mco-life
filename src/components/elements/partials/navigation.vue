<template lang='pug'>
	.header
		.logo
			router-link(:to="{ name: 'RegistrationsPage' }") mco.life
		.navigation
			ul
				li: router-link(:to="{ name: 'RegistrationsPage' }") Registrations
				li: router-link(:to="{ name: 'SupplyDemandPage' }") Token Supply & Demand
				li: router-link(:to="{ name: 'FudPage' }") FUD Responses
				//- li:router-link(:to="{ name: 'RegistrationsPage' }") Registrations
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang='scss' scoped>
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
</style>
