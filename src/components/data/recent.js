import DailyData from './daily'
import Reservations from './reservations'
import Cards from './cards'

//
// Export this so we can pull it in
//

export default {
	reservations: {
		thirtyDays: {
			total: Reservations.lastThirtyDays.total(),
			average: Reservations.lastThirtyDays.average(),
		},
		growth: Reservations.growth(),
		last: Reservations.last(),
		months: Reservations.months(),
		total: Reservations.total()
	},
	cards: {
		breakdown: Cards.breakdown(),
		lockup: {
			basic: Cards.lockup().total,
			conservative: Cards.lockup(true).total,
			dynamic: Cards.lockup(true, true).total,
			months: Cards.lockup(true, true).months,
			breakdownPercents: Cards.breakdownPercentages(true),
		},
		tokenCounts: Cards.tokenCounts(),
		calculations: {
			newCardsByMonth: (cardType) => Cards.newCardsByMonth(cardType),
			totalCardsByMonth: (cardType) => Cards.totalCardsByMonth(cardType),
			usdRequiredByMonth: (cardType) => Cards.usdRequiredByMonth(cardType),
			newTokensByMonth: (cardType) => Cards.newTokensByMonth(cardType),
			totalTokensByMonth: (cardType) => Cards.totalTokensByMonth(cardType),
			breakdownPercentages: Cards.breakdownPercentages(true)
		}
	},
	tokens: {
		circulationByMonth: Cards.tokensInCirculationByMonth(true),
		total: Cards.tokensTotal(),
		availableByMonth: Cards.tokensAvailableByMonth(),
		monthlyPrices: {
			static: Cards.monthlyPrices(),
			addedCirculation: Cards.monthlyPrices(true)
		}
	},
	daily: DailyData
}
