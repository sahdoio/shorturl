import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUrlApi } from '@/lib/api/getUrlApi'

const Hash: React.FC = () => {
  const router = useRouter()
  const { hash } = router.query
  const [isLoading, setIsLoading] = useState(true)

  const pageHash: string = (Array.isArray(hash) ? hash[0] : hash) ?? ''

  const getURL = async () => {
    try {
      const res = await getUrlApi(pageHash)
      if (res) {
        window.location.href = res.data
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      router.push('/')
    }
  }

  useEffect(() => {
    if (pageHash) {
      getURL()
    }
  }, [pageHash, router])

  return null
}

export default Hash
