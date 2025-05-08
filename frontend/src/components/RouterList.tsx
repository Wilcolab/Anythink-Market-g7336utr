import React, { useEffect, useState } from 'react';
import { Router } from '../types/router';
import { Link } from 'react-router-dom';

const RouterList: React.FC = () => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [filteredRouters, setFilteredRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [typeFilter, setTypeFilter] = useState<'All' | 'WiFi' | 'Enterprise' | 'Home'>('All');
  const [sortKey, setSortKey] = useState<'name' | 'updatedAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchRouters = async () => {
      try {
        const res = await fetch('/routers');
        const data = await res.json();
        setRouters(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchRouters();
  }, []);

  useEffect(() => {
    let filtered = [...routers];

    if (typeFilter !== 'All') {
      filtered = filtered.filter((r) => r.type === typeFilter);
    }

    filtered.sort((a, b) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc'
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    setFilteredRouters(filtered);
  }, [routers, typeFilter, sortKey, sortOrder]);

  if (loading) return <p className="text-gray-500">Loading routers...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Routers</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Filter by Type</label>
          <select
            className="border rounded px-3 py-1"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="All">All</option>
            <option value="WiFi">WiFi</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Sort by</label>
          <select
            className="border rounded px-3 py-1"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
          >
            <option value="name">Name</option>
            <option value="updatedAt">Last Update</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Order</label>
          <select
            className="border rounded px-3 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* List */}
      <ul className="divide-y border rounded overflow-hidden">
        {filteredRouters.map((router) => (
          <li key={router.id} className="p-4 hover:bg-gray-50 transition">
            <Link to={`/routers/${router.id}`} className="block">
              <div className="font-semibold text-lg">{router.name}</div>
              <div className="text-sm text-gray-600">
                {router.type} – Updated: {new Date(router.updatedAt).toLocaleString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filteredRouters.length === 0 && (
        <p className="text-gray-500 italic">No routers match your criteria.</p>
      )}
    </div>
  );
};

export default RouterList;
