import React from 'react';
import styles from './TrustMeter.module.css';

const TrustMeter = ({ trust }) => {
  const getTrustLevel = () => {
    if (trust < 20) return 'Skeptical';
    if (trust < 40) return 'Curious';
    if (trust < 60) return 'Intrigued';
    if (trust < 80) return 'Believer';
    return 'Enlightened';
  };

  return (
    <div className={styles.trustMeter}>
      <div className={styles.trustHeader}>
        <div className={styles.trustLevelText}>
          Trust Level: <strong>{getTrustLevel()}</strong>
        </div>
        <div className={styles.trustValue}>{trust}%</div>
      </div>
      <div className={styles.trustBar}>
        <div
          className={styles.trustProgress}
          style={{ width: `${trust}%` }}
        />
      </div>
    </div>
  );
};

export default TrustMeter;