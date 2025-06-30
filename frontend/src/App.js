import React from 'react';
import HeroGrid from './components/HeroGrid';

function App() {
  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Dota 2 AI Companion</h1>
      <HeroGrid />
    </div>
  );
}

export default App;
