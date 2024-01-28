const TopUrls: React.FC = () => {
  // Mock data
  const urls = [
    { link: "https://example1.com", title: "Example Page 1", accesses: 150 },
    { link: "https://example2.com", title: "Example Page 2", accesses: 120 },
    { link: "https://example3.com", title: "Example Page 3", accesses: 95 },
    // Add more items as needed
  ];

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <ul>
        { urls.map((url, index) => (
          <li key={ index } className="border-b last:border-b-0 py-2">
            <span className="font-bold mr-3 text-black">{ index + 1 }°</span>
            <a href={ url.link } target="_blank" rel="noopener noreferrer"
               className="text-blue-500 hover:text-blue-600">
              { url.link }
            </a>
            <p className="text-sm text-gray-600"><strong className="text-blue-500">Page Title:</strong> { url.title }
            </p>
            <p className="text-sm text-gray-600"><strong className="text-blue-500">Page
              Accesses:</strong> { url.accesses }</p>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default TopUrls
