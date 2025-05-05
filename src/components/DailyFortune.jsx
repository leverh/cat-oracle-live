import React, { useEffect, useState } from 'react';
import styles from '../styles/mystical-theme.module.css';
import { getDailyFortune } from '../utils/getDailyFortune';

export default function DailyFortune() {
  const [fortune, setFortune] = useState('');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const todayFortune = getDailyFortune();
    setFortune(todayFortune);
  }, []);

  const revealFortune = () => {
    setRevealed(!revealed);
  };

  return (
    <div className={styles.dailyFortune}>
      <h2>✨ Daily Prophecy ✨</h2>
      {!revealed ? (
        <button 
          onClick={revealFortune}
          className={styles.askButton}
          style={{ marginTop: '1rem', padding: '1rem 2rem', fontSize: '1.6rem' }}
        >
          Reveal Daily Fortune
        </button>
      ) : (
        <p 
          style={{ 
            fontSize: '1.8rem', 
            animation: `${styles.fortuneReveal} 1s ease-out`,
            padding: '1rem 0'
          }}
        >
          {fortune}
        </p>
      )}
    </div>
  );
}