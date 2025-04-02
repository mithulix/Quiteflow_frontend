import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { authService } from '../services/authService'

export default function OAuthCallback() {
  const router = useRouter()

  useEffect(() => {
    authService.handleOAuthCallback()
      .then(({ data }) => {
        if (data?.session) {
          router.push('/dashboard') // Redirect after success
        }
      })
  }, [])

  return <div>Loading...</div>
}