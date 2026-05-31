import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [loginType, setLoginType] = useState('user')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (loginType === 'admin') {
      if (identifier === 'admin' && password === '12345admin') {
        localStorage.setItem('token', 'admin-token')
        localStorage.setItem('role', 'admin')
        navigate('/admin')
      } else {
        alert('Invalid admin credentials!')
      }
    } else {
      const email = identifier.trim().toLowerCase();
      if (!email.endsWith('@sjcetpalai.ac.in')) {
        alert('Access denied! Only email addresses ending with @sjcetpalai.ac.in are allowed to log in.');
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
          onClick={() => { setLoginType('user'); setIdentifier(''); setPassword(''); }}
          style={{ flex: 1, background: 'transparent', border: 'none', color: loginType === 'user' ? 'var(--primary-color)' : '#94a3b8', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', borderBottom: loginType === 'user' ? '2px solid var(--primary-color)' : 'none', paddingBottom: '0.5rem' }}
        >
          User Login
        </button>
        <button 
          onClick={() => { setLoginType('admin'); setIdentifier(''); setPassword(''); }}
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
            onChange={(e) => setIdentifier(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  )
}
