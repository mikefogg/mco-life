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
		// initial tracking amount
		const initialTracking = 26675
		return newCount + initialTracking
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
		const lastFourWeeks = _.takeRight(DailyData, 28)
		const firstTwo = _.sumBy(_.take(lastFourWeeks, 14), 'reservations')
		const lastTwo = _.sumBy(_.takeRight(lastFourWeeks, 14), 'reservations')
		const lastThirty = _.sumBy(_.takeRight(DailyData, 30), 'reservations')

		// const lastMonth = _.takeRight(data, 30)
		// const twoMonthAvg = _.meanBy(lastTwoWeeks, 'reservations')

		const growth = lastTwo / firstTwo
		const monthlyGrowth = growth - 1

		// Only use half the distance
		// const conservativeGrowth = (((last30 - first30) / 2) + first30) / first30
		// Use 75% of the growth rate (the amount over 100%)
		// We do this so that we take the initial growth (ex, 150%)
		// and remove x% of the amount over 100%
		const conservativeGrowth = growth - (0.25 * monthlyGrowth)
		// Months
		const month1 = lastThirty * growth
		const month2 = month1 * growth
		const month3 = month2 * growth
		const month4 = month3 * growth
		const month5 = month4 * growth
		const month6 = month5 * growth
		// Conservative
		const conMonth1 = lastThirty * conservativeGrowth
		const conMonth2 = conMonth1 * conservativeGrowth
		const conMonth3 = conMonth2 * conservativeGrowth
		const conMonth4 = conMonth3 * conservativeGrowth
		const conMonth5 = conMonth4 * conservativeGrowth
		const conMonth6 = conMonth5 * conservativeGrowth
		// Return them
		return {
			rate: growth - 1,
			initial: 0,
			month1: month1,
			month2: month2,
			month3: month3,
			month4: month4,
			month5: month5,
			month6: month6,
			conservative: {
				rate: conservativeGrowth - 1,
				initial: 0,
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
		const initial = reservations.total()
		const growth = reservations.growth().conservative
		// Add the new growth to the total amount
		const month1 = growth.month1
		const month2 = growth.month1 + growth.month2
		const month3 = growth.month1 + growth.month2 + growth.month3
		const month4 = growth.month1 + growth.month2 + growth.month3 + growth.month4
		const month5 = growth.month1 + growth.month2 + growth.month3 + growth.month4 + growth.month5
		const month6 = growth.month1 + growth.month2 + growth.month3 + growth.month4 + growth.month5 + growth.month6
		// Return the combined months
		return {
			initial: initial,
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
