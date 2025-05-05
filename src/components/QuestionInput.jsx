import React from 'react';
import styles from '../styles/mystical-theme.module.css';

export default function QuestionInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Ask the Oracle..." 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={styles.questionInputContainer}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={styles.questionInput}
      />
      <button 
        onClick={onSubmit} 
        className={styles.askButton}
        disabled={!value.trim()}
      >
        Ask the Oracle
      </button>
    </div>
  );
}