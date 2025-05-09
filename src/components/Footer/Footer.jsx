import styles from './Footer.module.css';

const Footer = ({ portfolioSiteUrl = "https://pixelsummit.dev/" }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.poweredBy}>
          Cosmic wisdom powered by <span>Mystical Cat Energy</span> <span className={styles.footerIcon}>✨</span>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.links}>
          <a href={portfolioSiteUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Visit My Website
          </a>
        </div>
        
        <p className={styles.copyright}>
          <span className={styles.paw}>🐾</span> 
          Copyright © {currentYear} PixelSummit | The Mystical Cat Oracle. All Rights Reserved 
          <span className={styles.paw}>🐾</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;