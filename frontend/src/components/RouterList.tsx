// src/components/RouterList.tsx
import React, { useEffect, useState } from 'react';

type Router = {
  id: string;
  name: string;
  type: 'WiFi' | 'Enterprise' | 'Home';
  updatedAt: string;
};

const RouterList: React.FC = () => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRouters = async () => {
      try {
        const response = await fetch('/routers');
        if (!response.ok) {
          throw new Error('Failed to fetch routers');
        }
        const data = await response.json();
        setRouters(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRouters();
  }, []);

  if (loading) return <div>Loading routers...</div>;
  if (error) return <div>Error: {error}</div>;

  
  return (
    <div>
      <h2>Router List</h2>
      <ul>
        {routers.map((router) => (
          <li key={router.id} style={{ marginBottom: '1rem' }}>
            <strong>Name:</strong> {router.name}<br />
            <strong>Type:</strong> {router.type}<br />
            <strong>Last Updated:</strong>{' '}
            {new Date(router.updatedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouterList;
