import React from 'react';
import './App.css';
import RouterList from './components/RouterList'; // Make sure the path matches your folder structure

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="App-title">DriveNets Dashboard</h1>
        </div>
      </header>
      <main className="App-main">
        <div className="container">
          {/* Replace the placeholder with actual content */}
          <RouterList />
        </div>
      </main>
    </div>
  );
}

export default App;
