const mongoose = require('mongoose');
const Schema = mongoose.Schema

const filterSchema = new Schema({
  FilterName: String,
  FilterAttrs: Array,
})

module.exports = mongoose.model('Filter', filterSchema);
