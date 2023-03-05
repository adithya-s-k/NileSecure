import dbConnect from '../../../utils/dbConnect';
import SearchResult from '../../../models/search';

export default async function handler(req, res) {
  const { os, company, search } = req.query;

  // Connect to the database
  await dbConnect();

  // Build the search query object
  const searchQuery = {};
  if (os) {
    searchQuery.os = os;
  }
  if (company) {
    searchQuery.company = company;
  }
  if (search) {
    searchQuery.title = { $regex: search, $options: 'i' };
  }

  // Search the database for matching documents
  const searchResults = await SearchResult.find(searchQuery);

  res.status(200).json({ results: searchResults });
}
