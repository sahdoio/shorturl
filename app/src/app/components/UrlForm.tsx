import { useState } from 'react'

const UrlForm: React.FC = () => {
  const [url, setUrl] = useState<string>('')
  const [shortenedUrl, setShortenedUrl] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate URL shortening logic
    setShortenedUrl(`https://short.url/${encodeURIComponent(url)}`)
  }

  return (
    <div>
      <form className="max-w-lg mx-auto my-10 p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900">Your URL:</label>
          <input type="url" id="url"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 placeholder="Enter URL to shorten"
                 required />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
          Shorten
        </button>
      </form>

      {shortenedUrl && <ShortUrlDisplay url={shortenedUrl} />}
    </div>
  )
}

export default UrlForm

// New component to display the shortened URL and copy it
const ShortUrlDisplay: React.FC<{ url: string }> = ({ url }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard!")
  }

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-lg shadow-md text-center">
      <p className="text-sm font-medium text-gray-900 mb-4">Shortened URL:</p>
      <p className="text-blue-500 break-all">{url}</p>
      <button onClick={copyToClipboard} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Copy URL
      </button>
    </div>
  )
}
