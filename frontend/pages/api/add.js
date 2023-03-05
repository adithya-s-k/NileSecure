import db from '../../utils/db';
import SearchResult from '../../models/search';

const data = [
  {
    title: 'NileSecure',
    link: 'https://nilesecure.com',
    company: 'Intel',
    os: 'Mac',
  },
  {
    title: 'NileSecure',
    link: 'https://nilesecure.com',
    company: 'Cisco',
    os: 'Windows',
  },
];

export default async function handler(req, res) {
  db.connect();
  await SearchResult.deleteMany({});
  await SearchResult.insertMany(data);

  res.status(200).json({ results: data });
}
