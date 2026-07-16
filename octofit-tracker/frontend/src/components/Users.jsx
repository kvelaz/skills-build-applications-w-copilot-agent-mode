import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p className="text-muted">Loading users…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id || user._id || user.email} className="list-group-item">
              <div className="fw-semibold">{user.name || user.email}</div>
              <div className="text-muted small">{user.role || 'Member'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
