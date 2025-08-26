import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ id: '', password: '' })
  const navigate = useNavigate() 

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your authentication logic here
    // For demo purposes, using simple credentials
    if (credentials.id === import.meta.env.VITE_ADMIN_ID && credentials.password === import.meta.env.VITE_ADMIN_PASS) {
      localStorage.setItem('adminAuth', 'true')
      navigate('/admin/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Admin ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={credentials.id}
              onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}