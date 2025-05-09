import React, { useState, useEffect } from 'react';
import styles from './CursorEffect.module.css';

const CursorEffect = () => {
  const [stars, setStars] = useState([]);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.85) { 
        const newStar = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY
        };
        
        setStars(prevStars => [...prevStars, newStar]);
        
        setTimeout(() => {
          setStars(prevStars => prevStars.filter(star => star.id !== newStar.id));
        }, 1000);
      }
      
      // Create trail
      if (e.type === 'click') {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 50 + Math.random() * 100;
        
        const newTrail = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          angle,
          distance
        };
        
        setTrails(prevTrails => [...prevTrails, newTrail]);
        
        // Remove the trail
        setTimeout(() => {
          setTrails(prevTrails => prevTrails.filter(trail => trail.id !== newTrail.id));
        }, 1000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseMove);
    };
  }, []);

  return (
    <>
      {stars.map(star => (
        <div
          key={star.id}
          className={styles.cursorStar}
          style={{ 
            left: `${star.x}px`, 
            top: `${star.y}px` 
          }}
        />
      ))}
      
      {trails.map(trail => (
        <div
          key={trail.id}
          className={styles.cursorTrail}
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            width: `${trail.distance}px`,
            transform: `rotate(${trail.angle}rad)`
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;