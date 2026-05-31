import { useState, useEffect } from 'react'
import api from '../api'

export default function Admin() {
  const [passes, setPasses] = useState([])
  const [globalCapacity, setGlobalCapacity] = useState(40)

  const fetchSettings = async () => {
    try {
      const res = await api.get('/api/settings')
      if (res.data) setGlobalCapacity(res.data.globalCapacity)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPasses = async () => {
    try {
      const res = await api.get('/api/passes')
      setPasses(res.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPasses()
    fetchSettings()
  }, [])

  const updateCapacity = async (newCapacity) => {
    try {
      await api.post('/api/settings', { globalCapacity: newCapacity })
      setGlobalCapacity(newCapacity)
      alert("Capacity updated safely!")
    } catch (err) {
      console.error(err)
      alert("Failed to update capacity.")
    }
  }

  const handleApprove = async (id) => {
    try {
      await api.patch(`/api/passes/${id}/status`, { status: 'Active' })
      fetchPasses()
    } catch (err) {
      console.error(err)
      alert("Error approving pass")
    }
  }

  const handleReject = async (id) => {
    try {
      await api.patch(`/api/passes/${id}/status`, { status: 'Rejected' })
      fetchPasses()
    } catch (err) {
      console.error(err)
      alert("Error rejecting pass")
    }
  }

  return (
    <div className="glass-card" style={{ maxWidth: '800px' }}>
      <h2 className="title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Admin Dashboard</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
        <h3>Recent Pass Applications</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <label style={{ fontSize: '0.9rem', color: '#94a3b8', marginRight: '0.5rem' }}>Global Bus Capacity:</label>
            <input 
              type="number" 
              value={globalCapacity} 
              onChange={(e) => setGlobalCapacity(Number(e.target.value))}
              onBlur={() => updateCapacity(globalCapacity)}
              style={{ width: '60px', background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1rem' }} 
            />
          </div>
          <button onClick={fetchPasses} className="btn" style={{ width: 'auto', padding: '0.5rem 1.5rem' }}>Refresh</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: '#94a3b8' }}>
              <th style={{ padding: '1rem' }}>User Name</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Route</th>
              <th style={{ padding: '1rem' }}>Tickets Left</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passes.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  No bus pass requests available.
                </td>
              </tr>
            ) : passes.map(pass => {
              const bookedOnRoute = passes.filter(p => p.status === 'Active' && p.toLocation === pass.toLocation && p.date === pass.date).length;
              const ticketsLeft = globalCapacity - bookedOnRoute;

              return (
              <tr key={pass._id || pass.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{pass.user}</td>
                <td style={{ padding: '1rem' }}>{pass.date || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{pass.fromLocation} &rarr; {pass.toLocation}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ color: ticketsLeft > 0 ? '#4ade80' : '#f87171', fontWeight: 'bold' }}>
                    {ticketsLeft} / {globalCapacity}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '99px', 
                    fontSize: '0.85rem',
                    background: pass.status === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 
                               pass.status === 'Pending' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: pass.status === 'Active' ? '#4ade80' : 
                           pass.status === 'Pending' ? '#facc15' : '#f87171'
                  }}>
                    {pass.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  {pass.status === 'Pending' && (
                    <>
                      <button onClick={() => handleApprove(pass._id || pass.id)} style={{ 
                        background: 'var(--primary-color)', color: 'white', border: 'none', 
                        borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer' 
                      }}>Approve</button>
                      <button onClick={() => handleReject(pass._id || pass.id)} style={{ 
                        background: 'transparent', color: '#f87171', border: '1px solid #f87171', 
                        borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer' 
                      }}>Reject</button>
                    </>
                  )}
                  {pass.status !== 'Pending' && (
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No action required</span>
                  )}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}
