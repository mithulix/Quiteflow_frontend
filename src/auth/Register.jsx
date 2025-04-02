import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('customer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState({
    google: false,
    github: false
  })
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    try {
      setError('')
      setLoading(true)
      await signUp({ email, password, userType })
      navigate(userType === 'customer' ? '/customer/dashboard' : '/provider/dashboard')
    } catch (err) {
      setError('Failed to create account: ' + err.message)
    }
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider) => {
    try {
      setError('')
      setOauthLoading(prev => ({ ...prev, [provider]: true }))
      
      // First sign in with OAuth
      const { error: oauthError } = provider === 'google' 
        ? await authService.signInWithGoogle()
        : await authService.signInWithGitHub()

      if (oauthError) throw oauthError

      // After OAuth, update their profile with userType
      const { data: { user }, error: profileError } = await authService.getSession()
      
      if (profileError) throw profileError
      
      await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', user.id)

      navigate(userType === 'customer' ? '/customer/dashboard' : '/provider/dashboard')
    } catch (err) {
      setError(`Failed to sign in with ${provider}: ${err.message}`)
    } finally {
      setOauthLoading(prev => ({ ...prev, [provider]: false }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleOAuthSignIn('google')}
            disabled={oauthLoading.google}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-70"
          >
            {oauthLoading.google ? (
              'Signing up...'
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.143-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
          
          <button
            onClick={() => handleOAuthSignIn('github')}
            disabled={oauthLoading.github}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-70"
          >
            {oauthLoading.github ? (
              'Signing up...'
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </>
            )}
          </button>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or register with email</span>
          </div>
        </div>

        {/* Email registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password (6+ characters)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="customer">Customer</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}