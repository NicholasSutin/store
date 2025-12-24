import Link from 'next/link'

export default function NotFound() {
  return (
    <div 
      className="h-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/mountain-banner.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 px-8 py-12 rounded-lg text-center">
        <h1 className="text-white text-9xl font-bold mb-4">404</h1>
        <p className="text-white text-4xl font-light">lost?</p>
        <Link 
          href="/" 
          className="inline-block mt-8 px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
