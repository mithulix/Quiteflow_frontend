import { supabase } from '../lib/supabaseClient'

export const authService = {
  // Email/password auth
  signUp: async ({ email, password, userType }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (data?.user) {
      await supabase
        .from('profiles')
        .insert([{ id: data.user.id, email, user_type: userType }])
    }
    
    return { data, error }
  },
  
  signIn: async ({ email, password }) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  // OAuth Providers
  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent' // Required for refresh token
        }
      }
    })
  },

  signInWithGitHub: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
        scopes: 'read:user' // Add GitHub scopes if needed
      }
    })
  },

  // Session management
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getSession: async () => {
    return await supabase.auth.getSession()
  },

  // Profile management
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  },

  // Handle OAuth callback
  handleOAuthCallback: async () => {
    return await supabase.auth.getSession()
  }
}