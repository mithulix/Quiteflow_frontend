import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/api'

const MarketplaceContext = createContext()

export function MarketplaceProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState([])
  const [userRequests, setUserRequests] = useState([])
  const [userBids, setUserBids] = useState([])

  // Fetch active requests
  const fetchActiveRequests = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    if (!error) setActiveRequests(data)
  }

  // Realtime subscription for bids
  const setupRealtimeBids = (requestId) => {
    return supabase
      .from(`bids:request_id=eq.${requestId}`)
      .on('*', payload => {
        // Handle bid updates
      })
      .subscribe()
  }

  const value = {
    activeRequests,
    userRequests,
    userBids,
    fetchActiveRequests,
    createRequest: async (requestData) => {
      const { data, error } = await supabase
        .from('requests')
        .insert([requestData])
      if (!error) fetchActiveRequests()
      return { data, error }
    },
    placeBid: async (bidData) => {
      return await supabase
        .from('bids')
        .insert([bidData])
    },
  }

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export function useMarketplace() {
  return useContext(MarketplaceContext)
}