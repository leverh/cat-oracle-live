import styles from './QuestionInput.module.css';

const QuestionInput = ({ value, onChange, onSubmit, disabled }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled && value.trim()) {
      handleSubmission();
    }
  };

  const handleSubmission = () => {
    onSubmit();
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.questionInput}
          placeholder="Ask the mystical cat oracle about your future..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <span className={styles.inputIcon}>✨</span>
      </div>
      
      <button
        className={styles.askButton}
        onClick={handleSubmission}
        disabled={disabled || !value.trim()}
      >
        Consult the Oracle
      </button>
    </div>
  );
};

export default QuestionInput;