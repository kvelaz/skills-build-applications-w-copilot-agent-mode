import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p className="text-muted">Loading teams…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <ul className="list-group">
          {teams.map((team) => (
            <li key={team.id || team._id || team.name} className="list-group-item">
              <div className="fw-semibold">{team.name}</div>
              <div className="text-muted small">{team.focus || 'Fitness'} • {team.members || 0} members</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
