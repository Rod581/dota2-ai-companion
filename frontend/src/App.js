
import React from 'react';
import DragDraftPicker from './components/DragDraftPicker';

function App() {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Dota 2 AI Companion</h1>
      <DragDraftPicker />
    </div>
  );
}

export default App;
