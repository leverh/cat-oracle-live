import React, { useState, useEffect } from 'react';
import styles from './DailyFortune.module.css';

const dailyFortunes = [
  "Today is a perfect day to embrace new challenges.",
  "The stars align in your favor for creative endeavors.",
  "Don't be afraid to speak your truth today.",
  "Someone unexpected will bring you joy.",
  "Trust your intuition more than usual today.",
  "A small act of kindness will have far-reaching effects.",
  "It's a good day to let go of what no longer serves you.",
  "Your patience will be rewarded in unexpected ways.",
  "Pay attention to recurring symbols or numbers today.",
  "A solution to a long-standing problem is within reach."
];

const DailyFortune = () => {
  const [fortune, setFortune] = useState('');
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    const fortuneIndex = Math.abs(hash) % dailyFortunes.length;
    setFortune(dailyFortunes[fortuneIndex]);
    
    const randomStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 1.5}px`,
      delay: `${Math.random() * 2}s`
    }));
    
    setStars(randomStars);
  }, []);

  return (
    <div className={styles.dailyFortune}>
      <div className={styles.container}>
        <h2 className={styles.title}>Today's Cosmic Insight</h2>
        <div className={styles.content}>{fortune}</div>
      </div>
      
      <div className={styles.stars}>
        {stars.map(star => (
          <div
            key={star.id}
            className={styles.star}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyFortune;