import { useEffect, useState } from 'react'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { useParams } from 'react-router-dom'

export default function LiveBids() {
  const { requestId } = useParams()
  const { setupRealtimeBids } = useMarketplace()
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBids = async () => {
      const { data } = await supabase
        .from('bids')
        .select('*')
        .eq('request_id', requestId)
        .order('amount', { ascending: true })
      
      setBids(data)
      setLoading(false)
    }

    fetchBids()
    const subscription = setupRealtimeBids(requestId)

    return () => {
      subscription?.unsubscribe()
    }
  }, [requestId, setupRealtimeBids])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Live Bids</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {bids.map(bid => (
            <div key={bid.id} className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">{bid.provider_name}</span>
                <span className="text-green-600">${bid.amount}</span>
              </div>
              <p className="text-gray-600 mt-2">{bid.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}