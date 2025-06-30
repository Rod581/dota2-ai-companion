
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Draft.css';

const DragDraftPicker = () => {
  const [heroes, setHeroes] = useState([]);
  const [userPick, setUserPick] = useState([]);
  const [allies, setAllies] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [build, setBuild] = useState(null);

  useEffect(() => {
    fetch('https://api.opendota.com/api/heroStats')
      .then(res => res.json())
      .then(data => setHeroes(data));
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const hero = heroes.find(h => h.id.toString() === draggableId);
    if (!hero) return;

    const allIds = [...userPick, ...allies, ...enemies].map(h => h?.id);
    if (allIds.includes(hero.id)) return;

    if (destination.droppableId === 'user' && userPick.length < 1) {
      setUserPick([hero]);
    } else if (destination.droppableId === 'allies' && allies.length < 4) {
      setAllies([...allies, hero]);
    } else if (destination.droppableId === 'enemies' && enemies.length < 5) {
      setEnemies([...enemies, hero]);
    }
  };

  const resetDraft = () => {
    setUserPick([]);
    setAllies([]);
    setEnemies([]);
    setBuild(null);
  };

  const getBuild = () => {
    if (userPick.length !== 1 || allies.length < 4 || enemies.length < 5) {
      alert('Complete the draft (1 user, 4 allies, 5 enemies)');
      return;
    }

    const teamIds = [userPick[0], ...allies].map(h => h.id);
    const enemyIds = enemies.map(h => h.id);

    fetch(`https://dota2-ai-backend.onrender.com/buildsuggestion?yourHero=${userPick[0].id}&team=${teamIds.join(',')}&enemies=${enemyIds.join(',')}`)
      .then(res => res.json())
      .then(data => setBuild(data));
  };

  return (
    <div style={{ padding: '10px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="draft-zones">
          <Droppable droppableId="user" direction="horizontal">
            {(provided) => (
              <div className="draft-slot user-slot" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Your Pick</h3>
                {userPick.map((hero, idx) => (
                  <div className="hero-card" key={hero.id}>
                    <img src={\`https://cdn.cloudflare.steamstatic.com\${hero.img}\`} alt={hero.localized_name} />
                    <span>{hero.localized_name}</span>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="allies" direction="horizontal">
            {(provided) => (
              <div className="draft-slot ally-slot" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Allies</h3>
                {allies.map((hero, idx) => (
                  <div className="hero-card" key={hero.id}>
                    <img src={\`https://cdn.cloudflare.steamstatic.com\${hero.img}\`} alt={hero.localized_name} />
                    <span>{hero.localized_name}</span>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="enemies" direction="horizontal">
            {(provided) => (
              <div className="draft-slot enemy-slot" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Enemies</h3>
                {enemies.map((hero, idx) => (
                  <div className="hero-card" key={hero.id}>
                    <img src={\`https://cdn.cloudflare.steamstatic.com\${hero.img}\`} alt={hero.localized_name} />
                    <span>{hero.localized_name}</span>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <h2 style={{ paddingTop: '10px' }}>Available Heroes</h2>
        <Droppable droppableId="heroes" direction="horizontal">
          {(provided) => (
            <div className="hero-pool" ref={provided.innerRef} {...provided.droppableProps}>
              {heroes.map((hero, index) => (
                <Draggable key={hero.id.toString()} draggableId={hero.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="hero-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={\`https://cdn.cloudflare.steamstatic.com\${hero.img}\`} alt={hero.localized_name} />
                      <span>{hero.localized_name}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={getBuild}>Suggest Build</button>
        <button onClick={resetDraft} style={{ marginLeft: '10px' }}>Reset Draft</button>
      </div>

      {build && (
        <div style={{ backgroundColor: '#222', padding: '20px', marginTop: '20px' }}>
          <h3>Build Suggestion for {userPick[0].localized_name}</h3>
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
