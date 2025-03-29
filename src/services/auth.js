import { supabase } from '../lib/api'

export const authService = {
  signUp: async ({ email, password, userType }) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (user) {
      // Add to profiles table
      await supabase
        .from('profiles')
        .insert([{ id: user.id, email, user_type: userType }])
    }
    
    return { user, error }
  },
  
  signIn: async ({ email, password }) => {
    return await supabase.auth.signIn({ email, password })
  },
  
  signOut: async () => {
    return await supabase.auth.signOut()
  },
  
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  }
}