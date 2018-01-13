import DailyData from './daily'
import Reservations from './reservations'

//
// Export this so we can pull it in
//

export default {
	reservations: {
		thirtyDayAverage: Reservations.calculations.lastThirtyDays.total(),
		last: Reservations.calculations.last(),
		total: 54000
	},
	daily: {}
}
