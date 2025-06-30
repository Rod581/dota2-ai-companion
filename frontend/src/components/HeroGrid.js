import React, { useEffect, useState } from 'react';
import './HeroGrid.css';

const HeroGrid = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch('https://api.opendota.com/api/heroStats')
      .then(res => res.json())
      .then(data => setHeroes(data));
  }, []);

  return (
    <div>
      <h2>Select Your Hero</h2>
      <div className="hero-grid">
        {heroes.map(hero => (
          <div key={hero.id} className="hero-card">
            <img
              src={`https://cdn.cloudflare.steamstatic.com${hero.img}`}
              alt={hero.localized_name}
              className="hero-img"
            />
            <div className="hero-name">{hero.localized_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroGrid;
