import DailyData from './daily'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

export default {
	calculations: {
		// Format the last one
		last: () => {
			const data = _.last(DailyData)
			return {
				date: moment(data.date).format('MMMM Do YYYY'),
				count: data.reservations,
				price: numeral(data.price).format('$0,0.00')
			}
		},

		// Calculate last 30 day average
		lastThirtyDays: {
			total: () => {
				// Get the averages
				const reservations = _.meanBy(_.takeRight(DailyData, 30), (res) => {
					return res.reservations
				})
				// Return them sexily
				return numeral(reservations).format('0,0')
			}
		}
	}
}
