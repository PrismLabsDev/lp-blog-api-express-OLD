const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
}, { timestamps: true });

const ArticleLikes = mongoose.model('ArticleLikes', schema);

module.exports = ArticleLikes;