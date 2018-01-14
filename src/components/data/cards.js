// Data
import Reservations from './reservations'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

const cards = {
	tokensInCirculation: () => {
		return 13085540
	},
	tokenCounts: () => {
		const counts = {
			blue: 0,
			ruby: 50,
			silver: 500,
			black: 50000
		}

		// Set the dynamic monthly reduction
		const reduction = 0.6;

		return {
			blue: {
				basic: counts.blue,
				dynamic: {
					pre: counts.blue,
					month1: counts.blue,
					month2: counts.blue,
					month3: counts.blue,
					month4: counts.blue,
					month5: counts.blue,
					month6: counts.blue
				}
			},
			ruby: {
				basic: counts.ruby,
				dynamic: {
					// Dirty... but effective and easy to read :)
					pre: counts.ruby,
					month1: counts.ruby,
					month2: counts.ruby,
					month3: counts.ruby,
					month4: counts.ruby * reduction,
					month5: counts.ruby * reduction * reduction,
					month6: counts.ruby * reduction * reduction * reduction
				}
			},
			silver: {
				basic: counts.silver,
				dynamic: {
					// Dirty... but effective and easy to read :)
					pre: counts.silver,
					month1: counts.silver,
					month2: counts.silver,
					month3: counts.silver,
					month4: counts.silver * reduction,
					month5: counts.silver * reduction * reduction,
					month6: counts.silver * reduction * reduction * reduction
				}
			},
			black: {
				basic: counts.black,
				dynamic: {
					// Dirty... but effective and easy to read :)
					pre: counts.black,
					month1: counts.black,
					month2: counts.black,
					month3: counts.black,
					month4: counts.black * reduction,
					month5: counts.black * reduction * reduction,
					month6: counts.black * reduction * reduction * reduction
				}
			}
		}
	},
	breakdown: (total, percents, counts) => {
		const count = total || Reservations.total()
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

		const breakdownPercents = []
		// Loop through and calculate new breakdowns
		for (var i=0; i<6; i++) {
			// Just keep the normal breakdown amount
			if (!breakdownChange) {
				breakdownPercents.push(initialBreakdown)
				continue
			}
			// Grab the last percent
			const last = breakdownPercents[breakdownPercents.length-1] || _.clone(initialBreakdown)
			// Take 10% from silver
			const moveAmount = (last.silver * 0.10)
			// Split that between blue and ruby (with more favoring free)
			const percentBlue = last.blue / (last.ruby + last.blue)
			const percentRuby = last.ruby / (last.ruby + last.blue)

			// Now add them!
			const current = last
			last.silver -= moveAmount
			last.blue += (moveAmount * percentBlue)
			last.ruby += (moveAmount * percentRuby)

			breakdownPercents.push(current)
		}


		//
		// Now get the total monthly new tokens
		//

		// Grab the current token breakdowns
		const counts = cards.tokenCounts()
		console.log(counts)
		// Get the actual breakdowns per month
		const breakdowns = {
			pre: cards.breakdown(Reservations.total(), initialBreakdown, {
				blue: dynamic ? counts.blue.dynamic.pre : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.pre : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.pre : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.pre : counts.black.basic
			}),
			month1: cards.breakdown(reservations.month1, breakdownPercents[0], {
				blue: dynamic ? counts.blue.dynamic.month1 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month1 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month1 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month1 : counts.black.basic
			}),
			month2: cards.breakdown(reservations.month2, breakdownPercents[1], {
				blue: dynamic ? counts.blue.dynamic.month2 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month2 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month2 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month2 : counts.black.basic
			}),
			month3: cards.breakdown(reservations.month3, breakdownPercents[2], {
				blue: dynamic ? counts.blue.dynamic.month3 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month3 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month3 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month3 : counts.black.basic
			}),
			month4: cards.breakdown(reservations.month4, breakdownPercents[3], {
				blue: dynamic ? counts.blue.dynamic.month4 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month4 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month4 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month4 : counts.black.basic
			}),
			month5: cards.breakdown(reservations.month5, breakdownPercents[4], {
				blue: dynamic ? counts.blue.dynamic.month5 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month5 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month5 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month5 : counts.black.basic
			}),
			month6: cards.breakdown(reservations.month6, breakdownPercents[5], {
				blue: dynamic ? counts.blue.dynamic.month6 : counts.blue.basic,
				ruby: dynamic ? counts.ruby.dynamic.month6 : counts.ruby.basic,
				silver: dynamic ? counts.silver.dynamic.month6 : counts.silver.basic,
				black: dynamic ? counts.black.dynamic.month6 : counts.black.basic
			})
		}
		// Get the silver and ruby counts
		// This is disgusting, but, i don't have time to do it the right way for now :)
		const monthlyTokens = {
			pre: {
				ruby: breakdowns.pre.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens
			},
			month1: {
				ruby: breakdowns.pre.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens
			},
			month2: {
				ruby: breakdowns.pre.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens
			},
			month3: {
				ruby: breakdowns.pre.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens
			},
			month4: {
				ruby: breakdowns.pre.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens + breakdowns.month4.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens + breakdowns.month4.silver.conservative.tokens
			},
			month5: {
				ruby: breakdowns.pre.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens + breakdowns.month4.ruby.conservative.tokens + breakdowns.month5.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens + breakdowns.month4.silver.conservative.tokens + breakdowns.month5.silver.conservative.tokens
			},
			month6: {
				ruby: breakdowns.pre.ruby.conservative.tokens + breakdowns.month1.ruby.conservative.tokens + breakdowns.month2.ruby.conservative.tokens + breakdowns.month3.ruby.conservative.tokens + breakdowns.month4.ruby.conservative.tokens + breakdowns.month5.ruby.conservative.tokens + breakdowns.month6.ruby.conservative.tokens,
				silver: breakdowns.pre.silver.conservative.tokens + breakdowns.month1.silver.conservative.tokens + breakdowns.month2.silver.conservative.tokens + breakdowns.month3.silver.conservative.tokens + breakdowns.month4.silver.conservative.tokens + breakdowns.month5.silver.conservative.tokens + breakdowns.month6.silver.conservative.tokens
			},
		}

		return {
			pre: monthlyTokens.pre.ruby + monthlyTokens.pre.silver,
			month1: monthlyTokens.month1.ruby + monthlyTokens.month1.silver,
			month2: monthlyTokens.month2.ruby + monthlyTokens.month2.silver,
			month3: monthlyTokens.month3.ruby + monthlyTokens.month3.silver,
			month4: monthlyTokens.month4.ruby + monthlyTokens.month4.silver,
			month5: monthlyTokens.month5.ruby + monthlyTokens.month5.silver,
			month6: monthlyTokens.month6.ruby + monthlyTokens.month6.silver
		}
	},

	// Get the monthly token price
	monthlyPrices: (addTokens = false) => {
		const circulation = cards.tokensInCirculation()
		const dynamic = cards.lockup(true, true)
		const currentPrice = Reservations.last().price
		// Add tokens each month into circulation
		const circulationArray = [circulation]
		const addAmount = 0.0025 // Add 2.5% each month
		for (var i=0;i<6;i++) {
			if (addTokens) {
				const last = _.last(circulationArray)
				circulationArray.push(last + (last * addAmount))
			} else {
				// Just use the normal circulation
				circulationArray.push(circulation)
			}
		}

		const prices = {
			pre: {
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
		prices.month1.price = prices.pre.marketcap / (circulationArray[1] - dynamic.month1)
		prices.month1.marketcap = prices.month1.price * circulationArray[1]

		prices.month2.price = prices.month1.marketcap / (circulationArray[2] - dynamic.month2)
		prices.month2.marketcap = prices.month2.price * circulationArray[2]

		prices.month3.price = prices.month2.marketcap / (circulationArray[3] - dynamic.month3)
		prices.month3.marketcap = prices.month3.price * circulationArray[3]

		prices.month4.price = prices.month3.marketcap / (circulationArray[4] - dynamic.month4)
		prices.month4.marketcap = prices.month4.price * circulationArray[4]

		prices.month5.price = prices.month4.marketcap / (circulationArray[5] - dynamic.month5)
		prices.month5.marketcap = prices.month5.price * circulationArray[5]

		prices.month6.price = prices.month5.marketcap / (circulationArray[6] - dynamic.month6)
		prices.month6.marketcap = prices.month6.price * circulationArray[6]

		return prices
	}
}

export default cards
