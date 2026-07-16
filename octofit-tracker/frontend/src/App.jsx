import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-bold mb-2">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern multi-tier fitness tracking</h1>
              <p className="lead text-muted mb-4">
                Track activity, manage teams, and stay motivated with a polished React experience backed by an Express API.
              </p>
              <div className="d-flex gap-3">
                <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
                  Check API health
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
                  Vite docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
