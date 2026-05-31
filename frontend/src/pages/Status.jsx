import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function Status() {
  return (
    <div className="glass-card" style={{ maxWidth: '500px', textAlign: 'center', marginTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ 
          background: 'rgba(34, 197, 94, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '50%',
          display: 'inline-block'
        }}>
          <CheckCircle size={64} color="#4ade80" />
        </div>
      </div>
      
      <h2 className="title" style={{ marginBottom: '1rem', color: '#f8fafc' }}>
        Pass Submitted Successfully!
      </h2>
      
      <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
        Your bus pass application is currently <span style={{ color: '#facc15', fontWeight: 'bold' }}>under validation</span>. 
        Please wait for an administrator to review and accept your details.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/book" className="btn" style={{ textDecoration: 'none', background: 'rgba(255, 255, 255, 0.1)' }}>
          Submit Another Pass
        </Link>
      </div>
    </div>
  )
}
