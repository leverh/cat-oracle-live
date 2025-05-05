import React from 'react';
import styles from '../styles/mystical-theme.module.css';

export default function FortuneDisplay({ fortune, visible = true }) {
  if (!fortune || !visible) return null;
  
  return (
    <div className={styles.fortune}>
      <span className={styles.fortuneQuoteLeft}></span>
      {fortune}
      <span className={styles.fortuneQuoteRight}></span>
    </div>
  );
}