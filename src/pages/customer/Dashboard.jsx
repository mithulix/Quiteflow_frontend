import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const { userRequests, fetchUserRequests } = useMarketplace()

  useEffect(() => {
    if (user) fetchUserRequests(user.id)
  }, [user])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Requests</h2>
        <Link
          to="/customer/new-request"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + New Request
        </Link>
      </div>

      {userRequests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't created any requests yet</p>
          <Link
            to="/customer/new-request"
            className="text-blue-600 hover:underline"
          >
            Create your first request
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg">{request.title}</h3>
              <p className="text-gray-600 my-2 line-clamp-2">{request.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
                <span className="font-medium">${request.budget}</span>
              </div>
              <Link
                to={`/customer/requests/${request.id}`}
                className="block mt-4 text-blue-600 hover:underline text-sm"
              >
                View details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}