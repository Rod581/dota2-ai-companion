
import React from 'react';
import DragDraftPicker from './components/DragDraftPicker';

function App() {
  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Dota 2 AI Companion - Draft Picker</h1>
      <DragDraftPicker />
    </div>
  );
}

export default App;
