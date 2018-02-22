//
// This is the card calculation magic. It holds all of the math behind how we're
// calculating all the things. The main function is the bottom one `rowsByMonths`.
// I tried to comment in there as much as I could so you could see what's going on
// and how we landed here ~ @mikefogg
//

// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

const cards = {
	daily: [],
	tokensExist: 31587682,
	tokensInCirculation: 13195542,
	dynamicAfter: 3,
	dynamicReductionAmount: 0.6,
	monthlyGrowthRateType: 'dynamic',
	monthlyGrowthRate: null,
	annualCardsTotal: 1000000,
	monthlyCirculationIncrease: 400000,
	initialPrice: 0,
	currentGrowthRate: 0,

	tokenAmounts: {
		blue: 0,
		ruby: 50,
		silver: 500,
		black: 50000
	},

	//
	// Get the current growth rate in the last 30 days
	//

	calculateGrowthRate: () => {
		const last60 = _.takeRight(cards.daily, 60)
		const first30 = _.sumBy(_.take(last60, 30), 'reservations')
		const last30 = _.sumBy(_.takeRight(last60, 30), 'reservations')
		return last30 / first30
	},

	//
	// Calculate how many tokens are in circulation each month
	//

	tokensInCirculationByMonth: (addAmount) => {
		const initial = cards.tokensInCirculation
		// Add tokens each month into circulation
		const circulationArray = [initial]
		for (var i=0;i<6;i++) {
			const last = _.last(circulationArray)
			const totalInCirculation = Math.min(last + addAmount, cards.tokensExist)
			circulationArray.push(totalInCirculation)
		}
		return circulationArray
	},

	//
	// Calculate the favoring-free breakdown percentages
	//

	breakdownPercentages: (breakdownChange = false) => {
		let initialBreakdown = {
			blue: 0.6582,
			ruby: 0.2488,
			silver: 0.0913,
			// black: 0.0018
			// Setting black to 0 % so we get no new black cards
			black: 0
		}
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
			// Take 25% from silver
			const percentFromSilver = 0.25
			const silverMoveAmount = (last.silver * percentFromSilver)
			// Split that between blue and ruby (with more favoring free)
			const percentBlue = last.blue / (last.ruby + last.blue)
			const percentRuby = last.ruby / (last.ruby + last.blue)
			// Since we want to update the last one, snag that
			const current = last
			// Add the initial black to the first month of silver
			if (i == 0) { last.silver += 0.0018 }
			// Add the silver amount that we took to ruby and blue
			last.silver -= silverMoveAmount
			last.blue += (silverMoveAmount * percentBlue)
			last.ruby += (silverMoveAmount * percentRuby)
			// And now set that on the correct month
			breakdownPercents[`month${i+1}`] = current
		}

		return breakdownPercents
	},

	//
	// Figure out a row by month
	// This is the majority of the logic
	// NOTE: I built it so you can also pass in an `annualCardsTotal` amount
	// that could be used instead of a percentage. I didn't implement the code
	// yet to actually allow you to change it on the front end, so stay tuned.
	//

	rowsByMonths: (monthCount = 7, params = {}) => {
		// Default params
		const settings = {
			dynamicAfter: params.dynamicAfter || cards.dynamicAfter,
			dynamicReductionAmount: params.dynamicReductionAmount || cards.dynamicReductionAmount,
			annualCardsTotal: params.annualCardsTotal || cards.annualCardsTotal,
			tokensExist: params.tokensExist || cards.tokensExist,
			monthlyGrowthRateType: params.monthlyGrowthRateType || cards.monthlyGrowthRateType,
			// Null here and monthlyGrowthRateType `dynamic` will
			// use the growth rate for the last 30 days over the previous 30
			monthlyGrowthRate: params.monthlyGrowthRate || cards.monthlyGrowthRate,
			// Amount we add to the circulation each month
			monthlyCirculationIncrease: params.monthlyCirculationIncrease || cards.monthlyCirculationIncrease,
			// Set the initial price
			initialPrice: params.initialPrice || cards.initialPrice
		}

		// Set the types of colors
		const colors = [
			{ color: 'blue', name: 'Midnight Blue' },
			{ color: 'ruby', name: 'Ruby Red' },
			{ color: 'silver', name: 'Precious Metal' },
			{ color: 'black', name: 'Obsidian Black' },
		]
		// Get the breakdown breakdownPercentages
		const breakdownPercents = cards.breakdownPercentages(true)
		// Note, if settings. is 'dynamic', the new monthly cards grows by a certain amount
		// each month. If not, it will be static every month
		let monthlyTotals = []
		if (settings.monthlyGrowthRateType == 'dynamic') {
			// Find the current growth rate
			const last30 = _.sumBy(_.takeRight(cards.daily, 30), 'reservations')
			const growthRate = settings.monthlyGrowthRate || cards.currentGrowthRate
			// Add the initial value in there as 0 regardless
			monthlyTotals.push(0)
			// Add the remaining months
			_.times(monthCount - 1, (i) => {
				monthlyTotals.push(i == 0 ? last30 * growthRate : monthlyTotals[i] * growthRate)
			})
			settings.monthlyGrowthRate = growthRate
		} else {
			// Static, so lets devide the total number by 12
			monthlyTotals = _.times(monthCount, (i) => i == 0 ? 0 : settings.annualCardsTotal / 12)
		}

		// Store the months as you create them
		const months = []
		// Card counts per month
		const cardCounts = {
			new: [],
			total: []
		}

		// Do this for x months
		_.times(monthCount, (i) => {
			// Get the number of new cards this month
			const monthName = i == 0 ? 'initial' : `month${i}`
			// Grab the last month if we have one
			const lastMonth = months[i - 1]
			const month = {
				name: monthName,
				cards: {},
				tokens: {},
				cardCounts: {
					new: 0
				}
			}

			// Loop through each color and set the amount of each color this month
			_.each(colors, (color) => {
				const colorKey = color.color
				month.cards[colorKey] = {
					name: color.name
				}
				// Get the number of new cards this month for this color
				const newCardsThisMonth = breakdownPercents[monthName][colorKey] * monthlyTotals[i]
				// Set the number of MCO for this color
				month.cards[colorKey].newCards = newCardsThisMonth
				// Calculate total by adding this month to the existing months in the array
				month.cards[colorKey].totalCards = _.sumBy(months, (m) => m.cards[colorKey].newCards) + month.cards[colorKey].newCards
				// Store how many cards there are for all colors
				month.cardCounts.new += newCardsThisMonth
				// Price in MCO (modified later for dynamic)
				let mcoPer = cards.tokenAmounts[colorKey]
				if (i > settings.dynamicAfter && lastMonth && colorKey === 'ruby') {
					// Only ruby will be with a dynamic price
					mcoPer = lastMonth.cards[colorKey].mcoPer * settings.dynamicReductionAmount
				}
				month.cards[colorKey].mcoPer = mcoPer
			})

			// Grab the total tokens in circulation each month
			const circulationArray = cards.tokensInCirculationByMonth(settings.monthlyCirculationIncrease)

			// Now we need to figure out how many tokens this means per month
			_.each(month.cards, (color) => {
				month.tokens = {}
				// Get the number of new tokens locked up this month
				month.tokens.newLockup = _.sumBy(_.values(month.cards), (m) => {
					return (m.newCards * m.mcoPer)
				})
				// How many were locked up at the end of last month
				month.tokens.totalLockup = lastMonth ? lastMonth.tokens.totalLockup + month.tokens.newLockup : month.tokens.newLockup
				// How many were in circulation this month?
				month.tokens.circulation = circulationArray[i]
			})

			// Add this to the months array
			months.push(month)
		})

		// debugger
		// Format it for easier grid work!
		const result = {
			months: _.map(months, 'name'),
			cards: [],
			cardCounts: {
				new: [],
				total: [],
			},
			tokens: {
				exist: [],
				newLockup: [],
				totalLockup: [],
				circulation: [],
				available: [],
			},
			values: {
				marketcaps: [],
				prices: [],
			}
		}

		//
		// Add the cards
		//

		_.each(months[0].cards, (thisCard, key) => {
			const card = {
				name: thisCard.name,
				mcoPer: [],
				usdPer: [],
				newCards: [],
				totalCards: [],
			}
			// Add row items for each month
			_.each(months, (month, index) => {
				// Cards
				card.mcoPer.push(month.cards[key].mcoPer)
				card.newCards.push(month.cards[key].newCards)
				card.totalCards.push(month.cards[key].totalCards)
			})
			// Add this card to the list
			result.cards.push(card)
		})

		//
		// Add the token information
		//

		// Add row items for each month
		_.each(months, (month) => {
			// Tokens
			result.tokens.exist.push(settings.tokensExist)
			result.tokens.newLockup.push(month.tokens.newLockup)
			result.tokens.totalLockup.push(month.tokens.totalLockup)
			result.tokens.circulation.push(month.tokens.circulation)
			result.tokens.available.push(Math.max((month.tokens.circulation - month.tokens.totalLockup), 0))
		})

		//
		// Calculate the prices
		//

		_.each(months, (month, index) => {
			const lastMonth = months[index - 1]

			if (!lastMonth) {
				// If it's the first one, set the price as the current prices
				const currentPrice = settings.initialPrice
				result.values.prices.push(currentPrice)
				result.values.marketcaps.push(result.tokens.circulation[index] * currentPrice)
			} else {
				// Calculate the price!
				const lastMarketcap = result.values.marketcaps[index - 1]
				const currentAvailableTokens = result.tokens.available[index]
				const price = lastMarketcap / currentAvailableTokens
				result.values.prices.push(price)
				result.values.marketcaps.push(result.tokens.circulation[index] * price)
			}
		})

		//
		// Calculate usd card price
		//

		_.each(result.cards, (thisCard, key) => {
			_.each(months, (month, index) => {
				//
				const mcoPer = thisCard.mcoPer[index]
				const mcoPrice = result.values.prices[index]
				const cardPrice = mcoPrice * mcoPer
				const lastCardPrice = result.cards[key].usdPer[index - 1]

				if (index > settings.dynamicAfter && lastCardPrice) {
					const ratio = lastCardPrice / cardPrice
					// This needs to be dynamic! Make it so :)
					// result.cards[key].usdPer.push(lastCardPrice)
					// debugger
					// result.cards[key].mcoPer[index] = result.cards[key].mcoPer[index] * ratio
					// result.cards[key].mcoPer[index] = result.cards[key].mcoPer[index] * ratio
					result.cards[key].usdPer.push(cardPrice)

				} else {
					result.cards[key].usdPer.push(cardPrice)
				}
			})
		})

		//
		// Add the card counts
		//

		_.each(months, (month, index) => {
			const lastMonth = result.cardCounts.total[index - 1]
			// Add the new cards added this month
			result.cardCounts.new.push(month.cardCounts.new)
			// Add the total card counts
			result.cardCounts.total.push(lastMonth ? month.cardCounts.new + result.cardCounts.total[index - 1] : month.cardCounts.new)
		})

		return result
	}
}

export default cards
