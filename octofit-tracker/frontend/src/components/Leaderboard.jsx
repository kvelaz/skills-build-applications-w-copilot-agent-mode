import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setScores(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p className="text-muted">Loading leaderboard…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <ul className="list-group">
          {scores.map((entry) => (
            <li key={entry.id || entry._id || entry.userId} className="list-group-item d-flex justify-content-between align-items-center">
              <span>#{entry.rank || 1} • {entry.userId}</span>
              <span className="badge bg-primary rounded-pill">{entry.points || 0} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
