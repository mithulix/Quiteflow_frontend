import { useEffect, useState } from 'react'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ProviderDashboard() {
  const { user } = useAuth()
  const { activeRequests, fetchActiveRequests, fetchProviderBids } = useMarketplace()
  const [filteredRequests, setFilteredRequests] = useState([])
  const [myBids, setMyBids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchActiveRequests()
      if (user) {
        const bids = await fetchProviderBids(user.id)
        setMyBids(bids)
      }
      setLoading(false)
    }
    loadData()
  }, [user])

  useEffect(() => {
    if (activeRequests.length > 0) {
      // Filter out requests the provider has already bid on
      const myBidRequestIds = myBids.map(bid => bid.request_id)
      setFilteredRequests(
        activeRequests.filter(request => !myBidRequestIds.includes(request.id))
      )
    }
  }, [activeRequests, myBids])

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Loading requests...</h2>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Requests</h2>
      
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No available requests matching your services</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map(request => (
            <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg">{request.title}</h3>
              <p className="text-gray-600 my-2 line-clamp-3">{request.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
                <span className="font-medium">${request.budget || 'Negotiable'}</span>
              </div>
              <Link
                to={`/provider/requests/${request.id}/bid`}
                className="block mt-4 text-center bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 text-sm"
              >
                Place Bid
              </Link>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-6">My Bids</h2>
      {myBids.length === 0 ? (
        <p className="text-gray-500">You haven't placed any bids yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myBids.map(bid => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bid.requests?.title || 'Unknown Request'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${bid.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      bid.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(bid.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}