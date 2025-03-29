import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { useAuth } from '../../contexts/AuthContext'

export default function RequestForm() {
  const { user } = useAuth()
  const { createRequest } = useMarketplace()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'home',
    budget: '',
    deadline: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description) {
      return setError('Title and description are required')
    }

    try {
      setLoading(true)
      setError('')
      await createRequest({
        ...formData,
        user_id: user.id,
        status: 'active',
        budget: parseFloat(formData.budget) || null,
        deadline: formData.deadline || null
      })
      navigate('/customer/dashboard')
    } catch (err) {
      setError('Failed to create request: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'home', label: 'Home Services' },
    { value: 'tech', label: 'Tech Support' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Request</h2>
      {error && <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-md">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title*</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="What do you need?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description*</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="Provide details about what you need..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/customer/dashboard')}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  )
}