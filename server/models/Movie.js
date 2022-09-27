const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const rankingSchema = require('./Ranking');

const movieSchema = new Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    backdrop: {
      type: String,
    },
    trailer: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    rankings: [rankingSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

movieSchema.virtual('avgRanking').get(function () {
  return this.rankings.length;
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
