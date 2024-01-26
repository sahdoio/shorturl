import TopUrls from '@/app/components/TopUrls'
import styles from '@/app/styles/Top.module.css'

const Top: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top 100 URLs</h1>
      <TopUrls />
    </div>
  )
}

export default Top
