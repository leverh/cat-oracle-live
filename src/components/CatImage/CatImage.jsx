import React from 'react';
import styles from './CatImage.module.css';

const CatImage = ({ src, alt, animationState, fallbackSrc }) => {
  const getAnimationClass = () => {
    switch (animationState) {
      case 'thinking':
        return styles.thinking;
      case 'revealing':
        return styles.revealing;
      case 'catnip':
        return styles.catnip;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageFrame}>
        <img 
          src={src} 
          alt={alt || "Mystical Cat"} 
          className={`${styles.image} ${getAnimationClass()}`} 
          onError={(e) => {
            if (e.target.src !== fallbackSrc) {
              console.log(`Image failed to load: ${e.target.src}, using fallback`);
              e.target.src = fallbackSrc;
            }
          }}
        />
      </div>
      <div className={styles.auraGlow}></div>
    </div>
  );
};

export default CatImage;