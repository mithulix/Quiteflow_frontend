import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome to QuoteFlow</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        The reverse marketplace where customers describe what they need and providers compete to offer the best service.
      </p>
      <div className="space-x-4">
        <Link
          to="/register?type=customer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          I'm a Customer
        </Link>
        <Link
          to="/register?type=provider"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          I'm a Provider
        </Link>
      </div>
    </div>
  )
}