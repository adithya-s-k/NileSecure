const mongoose = require('mongoose');

const searchResultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
});

const SearchResult = mongoose.model('SearchResult', searchResultSchema);

module.exports = SearchResult;
