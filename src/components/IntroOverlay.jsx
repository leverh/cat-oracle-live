import React, { useEffect, useState } from 'react';
import styles from '../styles/mystical-theme.module.css';

export default function IntroOverlay({ onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if the user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenOracle');
    if (hasSeenIntro) {
      // If they've seen it before, auto-close after a short delay
      const timer = setTimeout(() => {
        handleClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(true);
    
    // Play exit sound if available
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);

    // Set the flag so intro doesn't show again
    localStorage.setItem('hasSeenOracle', 'true');
    
    // Animate out before closing
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className={`${styles.introOverlay} ${isAnimating ? styles.fadeOut : ''}`}>
      <div className={styles.introContent}>
        <div className={styles.symbolTop}>∞ ✧･ﾟ: *✧･ﾟ:* ∞</div>
        
        <h2 className={styles.welcomeTitle}>
          🐾 Welcome, Seeker of Truth 🐾
        </h2>
        
        <p className={styles.introText}>
          The Cat Oracle senses your curiosity...<br />
          Ask about your <strong>destiny, decisions, or dreams</strong>.
        </p>
        
        <div className={styles.examples}>
          <p className={styles.examplesTitle}><em>Examples of worthy queries:</em></p>
          <div className={styles.examplesList}>
            <div className={styles.example}>"Will I find success this year?"</div>
            <div className={styles.example}>"Should I trust my instincts?"</div>
            <div className={styles.example}>"What hidden opportunity awaits?"</div>
          </div>
        </div>
        
        <button 
          onClick={handleClose} 
          className={styles.enterButton}
          onMouseEnter={() => {
            // Hover sound
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.connect(gain);
            gain.connect(context.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, context.currentTime);
            gain.gain.setValueAtTime(0.1, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
            osc.start();
            osc.stop(context.currentTime + 0.1);
          }}
        >
          Enter the Oracle's Chamber
        </button>
        
        <div className={styles.symbolBottom}>∞ ✧･ﾟ: *✧･ﾟ:* ∞</div>
      </div>
    </div>
  );
}