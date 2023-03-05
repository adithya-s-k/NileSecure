import db from '../../utils/db';
import SearchResult from '../../models/search';

export default async function handler(req, res) {
  const { searchTerm, osFilter, companyFilter } = req.query;

  // Connect to the database
  try {
    await db.connect();
    // Build the search query object
    const searchQuery = {};
    if (osFilter) {
      searchQuery.os = osFilter;
    }
    if (companyFilter) {
      searchQuery.company = companyFilter;
    }
    if (searchTerm) {
      searchQuery.title = { $regex: searchTerm, $options: 'i' };
    }

    // Search the database for matching documents
    const searchResults = await SearchResult.find(searchQuery);
    console.log(searchResults);
    res.status(200).json({ results: searchResults });
  } catch (error) {
    console.log(req.query);
    res.status(400).json({ error: error.message });
  }
}
