import TopUrls from '@/app/components/TopUrls'

const Top: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-black font-bold text-center mb-4">Top 100 URLs</h1>
        <TopUrls/>
      </div>
    </div>
  )
}

export default Top

