import React, { useEffect, useState } from 'react';
import styles from '../styles/mystical-theme.module.css';
import { getMoonPhase } from '../utils/getMoonPhase';

export default function MoonPhaseIndicator() {
  const [phase, setPhase] = useState('');
  const [emoji, setEmoji] = useState('🌙');
  const [phaseColor, setPhaseColor] = useState('#ffffff');
  const [isExpanded, setIsExpanded] = useState(false);

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
    
    // Set colors based on moon phase
    const colorMap = {
      'New Moon': '#2c2c54',
      'Waxing Crescent': '#474787',
      'First Quarter': '#706fd3',
      'Waxing Gibbous': '#a6abff',
      'Full Moon': '#f7f7ff',
      'Waning Gibbous': '#a6abff',
      'Last Quarter': '#706fd3',
      'Waning Crescent': '#474787'
    };
   
    setEmoji(emojiMap[current] || '🌙');
    setPhaseColor(colorMap[current] || '#ffffff');
  }, []);
  
  // Toggle expanded view - use click instead of hover
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Get mystical meaning based on phase
  const getMysticalMeaning = () => {
    const meaningMap = {
      'New Moon': "Time to find your favorite napping spot and dream of what's to come. New beginnings unfold gently.",
      'Waxing Crescent': "Like stretching after a lovely nap, your intentions begin to take shape. Purrs of possibility.",
      'First Quarter': "Time to bask in sunbeams of opportunity. Step with gentle paws toward what brings joy.",
      'Waxing Gibbous': "Settle into your favorite blanket and groom your intentions with care. Completion approaches.",
      'Full Moon': "Perfect clarity, like a warm sunbeam through your favorite window. Everything is illuminated.",
      'Waning Gibbous': "Share your warmth and gentle nudges with others. A nose-lick of wisdom for those you love.",
      'Last Quarter': "Gently release what no longer serves, like shedding winter fur. Let go with a contented purr.",
      'Waning Crescent': "Curl up in peaceful reflection. Rest and recharge before the next sunbeam calls."
    };
    
    return meaningMap[phase] || 'The moon influences your cosmic destiny';
  };

  return (
    <div 
      className={`${styles.moonPhase} ${isExpanded ? styles.moonPhaseExpanded : ''}`}
      onClick={toggleExpand}
    >
      <div className={styles.moonPhaseMain}>
        <span 
          className={styles.moonEmoji}
          style={{ textShadow: `0 0 20px ${phaseColor}` }}
        >
          {emoji}
        </span>
        <strong className={styles.phaseName}>{phase}</strong>
      </div>
      
      {isExpanded && (
        <div className={styles.moonPhaseInfo}>
          <p className={styles.moonMysticalMeaning}>
            {getMysticalMeaning()}
          </p>
          <div className={styles.moonPhaseInfluence}>
            <span className={styles.influenceLabel}>Cosmic influence:</span>
            <div 
              className={styles.influenceMeter} 
              style={{ 
                background: `linear-gradient(90deg, ${phaseColor} 0%, transparent 100%)`,
                opacity: phase === 'Full Moon' ? 1 : phase === 'New Moon' ? 0.3 : 0.7
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}