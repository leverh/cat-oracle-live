import React from 'react';
import styles from './FortuneDisplay.module.css';

const FortuneDisplay = ({ fortune, question }) => {
  if (!fortune) {
    return null;
  }
  const highlightKeywords = (text) => {
    const keywords = [
      'success', 'fortune', 'future', 'destiny', 'path', 
      'journey', 'wisdom', 'insight', 'love', 'change',
      'opportunity', 'challenge', 'energy', 'power', 'vision',
      'cat', 'purr', 'meow', 'whiskers', 'paws', 'nap',
      'sunbeam', 'catnip', 'chase', 'pounce', 'curiosity'
    ];
    
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    return text.replace(regex, match => `<span class="${styles.fortuneHighlight}">${match}</span>`);
  };

  const highlightedFortune = highlightKeywords(fortune);

  return (
    <div className={styles.fortuneContainer}>
      <div className={styles.fortune}>
        {question && (
          <div className={styles.questionDisplay}>
            <span className={styles.questionLabel}>You asked:</span>
            <span className={styles.questionText}>{question}</span>
          </div>
        )}
        <div 
          className={styles.fortuneContent}
          dangerouslySetInnerHTML={{ __html: highlightedFortune }}
        />
        <div className={styles.fortuneGlow}></div>
      </div>
    </div>
  );
};

export default FortuneDisplay;