import React, { useState, useEffect } from 'react';
import styles from '../styles/mystical-theme.module.css';
import { useTrust } from '../hooks/useTrust';
import TrustMeter from './TrustMeter';
import QuestionInput from './QuestionInput';
import FortuneDisplay from './FortuneDisplay';
import { fortunes } from '../data/fortunes';
import catStates from '../data/catStates';
import DailyFortune from './DailyFortune';
import MoonPhaseIndicator from './MoonPhaseIndicator';
import { useCatnip } from '../hooks/useCatnip';
import { catnipFortunes } from '../data/fortunes';
// import { useSoundEffects } from '../hooks/useSoundEffects';

// Generate mystical particles
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 4}s`,
    left: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 3}px`
  }));
};

function getRandomFortune(useCatnip = false) {
  if (useCatnip) {
    return catnipFortunes[Math.floor(Math.random() * catnipFortunes.length)];
  }
  const categories = Object.keys(fortunes);
  const category = categories[Math.floor(Math.random() * categories.length)];
  return fortunes[category][Math.floor(Math.random() * fortunes[category].length)];
}

export default function CatOracle() {
  const [question, setQuestion] = useState('');
  const [fortune, setFortune] = useState('');
  const [catImage, setCatImage] = useState(catStates.idle);
  const [catClass, setCatClass] = useState('');
  const [particles, setParticles] = useState([]);
  const { trust, increaseTrust } = useTrust();
  const { catnip, toggleCatnip } = useCatnip();
  // const { playSound } = useSoundEffects();

  useEffect(() => {
    // Generate particles on mount
    setParticles(generateParticles(50));
  }, []);

  const handleAsk = () => {
    if (question.trim()) {
      // Play mystical chime when asking
      // playSound('ask');
      
      // Set to thinking state
      setCatImage(catStates.thinking);
      setCatClass(styles.catThinking);
      
      // Wait longer to see the thinking animation
      setTimeout(() => {
        // Play magic whoosh when responding
        // playSound('respond');
        
        // Switch to responding state
        setCatImage(catStates.responding);
        setCatClass(styles.catResponding);
        const response = getRandomFortune(catnip);
        setFortune(response);
        increaseTrust();
        
        // Play trust success sound
        // playSound('success');
        
        // Keep the responding image longer before returning to idle
        setTimeout(() => {
          setCatImage(catStates.idle);
          setCatClass('');
        }, 5000);
      }, 2000);
    }
  };

  const handleCatnipToggle = () => {
    // Play click sound
    // playSound('click');
    
    toggleCatnip();
    
    // Add visual feedback when clicked
    if (!catnip) {
      // If activating catnip mode, change to catnip image
      if (catStates.catnipMode) {
        setCatImage(catStates.catnipMode);
        setTimeout(() => {
          setCatImage(catStates.idle);
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.oracleContainer}>
      {/* Mystical Particles */}
      <div className={styles.mysticParticles}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
      
      <MoonPhaseIndicator />
      
      <img 
        src={catImage} 
        alt="Mystical Cat" 
        className={`${styles.catImage} ${catClass}`} 
      />
      
      <QuestionInput
        value={question}
        onChange={setQuestion}
        onSubmit={handleAsk}
      />
      
      <TrustMeter trust={trust} />
      
      <FortuneDisplay fortune={fortune} />
      
      <DailyFortune />
      
      <button 
        onClick={handleCatnipToggle}
        className={`${styles.catnipButton} ${catnip ? styles.active : ''}`}
      >
        {catnip ? 'Disable Catnip Mode 🌿' : 'Enable Catnip Mode 🌿'}
      </button>
    </div>
  );
}