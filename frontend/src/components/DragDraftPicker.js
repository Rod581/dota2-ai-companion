
import React, { useEffect, useState } from 'react';
import './Draft.css';

const DragDraftPicker = () => {
  const [heroes, setHeroes] = useState([]);
  const [userPick, setUserPick] = useState(null);
  const [allies, setAllies] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [build, setBuild] = useState(null);

  useEffect(() => {
    fetch('https://api.opendota.com/api/heroStats')
      .then(res => res.json())
      .then(data => setHeroes(data));
  }, []);

  const selectHero = (hero) => {
    const all = [userPick?.id, ...allies.map(h => h.id), ...enemies.map(h => h.id)];
    if (all.includes(hero.id)) return;

    if (!userPick) {
      setUserPick(hero);
    } else if (allies.length < 4) {
      setAllies([...allies, hero]);
    } else if (enemies.length < 5) {
      setEnemies([...enemies, hero]);
    }
  };

  const resetDraft = () => {
    setUserPick(null);
    setAllies([]);
    setEnemies([]);
    setBuild(null);
  };

  const suggestBuild = () => {
    if (!userPick || allies.length < 4 || enemies.length < 5) {
      alert('Complete the draft (1 user, 4 allies, 5 enemies)');
      return;
    }

    const teamIds = [userPick.id, ...allies.map(h => h.id)];
    const enemyIds = enemies.map(h => h.id);

    fetch(`https://dota2-backend-suggestion.onrender.com/buildsuggestion?yourHero=${userPick.id}&team=${teamIds.join(',')}&enemies=${enemyIds.join(',')}`)
      .then(res => res.json())
      .then(data => setBuild(data));
  };

  const renderHero = (hero, onClick) => (
    <div className="hero-card" key={hero.id} onClick={() => onClick(hero)}>
      <img src={"https://cdn.cloudflare.steamstatic.com" + hero.img} alt={hero.localized_name} />
      <span>{hero.localized_name}</span>
    </div>
  );

  return (
    <div>
      <div className="draft-zone">
        <div className="draft-section">
          <h3>Your Pick</h3>
          {userPick && renderHero(userPick, () => {})}
        </div>
        <div className="draft-section">
          <h3>Allies</h3>
          {allies.map(h => renderHero(h, () => {}))}
        </div>
        <div className="draft-section">
          <h3>Enemies</h3>
          {enemies.map(h => renderHero(h, () => {}))}
        </div>
      </div>

      <div className="hero-pool">
        {heroes.map(h => renderHero(h, selectHero))}
      </div>

      <div className="draft-actions">
        <button onClick={suggestBuild}>Suggest Build</button>
        <button onClick={resetDraft}>Reset</button>
      </div>

      {build && (
        <div className="build-section">
          <h3>Build Suggestion for {userPick.localized_name}</h3>
          <p><strong>Starting:</strong> {build.starting_items?.join(', ')}</p>
          <p><strong>Early:</strong> {build.early_items?.join(', ')}</p>
          <p><strong>Mid:</strong> {build.mid_items?.join(', ')}</p>
          <p><strong>Lategame:</strong> {build.late_items?.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default DragDraftPicker;
