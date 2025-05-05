import React from 'react';
import styles from '../styles/mystical-theme.module.css';

export default function TrustMeter({ trust }) {
  const maxTrust = 100;
  const trustPercentage = Math.min((trust / maxTrust) * 100, 100);
  
  // Get trust level description
  const getTrustLevel = () => {
    if (trust >= 90) return "Soul Bonded";
    if (trust >= 70) return "Most Favored Human";
    if (trust >= 50) return "Trusted Companion";
    if (trust >= 30) return "Occasional Friend";
    if (trust >= 10) return "Mere Observer";
    return "Stranger";
  };

  return (
    <div className={styles.trustMeter}>
      <h3 className={styles.trustLevel}>
        Cat Trust: {getTrustLevel()}
      </h3>
      <div className={styles.trustBar}>
        <div 
          className={styles.trustProgress}
          style={{ width: `${trustPercentage}%` }}
        />
      </div>
      <p style={{ fontSize: '1.4rem', marginTop: '0.5rem', opacity: 0.8 }}>
        {trust} / {maxTrust}
      </p>
    </div>
  );
}