import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p className="text-muted">Loading activities…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity.id || activity._id || activity.type} className="list-group-item">
              <div className="fw-semibold">{activity.type}</div>
              <div className="text-muted small">{activity.duration} min • {activity.distance} mi</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
