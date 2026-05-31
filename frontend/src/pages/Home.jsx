import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [date, setDate] = useState('')
  const [fromLocation] = useState('SJCET PALAI')
  const [toLocation, setToLocation] = useState('')

  const handleBookPass = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/passes', {
        user: userName,
        date,
        fromLocation,
        toLocation
      });
      navigate('/status');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        navigate('/full');
      } else {
        alert('Failed to book pass. Ensure backend is running.');
      }
    }
  }
  return (
    <div className="hero">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
          <h1>Smart Bus Pass Booking</h1>
          <p>Seamlessly manage your daily commute with our digital bus pass system. Fast, secure, and purely digital.</p>
          <a href="#booking-section" className="btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '0.75rem 2rem' }}>
            Book Your Pass
          </a>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <img src="/hero.png" alt="Digital Bus Pass" style={{ 
            maxWidth: '100%', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            animation: 'fadeIn 1s ease-out'
          }} />
        </div>
      </div>
      
      <div className="services-grid" style={{ marginTop: '5rem' }}>
        <div className="service-card">
          <h3>Instant Booking</h3>
          <p>Get your digital pass in seconds. No waiting in lines.</p>
        </div>
        <div className="service-card">
          <h3>Secure Payments</h3>
          <p>We use industry-standard encryption to protect your data.</p>
        </div>
        <div className="service-card">
          <h3>Admin Dashboard</h3>
          <p>Powerful tools for administrators to manage passes and users.</p>
        </div>
      </div>
      <div id="booking-section" className="glass-card" style={{ marginTop: '5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 className="title" style={{ marginBottom: '1.5rem' }}>Book Your Pass Now</h2>
        <form onSubmit={handleBookPass}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" required value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label>Travel Date</label>
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>From Location</label>
              <input type="text" readOnly value={fromLocation} style={{ opacity: 0.6, cursor: 'not-allowed', color: '#cbd5e1' }} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>To Location</label>
              <input type="text" required value={toLocation} onChange={e => setToLocation(e.target.value)} placeholder="e.g. Uptown" />
            </div>
          </div>
          
          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Submit Booking</button>
        </form>
      </div>

    </div>
  )
}
