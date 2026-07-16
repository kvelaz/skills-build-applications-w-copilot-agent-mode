import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' }
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiHint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/...`
    : 'http://localhost:8000/api/...'

  return (
    <main className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <p className="text-uppercase text-primary fw-bold mb-2">OctoFit Tracker</p>
          <h1 className="display-6 fw-bold mb-2">Modern multi-tier fitness tracking</h1>
          <p className="text-muted mb-3">
            This presentation tier uses React Router and environment-aware API URLs for the Express backend.
          </p>
          <p className="small text-muted mb-0">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to target Codespaces URLs. Without it, the app falls back to localhost.
          </p>
          <div className="mt-3">
            <span className="badge bg-secondary">API hint: {apiHint}</span>
          </div>
        </div>
      </div>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<div className="row g-4"><div className="col-lg-6"><Users /></div><div className="col-lg-6"><Teams /></div></div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  )
}

export default App
