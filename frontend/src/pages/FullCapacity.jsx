import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'

export default function FullCapacity() {
  return (
    <div className="glass-card" style={{ maxWidth: '500px', textAlign: 'center', marginTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '50%',
          display: 'inline-block'
        }}>
          <XCircle size={64} color="#f87171" />
        </div>
      </div>
      
      <h2 className="title" style={{ marginBottom: '1rem', color: '#f8fafc' }}>
        Route Fully Booked!
      </h2>
      
      <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
        We are sorry, but there are <span style={{ color: '#f87171', fontWeight: 'bold' }}>0 seats remaining</span> for this specific route on this date. 
        Please go back and select a different date or destination.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/book" className="btn" style={{ textDecoration: 'none', background: 'rgba(255, 255, 255, 0.1)' }}>
          Try Another Booking
        </Link>
      </div>
    </div>
  )
}
