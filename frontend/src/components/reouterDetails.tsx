
import React, { useEffect, useState } from 'react';
import { Router } from '../types/router';
import { useParams } from 'react-router-dom';

type Props = {
  routerId: string;
};

const RouterDetails: React.FC = () => {
    const { routerId } = useParams();
  
    if (!routerId) return <p>Router ID not found</p>;
  const [router, setRouter] = useState<Router | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRouter = async () => {
      try {
        const response = await fetch(`/routers/${routerId}`);
        if (!response.ok) throw new Error('Failed to fetch router details');
        const data: Router = await response.json();
        setRouter(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRouter();
  }, [routerId]);

  if (loading) return <p>Loading router details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!router) return <p>No router found.</p>;

  return (
    <div>
      <h2>Router Details</h2>
      <p><strong>Name:</strong> {router.name}</p>
      <p><strong>Type:</strong> {router.type}</p>
      <p><strong>Last Updated:</strong> {new Date(router.updatedAt).toLocaleString()}</p>

      {router.type === 'WiFi' && (
        <>
          <p><strong>SSID:</strong> {router.ssid}</p>
          <p><strong>Band:</strong> {router.band}</p>
        </>
      )}

      {router.type === 'Enterprise' && (
        <>
          <p><strong>Rack Location:</strong> {router.rackLocation}</p>
          <p><strong>Firmware Version:</strong> {router.firmwareVersion}</p>
        </>
      )}

      {router.type === 'Home' && (
        <>
          <p><strong>IP Address:</strong> {router.ipAddress}</p>
          <p><strong>Connected Devices:</strong> {router.connectedDevices}</p>
        </>
      )}
    </div>
  );
};

export default RouterDetails;
