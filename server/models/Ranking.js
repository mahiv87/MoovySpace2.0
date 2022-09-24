const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ObjectId = Schema.Types.ObjectId;

const rankingSchema = new Schema({
  rankId: {
    type: Number,
		required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
  },
  ranking: {
    type: Number,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

module.exports = rankingSchema;
