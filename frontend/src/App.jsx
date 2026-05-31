import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Status from './pages/Status'
import FullCapacity from './pages/FullCapacity'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  if (location.pathname === '/') return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="glass-nav">
      <div className="nav-brand">
        <h2>BusPass</h2>
      </div>
      <div className="nav-links" style={{ alignItems: 'center' }}>
        {role === 'user' && <Link className="nav-link" to="/book">Book Pass</Link>}
        {role === 'admin' && <Link className="nav-link" to="/admin">Admin Panel</Link>}
        <button onClick={handleLogout} style={{ background: 'transparent', color: '#f87171', border: '1px solid #f87171', borderRadius: '4px', padding: '0.4rem 1rem', cursor: 'pointer', marginLeft: '1rem' }}>Logout</button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/book" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />
            <Route path="/full" element={<ProtectedRoute><FullCapacity /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
