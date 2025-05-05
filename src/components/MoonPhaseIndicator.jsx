import React, { useEffect, useState } from 'react';
import styles from '../styles/mystical-theme.module.css';
import { getMoonPhase } from '../utils/getMoonPhase';

export default function MoonPhaseIndicator() {
  const [phase, setPhase] = useState('');
  const [emoji, setEmoji] = useState('🌙');

  useEffect(() => {
    const current = getMoonPhase();
    setPhase(current);
    
    const emojiMap = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'First Quarter': '🌓',
      'Waxing Gibbous': '🌔',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖',
      'Last Quarter': '🌗',
      'Waning Crescent': '🌘'
    };
    
    setEmoji(emojiMap[current] || '🌙');
  }, []);

  return (
    <div className={styles.moonPhase}>
      <p>
        <span className={styles.moonEmoji}>{emoji}</span>
        <strong>{phase}</strong>
      </p>
    </div>
  );
}