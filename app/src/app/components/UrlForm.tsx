import { useState } from 'react'
import { selectShortUrl, shortenUrlThunk, urlSlice, useDispatch, useSelector } from '@/lib/redux'

const UrlForm: React.FC = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState<string>('')
  const shortenedUrl = useSelector(selectShortUrl);

  const handleInputOnChange = async (value: string): Promise<void> => {
    setUrl(value)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    // @ts-ignore
    dispatch(shortenUrlThunk(url))
  }

  const handleOnGenerateNew = async (): Promise<void> => {
    // @ts-ignore
    dispatch(urlSlice.actions.clearUrlState())
  }

  return (
    <div>
      { shortenedUrl && <ShortUrlDisplay url={ shortenedUrl } onGenerateNew={ handleOnGenerateNew }/> }
      { !shortenedUrl &&
          <ShortenUrlForm url={ url } handleInputOnChange={ handleInputOnChange } handleSubmit={ handleSubmit }/> }
    </div>
  )
}

export default UrlForm

type ShortenUrlFormProps = {
  url: string
  handleInputOnChange: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ url, handleInputOnChange, handleSubmit }) => {
  return (
    <form className="max-w-lg mx-auto my-10 p-8 bg-white rounded-lg shadow-md" onSubmit={ handleSubmit }>
      <div className="mb-6">
        <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900">Your URL:</label>
        <input type="url" id="url"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               value={ url }
               onChange={ (e) => handleInputOnChange(e.target.value) }
               placeholder="Enter URL to shorten"
               required/>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
        Shorten
      </button>
    </form>
  )
}

type ShortUrlDisplayProps = {
  url: string;
  onGenerateNew: () => void;
}

const ShortUrlDisplay: React.FC<ShortUrlDisplayProps> = ({ url, onGenerateNew }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard!")
  }

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-lg shadow-md text-center">
      <p className="text-sm font-medium text-gray-900 mb-4">Shortened URL:</p>
      <p className="text-blue-500 break-all">{ url }</p>
      <button onClick={ copyToClipboard }
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Copy URL
      </button>
      <button onClick={ onGenerateNew }
              className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Generate New Link
      </button>
    </div>
  )
}
