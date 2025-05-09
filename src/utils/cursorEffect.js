import { useEffect } from 'react';
import styles from '../styles/mystical-theme.module.css';

export default function CursorEffect() {
  useEffect(() => {
    const stars = [];
    
    const createStar = (x, y) => {
      const star = document.createElement('div');
      star.className = styles.cursorStar;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      document.body.appendChild(star);
      stars.push(star);
      
      setTimeout(() => {
        star.remove();
        stars.splice(stars.indexOf(star), 1);
      }, 1000);
    };

    const handleMouseMove = (e) => {
      createStar(e.clientX - 5, e.clientY - 5);
      
      if (Math.random() < 0.3) {
        createStar(e.clientX + (Math.random() - 0.5) * 20, 
                  e.clientY + (Math.random() - 0.5) * 20);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      stars.forEach(star => star.remove());
    };
  }, []);

  return null;
}