import DailyData from './daily'
// Helpers
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

const reservations = {
	// Format the last one
	last: () => {
		const data = _.last(DailyData)
		return {
			date: moment(data.date).format('MMMM Do YYYY'),
			count: data.reservations,
			price: data.price // ).format('$0,0.00')
		}
	},
	total: () => {
		const days = _.filter(DailyData, (d) => { return !d.ignore })
		const newCount = _.sumBy(days, 'reservations')
		// Pre tracking amount
		const preTracking = 26675
		return newCount + preTracking
	},
	// Calculate last 30 day average
	lastThirtyDays: {
		total: () => {
			// Get the averages
			const reservations = _.sumBy(_.takeRight(DailyData, 30), (res) => {
				return res.reservations
			})
			// Return them sexily
			return reservations
		},
		average: () => {
			// Get the averages
			const reservations = _.meanBy(_.takeRight(DailyData, 30), (res) => {
				return res.reservations
			})
			// Return them sexily
			return reservations
		},
	},
	growth: () => {
		// Get the averages
		const last60 = _.takeRight(DailyData, 60)
		const first30 = _.sumBy(_.take(last60, 30), (res) => {
			return res.reservations
		})
		const last30 = _.sumBy(_.takeRight(last60, 30), (res) => {
			return res.reservations
		})
		const growth = last30 / first30
		const initialGrowth = growth - 1
		// Only use half the distance
		// const conservativeGrowth = (((last30 - first30) / 2) + first30) / first30
		// Use 75% of the growth rate (the amount over 100%)
		const conservativeGrowth = growth  - (0.35 * initialGrowth)
		// Months
		const month1 = last30 * growth
		const month2 = month1 * growth
		const month3 = month2 * growth
		const month4 = month3 * growth
		const month5 = month4 * growth
		const month6 = month5 * growth
		// Conservative
		const conMonth1 = last30 * conservativeGrowth
		const conMonth2 = conMonth1 * conservativeGrowth
		const conMonth3 = conMonth2 * conservativeGrowth
		const conMonth4 = conMonth3 * conservativeGrowth
		const conMonth5 = conMonth4 * conservativeGrowth
		const conMonth6 = conMonth5 * conservativeGrowth
		// Return them
		return {
			rate: growth - 1,
			pre: last30,
			month1: month1,
			month2: month2,
			month3: month3,
			month4: month4,
			month5: month5,
			month6: month6,
			conservative: {
				rate: conservativeGrowth - 1,
				pre: last30,
				month1: conMonth1,
				month2: conMonth2,
				month3: conMonth3,
				month4: conMonth4,
				month5: conMonth5,
				month6: conMonth6
			}
		}
	},

	months: () => {
		const pre = reservations.total()
		const growth = reservations.growth().conservative
		// Add the new growth to the total amount
		const month1 = pre + growth.month1
		const month2 = pre + growth.month1 + growth.month2
		const month3 = pre + growth.month1 + growth.month2 + growth.month3
		const month4 = pre + growth.month1 + growth.month2 + growth.month3 + growth.month4
		const month5 = pre + growth.month1 + growth.month2 + growth.month3 + growth.month4 + growth.month5
		const month6 = pre + growth.month1 + growth.month2 + growth.month3 + growth.month4 + growth.month5 + growth.month6
		// Return the combined months
		return {
			pre: pre,
			month1: month1,
			month2: month2,
			month3: month3,
			month4: month4,
			month5: month5,
			month6: month6
		}
	}

	// // Get 6 month estimates
	// estimates: () => {
	// 	const growth = this.calculations.lastThirtyDays.growth()
	// 	const last30 = this.calculations.lastThirtyDays.total()
	// 	// Months
	// 	const month1 = last30 * growth
	// 	const month2 = month1 * growth
	// 	const month3 = month2 * growth
	// 	const month4 = month3 * growth
	// 	const month5 = month4 * growth
	// 	const month6 = month5 * growth
	// 	// Return the Data
	// 	return
	// }
}

export default reservations
