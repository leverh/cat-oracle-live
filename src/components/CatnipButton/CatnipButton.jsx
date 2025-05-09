import styles from './CatnipButton.module.css';

const CatnipButton = ({ active, onClick, disabled }) => {
  return (
    <button 
      className={`${styles.catnipButton} ${active ? styles.active : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.icon}>🌿</span>
      {active ? 'Disable Catnip Mode' : 'Enable Catnip Mode'}
    </button>
  );
};

export default CatnipButton;