import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [loginType, setLoginType] = useState('user')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (loginType === 'admin') {
      if (identifier === 'admin' && password === '12345admin') {
        localStorage.setItem('token', 'admin-token')
        localStorage.setItem('role', 'admin')
        navigate('/admin')
      } else {
        setError('Incorrect username or password')
      }
    } else {
      const email = identifier.trim().toLowerCase();
      const emailRegex = /^[a-z0-9._%+-]+[0-9]+@([a-z0-9.-]+\.)?sjcetpalai\.ac\.in$/;
      if (!emailRegex.test(email)) {
        setError('Incorrect email');
        return;
      }
      localStorage.setItem('token', 'user-token')
      localStorage.setItem('role', 'user')
      navigate('/book')
    }
  }

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => { setLoginType('user'); setIdentifier(''); setPassword(''); setError(''); }}
          style={{ flex: 1, background: 'transparent', border: 'none', color: loginType === 'user' ? 'var(--primary-color)' : '#94a3b8', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', borderBottom: loginType === 'user' ? '2px solid var(--primary-color)' : 'none', paddingBottom: '0.5rem' }}
        >
          User Login
        </button>
        <button 
          onClick={() => { setLoginType('admin'); setIdentifier(''); setPassword(''); setError(''); }}
          style={{ flex: 1, background: 'transparent', border: 'none', color: loginType === 'admin' ? 'var(--primary-color)' : '#94a3b8', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', borderBottom: loginType === 'admin' ? '2px solid var(--primary-color)' : 'none', paddingBottom: '0.5rem' }}
        >
          Admin Login
        </button>
      </div>

      <h2 className="title" style={{ fontSize: '1.5rem' }}>{loginType === 'user' ? 'Welcome Back!' : 'Administrator Access'}</h2>
      
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="identifier">{loginType === 'user' ? 'Email Address' : 'Admin Username'}</label>
          <input 
            type={loginType === 'user' ? 'email' : 'text'} 
            id="identifier" 
            value={identifier}
            onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
            placeholder={loginType === 'user' ? 'Enter your email' : 'Enter username'} 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Enter your password" 
            required 
          />
        </div>
        {error && (
          <div style={{ 
            color: '#f87171', 
            background: 'rgba(239, 68, 68, 0.1)', 
            padding: '0.75rem 1rem', 
            borderRadius: '8px', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            fontSize: '0.9rem', 
            marginBottom: '1.25rem',
            textAlign: 'left',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  )
}
