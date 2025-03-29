import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline text-lg"
      >
        Return to homepage
      </Link>
    </div>
  )
}