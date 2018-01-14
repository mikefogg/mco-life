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
		steps: {

		},
		total: Reservations.total()
	},
	cards: {
		breakdown: Cards.breakdown(),
		lockup: {
			basic: Cards.lockup(),
			conservative: Cards.lockup(true),
			dynamic: Cards.lockup(true, true)
		}
	},
	tokens: {
		circulation: Cards.tokensInCirculation(),
		monthlyPrices: {
			static: Cards.monthlyPrices(),
			addedCirculation: Cards.monthlyPrices(true)
		}
	},
	daily: {}
}
