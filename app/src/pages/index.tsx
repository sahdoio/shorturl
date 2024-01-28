import UrlForm from '@/app/components/UrlForm';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-top min-h-full bg-gray-100">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">URL Shortener</h1>
        <UrlForm/>
      </div>
    </div>
  )
}

export default Home;
