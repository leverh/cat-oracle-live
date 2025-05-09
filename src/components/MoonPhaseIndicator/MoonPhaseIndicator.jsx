import { useState, useEffect } from 'react';
import styles from './MoonPhaseIndicator.module.css';

const phases = [
  { name: 'New Moon', emoji: '🌑', meaning: 'A time for new beginnings and setting intentions.', influence: 90 },
  { name: 'Waxing Crescent', emoji: '🌒', meaning: 'Growing energy, perfect for initiating projects.', influence: 75 },
  { name: 'First Quarter', emoji: '🌓', meaning: 'Decision time, take action to overcome obstacles.', influence: 60 },
  { name: 'Waxing Gibbous', emoji: '🌔', meaning: 'Refine and adjust your plans before completion.', influence: 80 },
  { name: 'Full Moon', emoji: '🌕', meaning: 'Peak energy, heightened intuition and revelation.', influence: 100 },
  { name: 'Waning Gibbous', emoji: '🌖', meaning: 'Gratitude and sharing the abundance received.', influence: 70 },
  { name: 'Last Quarter', emoji: '🌗', meaning: 'Release what no longer serves you.', influence: 50 },
  { name: 'Waning Crescent', emoji: '🌘', meaning: 'Rest, recover, and prepare for the new cycle.', influence: 40 }
];

const MoonPhaseIndicator = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(null);

  useEffect(() => {
    const calculateMoonPhase = () => {
      
      const now = new Date();
      
      const dayOfMonth = now.getDate() - 1;
      const phaseIndex = Math.floor((dayOfMonth / 30) * 8) % 8;
      return phases[phaseIndex];
    };
    
    setCurrentPhase(calculateMoonPhase());
  }, []);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  if (!currentPhase) return null;

  return (
    <div 
      className={`${styles.moonPhase} ${expanded ? styles.expanded : ''}`}
      onClick={toggleExpanded}
    >
      <div className={styles.header}>
        <span className={styles.moonEmoji}>{currentPhase.emoji}</span>
        <span className={styles.phaseName}>{currentPhase.name}</span>
      </div>
      
      {expanded && (
        <div className={styles.info}>
          <p className={styles.mysticalMeaning}>{currentPhase.meaning}</p>
          
          <div className={styles.influence}>
            <div className={styles.influenceLabel}>
              <span>Mystical Influence</span>
              <span className={styles.influenceValue}>{currentPhase.influence}%</span>
            </div>
            <div className={styles.influenceMeter}>
              <div 
                className={styles.influenceProgress} 
                style={{ width: `${currentPhase.influence}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoonPhaseIndicator;