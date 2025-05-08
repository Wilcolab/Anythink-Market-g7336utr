import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouterList from './components/RouterList';
import RouterDetails from './components/reouterDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1 className="App-title">DriveNets Dashboard</h1>
          </div>
        </header>
        <main className="App-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<RouterList />} />
              <Route path="/routers/:routerId" element={<RouterDetails />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
