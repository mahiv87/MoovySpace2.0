const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const rankingSchema = require('./Ranking');

const movieSchema = new Schema({
	movieId: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	backdrop: {
		type: String
	},
	trailer: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp)
	},
	rankings: [rankingSchema],
	moovyStars: {
		type: Number,
		default: () => {
			let total = this.rankings.length ? 0 : null;
			if (total !== null) {
				for (let ranking of this.rankings) {
					total += ranking.ranking
				}
				return Math.round((total / this.rankings.length) * 10);
			}
			return null;
		}
	}
});

module.exports = movieSchema;
