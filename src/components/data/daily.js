//
// A daily update of the MCO reservation information is added here
// Soon this will auto-update, etc. but speed was the name of the game here
// Also note, since we didn't start tracking until the 23rd of November, we
// added values before that that matched the daily average pre-tracking so that
// we could get accurate data 60 days back. As of the 23rd of July, those numbers
// will no longer be used for comparison. We add the `ignore` in there so we don't
// count them when calculating our total reservations (since they are included in
// the `pre-tracking-amount` that we add). ~ @mikefogg
//

export default [
	{ date: 'November 10, 2017', reservations: 271, price: 5.9, ignore: true },
	{ date: 'November 11, 2017', reservations: 271, price: 5.84, ignore: true },
	{ date: 'November 12, 2017', reservations: 271, price: 4.98, ignore: true },
	{ date: 'November 13, 2017', reservations: 271, price: 6.45, ignore: true },
	{ date: 'November 14, 2017', reservations: 271, price: 6.17, ignore: true },
	{ date: 'November 15, 2017', reservations: 271, price: 6.15, ignore: true },
	{ date: 'November 16, 2017', reservations: 271, price: 5.53, ignore: true },
	{ date: 'November 17, 2017', reservations: 271, price: 5.25, ignore: true },
	{ date: 'November 18, 2017', reservations: 271, price: 5.68, ignore: true },
	{ date: 'November 19, 2017', reservations: 271, price: 5.58, ignore: true },
	{ date: 'November 20, 2017', reservations: 271, price: 5.58, ignore: true },
	{ date: 'November 21, 2017', reservations: 271, price: 5.27, ignore: true },
	{ date: 'November 22, 2017', reservations: 271, price: 5.36, ignore: true },
	{ date: 'November 23, 2017', reservations: 181, price: 5.68 },
	{ date: 'November 24, 2017', reservations: 235, price: 5.75 },
	{ date: 'November 25, 2017', reservations: 229, price: 6.03 },
	{ date: 'November 26, 2017', reservations: 223, price: 6.24 },
	{ date: 'November 27, 2017', reservations: 304, price: 6.94 },
	{ date: 'November 28, 2017', reservations: 306, price: 6.86 },
	{ date: 'November 29, 2017', reservations: 220, price: 5.61 },
	{ date: 'November 30, 2017', reservations: 213, price: 5.72 },

	{ date: 'December 1, 2017', reservations: 187, price: 5.50 },
	{ date: 'December 2, 2017', reservations: 271, price: 6.45 },
	{ date: 'December 3, 2017', reservations: 267, price: 6.73 },
	{ date: 'December 4, 2017', reservations: 887, price: 12.98 },
	{ date: 'December 5, 2017', reservations: 980, price: 13.58 },
	{ date: 'December 6, 2017', reservations: 510, price: 11.02 },
	{ date: 'December 7, 2017', reservations: 468, price: 10.07 },
	{ date: 'December 8, 2017', reservations: 402, price: 11.68 },
	{ date: 'December 9, 2017', reservations: 463, price: 12.24 },
	{ date: 'December 10, 2017', reservations: 475, price: 13.42 },
	{ date: 'December 11, 2017', reservations: 664, price: 15.20 },
	{ date: 'December 12, 2017', reservations: 628, price: 17.89 },
	{ date: 'December 13, 2017', reservations: 675, price: 18.53 },
	{ date: 'December 14, 2017', reservations: 672, price: 16.19 },
	{ date: 'December 15, 2017', reservations: 564, price: 14.67 },
	{ date: 'December 16, 2017', reservations: 470, price: 15.23 },
	{ date: 'December 17, 2017', reservations: 528, price: 15.95 },
	{ date: 'December 18, 2017', reservations: 620, price: 17.63 },
	{ date: 'December 19, 2017', reservations: 577, price: 16.47 },
	{ date: 'December 20, 2017', reservations: 588, price: 17.35 },
	{ date: 'December 21, 2017', reservations: 555, price: 17.96 },
	{ date: 'December 22, 2017', reservations: 371, price: 13.34 },
	{ date: 'December 23, 2017', reservations: 456, price: 17.00 },
	{ date: 'December 24, 2017', reservations: 410, price: 17.76 },
	{ date: 'December 25, 2017', reservations: 621, price: 19.32 },
	{ date: 'December 26, 2017', reservations: 565, price: 17.21 },
	{ date: 'December 27, 2017', reservations: 596, price: 16.86 },
	{ date: 'December 28, 2017', reservations: 503, price: 15.74 },
	{ date: 'December 29, 2017', reservations: 529, price: 16.51 },
	{ date: 'December 30, 2017', reservations: 402, price: 14.19 },
	{ date: 'December 31, 2017', reservations: 403, price: 15.24 },

	{ date: 'January 1, 2018', reservations: 381, price: 14.82 },
	{ date: 'January 2, 2018', reservations: 584, price: 16.52 },
	{ date: 'January 3, 2018', reservations: 665, price: 16.40 },
	{ date: 'January 4, 2018', reservations: 786, price: 16.08 },
	{ date: 'January 5, 2018', reservations: 1353, price: 16.42 },
	{ date: 'January 6, 2018', reservations: 1101, price: 16.19 },
	{ date: 'January 7, 2018', reservations: 1098, price: 20.03 },
	{ date: 'January 8, 2018', reservations: 1228, price: 18.05 },
	{ date: 'January 9, 2018', reservations: 919, price: 16.77 },
	{ date: 'January 10, 2018', reservations: 798, price: 17.16 },

	{ date: 'January 11, 2018', reservations: 822, price: 14.89 },
	{ date: 'January 12, 2018', reservations: 666, price: 16.00 },
	{ date: 'January 13, 2018', reservations: 754, price: 18.56 },
	{ date: 'January 14, 2018', reservations: 756, price: 17.53 },

	{ date: 'January 15, 2018', reservations: 662, price: 16.73 },
	{ date: 'January 16, 2018', reservations: 428, price: 11.96	},

	{ date: 'January 17, 2018', reservations: 412, price: 11.31	},

	{ date: 'January 18, 2018', reservations: 585, price: 11.46	},
	{ date: 'January 19, 2018', reservations: 610, price: 12.04	},
	{ date: 'January 20, 2018', reservations: 541, price: 12.92	},

	{ date: 'January 21, 2018', reservations: 537, price: 13.23	},

]
