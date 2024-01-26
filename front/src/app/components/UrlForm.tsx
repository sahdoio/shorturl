import { useState } from 'react'
import { shortenUrl } from '../helpers/shortenUrl'
import styles from '@/app/styles/Home.module.css'

const UrlForm: React.FC = () => {
  const [url, setUrl] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const shortUrl = await shortenUrl(url)
    alert(`Shortened URL: ${shortUrl}`)
  }

  return (
    <form className={styles.shortUrlForm} onSubmit={handleSubmit}>
      <input 
        className={styles.shortUrlInput}
        type="url" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="Enter URL to shorten"
        required 
      />
      <button className={styles.shortUrlButton} type="submit">Shorten</button>
    </form>
  )
}

export default UrlForm
