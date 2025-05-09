import React, { useState } from 'react';
import styles from './IntroOverlay.module.css';

const IntroOverlay = ({ onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.symbol}>✧･ﾟ: *✧･ﾟ:* ⋆｡ﾟ☾ ⋆｡⋆☀⋆</div>
        
        <h1 className={styles.title}>The Mystical Cat Oracle</h1>
        
        <p className={styles.description}>
          Welcome, seeker of wisdom! You've discovered the <strong>Mystical Cat Oracle</strong>, 
          where a feline diviner peers into the cosmic threads of fate to reveal truths about your future.
        </p>
        
        <div className={styles.examples}>
          <h3 className={styles.examplesTitle}>Ask the Oracle about...</h3>
          <div className={styles.examplesList}>
            <div className={styles.example}>Will I find love this year?</div>
            <div className={styles.example}>Should I change my career path?</div>
            <div className={styles.example}>What does my future hold?</div>
            <div className={styles.example}>Will my creative projects succeed?</div>
          </div>
        </div>
        
        <p className={styles.description}>
          Type your question, and the mystical cat will reveal insights from beyond the veil.
          <br /><strong>The more you consult the oracle, the more accurate its visions become!</strong>
        </p>
        
        <button className={styles.enterButton} onClick={handleEnter}>
          Enter the Oracle
        </button>
        
        <div className={styles.symbol}>･ﾟ: *✧･ﾟ:* ⋆｡ﾟ☽ ⋆｡⋆★⋆</div>
      </div>
    </div>
  );
};

export default IntroOverlay;