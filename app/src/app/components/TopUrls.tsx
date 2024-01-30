import React, { useState, useEffect } from 'react'
import { topTrendingApi } from '@/lib/api/topTrendingApi'

const TopUrls: React.FC = () => {
  const [urls, setUrls] = useState([])

  // Function to fetch data from the endpoint
  const fetchData = async () => {
    try {
      const response = await topTrendingApi()
      // @ts-ignore
      setUrls(response.data.payload)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <div className="flex justify-end">
        <button
          onClick={ fetchData }
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Refresh
        </button>
      </div>

      <ul>
        { urls.map((link, index) => (
          <li key={ index } className="border-b last:border-b-0 py-2">
            <span className="font-bold mr-3 text-black">{ index + 1}°</span>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
              {link.url}
            </a>
            <p className="text-sm text-gray-600"><strong className="text-blue-500">Url Hash:</strong> {link.urlHash}</p>
            {link.linkDetails.map((details, index) => (
              <p className="text-sm text-gray-600"><strong className="text-blue-500">{details.name}:</strong> {details.value}</p>
            ))}
            <p className="text-sm text-gray-600"><strong className="text-blue-500">Page Accesses:</strong> {link.pageViews}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopUrls
