import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Query the users collection for the provided username
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('username', '==', username))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError('User not found')
        setLoading(false)
        return
      }

      // Check if password matches
      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()

      // Remove whitespace from both input and stored password for robustness
      if (userData.password.trim() === password.trim()) {
        // Store user info in localStorage for session management
        localStorage.setItem('user', JSON.stringify({
          id: userDoc.id,
          username: userData.username,
          name: userData.name
        }))
        window.location.reload(); // Force reload for instant redirect
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('Login error:', err)
    }

    setLoading(false)
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username:</span>
          <input 
            type="text" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </label>
        
        <label>
          <span>Password:</span>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
} 