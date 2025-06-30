
import React, { useEffect, useState } from 'react';
import './HeroGrid.css';

const DraftPicker = () => {
  const [heroes, setHeroes] = useState([]);
  const [userHero, setUserHero] = useState(null);
  const [allyHeroes, setAllyHeroes] = useState([]);
  const [enemyHeroes, setEnemyHeroes] = useState([]);
  const [build, setBuild] = useState(null);

  useEffect(() => {
    fetch('https://api.opendota.com/api/heroStats')
      .then(res => res.json())
      .then(data => setHeroes(data));
  }, []);

  const handleSelectHero = (hero) => {
    const allSelected = [userHero, ...allyHeroes, ...enemyHeroes].map(h => h?.id);
    if (allSelected.includes(hero.id)) return;

    if (!userHero) setUserHero(hero);
    else if (allyHeroes.length < 4) setAllyHeroes([...allyHeroes, hero]);
    else if (enemyHeroes.length < 5) setEnemyHeroes([...enemyHeroes, hero]);
  };

  const resetDraft = () => {
    setUserHero(null);
    setAllyHeroes([]);
    setEnemyHeroes([]);
    setBuild(null);
  };

  const getBuild = () => {
    if (!userHero || allyHeroes.length < 4 || enemyHeroes.length < 5) {
      alert("Complete the draft first.");
      return;
    }

    const teamIds = [userHero, ...allyHeroes].map(h => h.id);
    const enemyIds = enemyHeroes.map(h => h.id);

    fetch(`https://dota2-ai-backend.onrender.com/buildsuggestion?yourHero=${userHero.id}&team=${teamIds.join(',')}&enemies=${enemyIds.join(',')}`)
      .then(res => res.json())
      .then(data => setBuild(data));
  };

  return (
    <div>
      <div className="hero-grid">
        {heroes.map(hero => (
          <div
            key={hero.id}
            className="hero-card"
            onClick={() => handleSelectHero(hero)}
            style={{
              borderColor:
                userHero?.id === hero.id ? '#00f' :
                allyHeroes.find(h => h.id === hero.id) ? '#0f0' :
                enemyHeroes.find(h => h.id === hero.id) ? '#f00' : '#333'
            }}
          >
            <img
              src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
              alt={hero.localized_name}
              className="hero-img"
            />
            <div className="hero-name">{hero.localized_name}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={getBuild}>Suggest Build</button>
        <button onClick={resetDraft} style={{ marginLeft: '10px' }}>Reset Draft</button>
      </div>

      {build && (
        <div style={{ padding: '20px', background: '#222', marginTop: '20px' }}>
          <h3>Suggested Build for {userHero.localized_name}</h3>
          <p><strong>Starting:</strong> {build.starting_items?.join(', ')}</p>
          <p><strong>Early:</strong> {build.early_items?.join(', ')}</p>
          <p><strong>Mid:</strong> {build.mid_items?.join(', ')}</p>
          <p><strong>Lategame:</strong> {build.late_items?.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default DraftPicker;
