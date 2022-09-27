const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ObjectId = Schema.Types.ObjectId;

const rankingSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
  },
  ranking: {
    type: Number,
    max: 10,
  },
  review: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

module.exports = rankingSchema;
