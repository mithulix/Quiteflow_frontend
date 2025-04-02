import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (event === 'SIGNED_IN') {
        const userType = session.user.user_metadata?.user_type || 'customer'
        navigate(userType === 'customer' ? '/customer/dashboard' : '/provider/dashboard')
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    signUp: async ({ email, password, userType }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType
          }
        }
      })
      return { data, error }
    },
    signIn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    },
    signOut: async () => {
      await supabase.auth.signOut()
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}