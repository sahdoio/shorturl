import UrlForm from '@/app/components/UrlForm'
import styles from '@/app/styles/Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.shortUrlTitle}>URL Shortener</h1>
        <UrlForm />
    </div>
  )
}

export default Home
