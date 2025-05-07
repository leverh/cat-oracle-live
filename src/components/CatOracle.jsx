import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/mystical-theme.module.css';
import { useTrust } from '../hooks/useTrust';
import TrustMeter from './TrustMeter';
import QuestionInput from './QuestionInput';
import FortuneDisplay from './FortuneDisplay';
import { fortunes } from '../data/fortunes';
import DailyFortune from './DailyFortune';
import MoonPhaseIndicator from './MoonPhaseIndicator';
import { useCatnip } from '../hooks/useCatnip';
import { catnipFortunes } from '../data/fortunes';

import catImg1 from '../assets/images/cat-poses/cat-sitting.jpg';
import catImg2 from '../assets/images/cat-poses/cat-wise.jpg';
import catImg3 from '../assets/images/cat-poses/cat-playful.jpg';
import catImg4 from '../assets/images/cat-poses/cat-sleepy.jpg';
import catImg5 from '../assets/images/cat-poses/chanel3.jpg';
import catImg6 from '../assets/images/cat-poses/chanel4.jpg';

const catImages = [
  catImg1, catImg2, catImg3, catImg4, catImg5
];

const catnipImages = [
  catImg6, catImg5
];

const generateParticles = () => {
  const smallParticles = Array.from({ length: 50 }, (_, i) => ({
    id: `small-${i}`,
    type: 'small',
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 4}s`,
    left: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 2}px`
  }));

  const mediumParticles = Array.from({ length: 30 }, (_, i) => ({
    id: `medium-${i}`,
    type: 'medium',
    delay: `${Math.random() * 12}s`,
    duration: `${10 + Math.random() * 6}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 2}px`
  }));

  const largeParticles = Array.from({ length: 15 }, (_, i) => ({
    id: `large-${i}`,
    type: 'large',
    delay: `${Math.random() * 5}s`,
    duration: `${4 + Math.random() * 3}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${3 + Math.random() * 2}px`
  }));

  const dustParticles = Array.from({ length: 40 }, (_, i) => ({
    id: `dust-${i}`,
    type: 'dust',
    delay: `${Math.random() * 10}s`,
    duration: `${6 + Math.random() * 8}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }));

  return [...smallParticles, ...mediumParticles, ...largeParticles, ...dustParticles];
};

function getRandomFortune(useCatnip = false, trustLevel = 0) {
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
  const [catImage, setCatImage] = useState(catImages[0]);
  const [previousImage, setPreviousImage] = useState(null);
  const [catClass, setCatClass] = useState('');
  const [particles, setParticles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { trust, increaseTrust } = useTrust();
  const { catnip, toggleCatnip } = useCatnip();
  
  const fortuneTimeoutRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  useEffect(() => {
    setParticles(generateParticles());
    
    return () => {
      if (fortuneTimeoutRef.current) clearTimeout(fortuneTimeoutRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  const getRandomCatImage = () => {
    const imageSet = catnip ? catnipImages : catImages;
    
    if (imageSet.length <= 1) {
      return imageSet[0];
    }
    
    const availableImages = imageSet.filter(img => img !== previousImage);
    
    if (availableImages.length === 0) {
      return imageSet[Math.floor(Math.random() * imageSet.length)];
    }
    
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const handleAsk = () => {
    if (!question.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setFortune('');
    
    if (fortuneTimeoutRef.current) clearTimeout(fortuneTimeoutRef.current);
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    
    setCatClass(styles.catThinking);
    
    fortuneTimeoutRef.current = setTimeout(() => {
      const response = getRandomFortune(catnip, trust);
      
      setPreviousImage(catImage);
      const newCatImage = getRandomCatImage();
      setCatImage(newCatImage);
      
      setCatClass(styles.catRevealing);
      
      revealTimeoutRef.current = setTimeout(() => {
        setFortune(response);
        increaseTrust();
        
        setTimeout(() => {
          setCatClass('');
          setIsProcessing(false);
        }, 500);
      }, 300);
    }, 1500);
  };

  const handleCatnipToggle = () => {
    toggleCatnip();
    
    if (!isProcessing) {
      setCatClass(styles.catCatnip);
      
      if (catnipImages.length > 0) {
        setPreviousImage(catImage);
        const availableCatnipImages = catnipImages.filter(img => img !== previousImage);
        const catnipImg = availableCatnipImages.length > 0 
          ? availableCatnipImages[Math.floor(Math.random() * availableCatnipImages.length)]
          : catnipImages[Math.floor(Math.random() * catnipImages.length)];
        
        setCatImage(catnipImg);
      }
      
      setTimeout(() => {
        setCatClass('');
      }, 1000);
    }
  };

  return (
    <div className={styles.oracleContainer}>
      <div className={styles.mysticParticles}>
        {particles.map(particle => {
          let particleClass;
          switch(particle.type) {
            case 'medium':
              particleClass = styles.particleMedium;
              break;
            case 'large':
              particleClass = styles.particleLarge;
              break;
            case 'dust':
              particleClass = styles.particleDust;
              break;
            default:
              particleClass = styles.particle;
          }
          
          return (
            <div
              key={particle.id}
              className={particleClass}
              style={{
                left: particle.left,
                top: particle.type !== 'small' ? particle.top : undefined,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          );
        })}
      </div>
      
      <MoonPhaseIndicator />
      
      <img 
        src={catImage} 
        alt="Mystical Cat" 
        className={`${styles.catImage} ${catClass}`} 
        onError={(e) => {
          if (e.target.src !== catImages[0]) {
            e.target.src = catImages[0];
          }
        }}
      />
      
      <QuestionInput
        value={question}
        onChange={setQuestion}
        onSubmit={handleAsk}
        disabled={isProcessing}
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