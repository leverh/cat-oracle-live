import { useState, useEffect, useRef } from 'react';
import styles from './MysticParticles.module.css';

const generateUniqueId = (() => {
  let idCounter = 0;
  return (prefix) => {
    idCounter += 1;
    return `${prefix}-${idCounter}`;
  };
})();

const generateParticles = () => {
  const smallParticles = Array.from({ length: 40 }, () => ({
    id: generateUniqueId('small'),
    type: 'small',
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 4}s`,
    left: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 2}px`
  }));

  const mediumParticles = Array.from({ length: 25 }, () => ({
    id: generateUniqueId('medium'),
    type: 'medium',
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 6}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 2}px`
  }));

  const largeParticles = Array.from({ length: 15 }, () => ({
    id: generateUniqueId('large'),
    type: 'large',
    delay: `${Math.random() * 8}s`,
    duration: `${4 + Math.random() * 3}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${3 + Math.random() * 2}px`
  }));

  const dustParticles = Array.from({ length: 30 }, () => ({
    id: generateUniqueId('dust'),
    type: 'dust',
    delay: `${Math.random() * 12}s`,
    duration: `${6 + Math.random() * 8}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }));
  
  const starParticles = Array.from({ length: 10 }, () => ({
    id: generateUniqueId('star'),
    type: 'star',
    delay: `${Math.random() * 10}s`,
    duration: `${3 + Math.random() * 4}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 80}%`
  }));

  return [...smallParticles, ...mediumParticles, ...largeParticles, ...dustParticles, ...starParticles];
};

const generateComets = () => {
  return Array.from({ length: 5 }, () => ({
    id: generateUniqueId('comet'),
    delay: `${5 + Math.random() * 20}s`,
    duration: `${10 + Math.random() * 10}s`,
    offsetY: Math.random() * 30
  }));
};

const MysticParticles = () => {
  const [particles, setParticles] = useState([]);
  const [comets, setComets] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    setParticles(generateParticles());
    setComets(generateComets());
    
    intervalRef.current = setInterval(() => {
      setParticles(prevParticles => {
        const newParticles = generateParticles().slice(0, 15);
        return [...prevParticles.slice(15), ...newParticles];
      });
      
      setComets(generateComets());
    }, 30000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.particlesContainer}>
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
            case 'star':
              particleClass = styles.particleStar;
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
      
      <div className={styles.comets}>
        {comets.map(comet => (
          <div
            key={comet.id}
            className={styles.comet}
            style={{
              animationDelay: comet.delay,
              animationDuration: comet.duration,
              '--offset-y': comet.offsetY
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MysticParticles;