// Data
import Reservations from './reservations'
import Daily from './daily'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

const cards = {
	dynamicAfter: 3,

	tokensTotal: () => {
		return 31587682
	},
	tokensAvailableByMonth: () => {
		const monthlyCirculation = cards.tokensInCirculationByMonth(true)
		const lockedUp = _.values(cards.totalTokensByMonth())
		return _.map(monthlyCirculation, (val, index) => {
			return val - lockedUp[index]
		})
	},
	tokensInCirculationByMonth: (addTokens = false) => {
		const initial = 13195542

		// Add tokens each month into circulation
		const circulationArray = [initial]
		const addAmount = 0.025 // Add 2.5% each month

		for (var i=0;i<6;i++) {
			if (addTokens) {
				const last = _.last(circulationArray)
				circulationArray.push(last + (last * addAmount))
			} else {
				// Just use the normal circulation
				circulationArray.push(initial)
			}
		}

		return circulationArray
	},
	tokenCounts: () => {
		const counts = {
			blue: 0,
			ruby: 50,
			silver: 500,
			black: 50000
		}

		const dynamicCounts = {
			blue: {
				basic: counts.blue,
				dynamic: {
					initial: counts.blue,
				}
			},
			ruby: {
				basic: counts.ruby,
				dynamic: {
					initial: counts.ruby
				}
			},
			silver: {
				basic: counts.silver,
				dynamic: {
					initial: counts.silver
				}
			},
			black: {
				basic: counts.black,
				dynamic: {
					initial: counts.black
				}
			}
		}

		// Set the dynamic monthly reduction
		const reduction = 0.2

		_.times(6, (i) => {
			const month = i + 1

			if (month > cards.dynamicAfter) {
				// This should be dynamic
				const afterDynamic = month - cards.dynamicAfter
				let addition = null
				_.times(afterDynamic, () => {
					addition = addition ? addition * reduction : reduction
				})
				// Multiply these
				dynamicCounts['blue'].dynamic[`month${month}`] = counts.blue * addition
				dynamicCounts['ruby'].dynamic[`month${month}`] = counts.ruby * addition
				dynamicCounts['silver'].dynamic[`month${month}`] = counts.silver * addition
				dynamicCounts['black'].dynamic[`month${month}`] = counts.black * addition
			} else {
				// This should not be dynamic
				dynamicCounts['blue'].dynamic[`month${month}`] = counts.blue
				dynamicCounts['ruby'].dynamic[`month${month}`] = counts.ruby
				dynamicCounts['silver'].dynamic[`month${month}`] = counts.silver
				dynamicCounts['black'].dynamic[`month${month}`] = counts.black
			}
		})

		return dynamicCounts
	},
	breakdown: (total = undefined, percents, counts) => {
		// Make sure we can still pass 0 through
		const count = total == undefined ? Reservations.total() : total

		const breakdown = percents || {
			blue: 0.6582,
			ruby: 0.2488,
			silver: 0.0913,
			black: 0.0018
		}
		// Amount of tokens per card
		const tokenCounts = counts || {
			blue: 0,
			ruby: 50,
			silver: 500,
			black: 50000
		}
		// Silver count
		const silverCount = (count * breakdown.silver) / 2
		// Return these formatted
		return {
			blue: {
				percent: breakdown.blue,
				count: count * breakdown.blue,
				tokens: tokenCounts.blue * (count * breakdown.blue),
				conservative: {
					count: count * breakdown.blue,
					tokens: tokenCounts.blue * (count * breakdown.blue)
				}
			},
			ruby: {
				percent: breakdown.ruby,
				count: count * breakdown.ruby,
				tokens: tokenCounts.ruby * (count * breakdown.ruby),
				conservative: {
					count: (count * breakdown.ruby) + silverCount,
					tokens: tokenCounts.ruby * ((count * breakdown.ruby) + silverCount)
				}
			},
			silver: {
				percent: breakdown.silver,
				count: count * breakdown.silver,
				tokens: tokenCounts.silver * (count * breakdown.silver),
				conservative: {
					count: (count * breakdown.silver) - silverCount,
					tokens: tokenCounts.silver * ((count * breakdown.silver) - silverCount)
				}
			},
			black: {
				percent: breakdown.black,
				count: count * breakdown.black,
				tokens: tokenCounts.black * (count * breakdown.black),
				conservative: {
					count: count * breakdown.black,
					tokens: tokenCounts.black * (count * breakdown.black)
				}
			},
		}
	},
	// Get the lockup amounts per month
	// You can pass in breakdownChange to favor free ones over time
	lockup: (breakdownChange = false, dynamic = false) => {
		// Get the new registrations each month
		const reservations = Reservations.growth().conservative
		// Get the initial lockup breakdown
		let initialBreakdown = {
			blue: 0.6582,
			ruby: 0.2488,
			silver: 0.0913,
			black: 0.0018
		}

		//
		// Calculate the favoring-free breakdown percentages
		//

		const breakdownPercents = cards.breakdownPercentages(breakdownChange)

		//
		// Now get the total monthly new tokens
		//

		// Grab the current token breakdowns
		const counts = cards.tokenCounts()
		// Get the actual breakdowns per month
		// NOTE: I HATE that this is hardcoded like this, boo, but... time is important here
		const breakdowns = {
			initial: cards.breakdown(0, breakdownPercents.initial, {
				blue: dynamic ? counts.blue.dynamic.initial : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.initial : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.initial : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.initial : counts.black.basic
			}),
			month1: cards.breakdown(reservations.month1, breakdownPercents.month1, {
				blue: dynamic ? counts.blue.dynamic.month1 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month1 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month1 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month1 : counts.black.basic
			}),
			month2: cards.breakdown(reservations.month2, breakdownPercents.month2, {
				blue: dynamic ? counts.blue.dynamic.month2 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month2 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month2 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month2 : counts.black.basic
			}),
			month3: cards.breakdown(reservations.month3, breakdownPercents.month3, {
				blue: dynamic ? counts.blue.dynamic.month3 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month3 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month3 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month3 : counts.black.basic
			}),
			month4: cards.breakdown(reservations.month4, breakdownPercents.month4, {
				blue: dynamic ? counts.blue.dynamic.month4 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month4 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month4 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month4 : counts.black.basic
			}),
			month5: cards.breakdown(reservations.month5, breakdownPercents.month5, {
				blue: dynamic ? counts.blue.dynamic.month5 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month5 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month5 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month5 : counts.black.basic
			}),
			month6: cards.breakdown(reservations.month6, breakdownPercents.month6, {
				blue: dynamic ? counts.blue.dynamic.month6 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month6 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month6 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month6 : counts.black.basic
			})
		}
		// Get the silver and ruby counts
		// This is disgusting, but, i don't have time to do it the right way for now :)
		const monthlyTokens = {
			initial: {
				ruby: breakdowns.initial.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens
			},
			month1: {
				ruby: breakdowns.initial.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens
			},
			month2: {
				ruby: breakdowns.initial.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens
			},
			month3: {
				ruby: breakdowns.initial.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens
			},
			month4: {
				ruby: breakdowns.initial.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens + breakdowns.month4.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens + breakdowns.month4.silver.conservative.tokens
			},
			month5: {
				ruby: breakdowns.initial.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens + breakdowns.month4.ruby.conservative.tokens + breakdowns.month5.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens + breakdowns.month4.silver.conservative.tokens + breakdowns.month5.silver.conservative.tokens
			},
			month6: {
				ruby: breakdowns.initial.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens + breakdowns.month4.ruby.conservative.tokens + breakdowns.month5.ruby.conservative.tokens + breakdowns.month6.ruby.conservative.tokens,
				silver: breakdowns.initial.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens + breakdowns.month4.silver.conservative.tokens + breakdowns.month5.silver.conservative.tokens + breakdowns.month6.silver.conservative.tokens
			},
		}

		return {
			months: monthlyTokens,
			breakdownPercents: breakdownPercents,
			total: {
				initial: monthlyTokens.initial.ruby + monthlyTokens.initial.silver,
				month1: monthlyTokens.month1.ruby + monthlyTokens.month1.silver,
				month2: monthlyTokens.month2.ruby + monthlyTokens.month2.silver,
				month3: monthlyTokens.month3.ruby + monthlyTokens.month3.silver,
				month4: monthlyTokens.month4.ruby + monthlyTokens.month4.silver,
				month5: monthlyTokens.month5.ruby + monthlyTokens.month5.silver,
				month6: monthlyTokens.month6.ruby + monthlyTokens.month6.silver
			}
		}
	},

	// Find out the breakdown percentages
	breakdownPercentages: (breakdownChange = false) => {
		let initialBreakdown = {
			blue: 0.6582,
			ruby: 0.2488,
			silver: 0.0913,
			// black: 0.0018
			// Setting black to 0 % so we get no new black cards
			black: 0
		}

		//
		// Calculate the favoring-free breakdown percentages
		//

		const breakdownPercents = {
			initial: initialBreakdown
		}
		// Loop through and calculate new breakdowns
		for (var i=0; i<6; i++) {
			// Just keep the normal breakdown amount
			if (!breakdownChange) {
				breakdownPercents[`month${i+1}`] = initialBreakdown
				continue
			}
			// Grab the last percent
			const last = _.clone(breakdownPercents[`month${i}`] || initialBreakdown)
			// Take 10% from silver
			const percentFromSilver = 0.25
			const silverMoveAmount = (last.silver * percentFromSilver)
			// Split that between blue and ruby (with more favoring free)
			const percentBlue = last.blue / (last.ruby + last.blue)
			const percentRuby = last.ruby / (last.ruby + last.blue)

			const current = last

			// Add the initial black to the first month
			if (i == 0) { last.silver += 0.0018 }

			// Add the silver amount that we took
			last.silver -= silverMoveAmount
			last.blue += (silverMoveAmount * percentBlue)
			last.ruby += (silverMoveAmount * percentRuby)
			//

			breakdownPercents[`month${i+1}`] = current
		}

		console.log('breakdownPercents', breakdownPercents)

		return breakdownPercents
	},

	// Get the monthly token price
	monthlyPrices: (addTokens = false) => {
		const circulationArray = cards.tokensInCirculationByMonth(addTokens)
		const availableArray = cards.tokensAvailableByMonth()
		// Average the last 7 days
		const currentPrice = _.mean(_.takeRight(_.map(Daily, 'price'), 7))

		const prices = {
			initial: {
				price: currentPrice,
				marketcap: currentPrice * circulationArray[0],
			},
			month1: {},
			month2: {},
			month3: {},
			month4: {},
			month5: {},
			month6: {},
		}

		// Grab the months
		_.times(6, (i) => {
			const month = i + 1

			if (month == 1) {
				// Make sure the first one is based off the initial amount
				prices[`month${month}`].price = prices.initial.marketcap / availableArray[month]
			} else {
				prices[`month${month}`].price = prices[`month${month-1}`].marketcap / availableArray[month]

			}

			prices[`month${month}`].marketcap = prices[`month${month}`].price * circulationArray[month]
		})

		return prices
	},

	//
	// Some calculations for the UI
	//

	newCardsByMonth: (cardType) => {
		const percentages = cards.breakdownPercentages(true)

		return _.reject(_.map(Reservations.growth().conservative, (val, key, index) => {
			if (key == 'rate') return null
			// Get the number of new cards
			const newCards = val
			// Grab the % of this color card in this month
			if (cardType) {
				const cardPercent = percentages[key][cardType]
				// Now multiply that times the number of total new cards
				return newCards * cardPercent
			} else {
				// Return the total new Cards
				return newCards
			}
		}), (val) => val == null)
	},

	//
	// Some calculations for the UI
	//

	totalCardsByMonth: (cardType) => {
		const cardTypes = ['blue', 'ruby', 'silver', 'black']
		const totalCardsByMonth = cards.newCardsByMonth(cardType)

		const totalCards = []

		const newCardsByMonth = cards.newCardsByMonth(cardType)
		_.each(newCardsByMonth, (val, index) => {
			const prevVal = totalCards[index-1]
			if (prevVal) {
				// Add it if it exists
				totalCards.push(val + prevVal)
			} else {
				// Create it if it doesnt
				totalCards.push(val)
			}
		})

		return totalCards
	},

	//
	// Some calculations for the UI
	//

	newTokensByMonth: (cardType) => {
		const cardTypes = ['blue', 'ruby', 'silver', 'black']
		const totalCardsByMonth = cards.totalCardsByMonth(cardType)
		const tokenCounts = cards.tokenCounts()

		const totalTokens = {
			initial: {},
			month1: {},
			month2: {},
			month3: {},
			month4: {},
			month5: {},
			month6: {},
		}

		// for each of the card types, go get the number of tokens per month
		_.each(cardTypes, (type, i) => {
			// Get the card type
			const totalCardsByMonth = cards.totalCardsByMonth(type)
			console.log('totalCardsByMonth', type, totalCardsByMonth)
			// Multiply those tokens by the breakdown percentage...
			_.each(_.keys(totalTokens), (month, ii) => {
				// Breakdown percentage
				const tokens = tokenCounts[type].dynamic[month]
				// console.log('totalCardsByMonth', totalCardsByMonth)
				totalTokens[month][type] = totalCardsByMonth[ii] * tokens
			})
		})

		const totals = _.map(_.values(totalTokens), (val) => _.sum(_.values(val)))

		return totals
	},

	//
	// Some calculations for the UI
	//

	totalTokensByMonth: (cardType) => {
		const cardTypes = ['blue', 'ruby', 'silver', 'black']

		const totalTokens = []

		const newTokensByMonth = cards.newTokensByMonth(cardType)
		_.each(newTokensByMonth, (val, index) => {
			const prevVal = totalTokens[index-1]
			if (prevVal) {
				// Add it if it exists
				totalTokens.push(val + prevVal)
			} else {
				// Create it if it doesnt
				totalTokens.push(val)
			}
		})

		return totalTokens
	},

	//
	// Get the USD requirement for a card for each month
	//

	usdRequiredByMonth: (cardType) => {
		return _.map(cards.tokenCounts()[cardType].dynamic, (val, key) => {
			const prices = cards.monthlyPrices(true)
			return prices[key].price * val
		})
	}
}

export default cards
