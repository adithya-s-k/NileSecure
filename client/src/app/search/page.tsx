'use client';

import { useState } from 'react';
import axios from 'axios';

interface ApiData {
  _id: string;
  title: string;
  link: string;
  os: string;
  company: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [osFilter, setOsFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [searchResults, setSearchResults] = useState<ApiData[]>([]);

  const handleSearch = async () => {
    const query = {
      searchTerm,
      osFilter,
      companyFilter,
    };
    const { data } = await axios.get('/api/search', { params: query });
    setSearchResults(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="mt-6">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="search"
                id="search"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="os"
              className="block text-sm font-medium text-gray-700"
            >
              Operating System
            </label>
            <div className="mt-1">
              <select
                id="os"
                name="os"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={osFilter}
                onChange={(e) => setOsFilter(e.target.value)}
              >
                <option value="">All OS</option>
                <option value="Mac">Mac</option>
                <option value="Windows">Windows</option>
                <option value="Linux">Linux</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <div className="mt-1">
              <select
                id="company"
                name="company"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              >
                <option value="">All Companies</option>
                <option value="Cisco">Cisco</option>
                <option value="Intel">Intel</option>
                <option value="Apple">Apple</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 bg-indigo-600 border border-transparent rounded-md shadow-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {searchResults.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.map((result) => (
              <li
                key={result._id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="text-gray-900 font-medium truncate">
                      {result.title}
                    </div>
                    <div className="text-gray-500 truncate">
                      {result.company} - {result.os}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <p className="text-center text-gray-500">
              No results found for this search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
