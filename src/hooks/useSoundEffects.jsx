import { useCallback } from 'react';

export const useSoundEffects = () => {
  const playSound = useCallback((soundName) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (soundName) {
        case 'ask': {
          // Mystical chime
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
        }
          
        case 'respond': {
          // Magic whoosh
          const whoosh = audioContext.createOscillator();
          const whooshGain = audioContext.createGain();
          whoosh.connect(whooshGain);
          whooshGain.connect(audioContext.destination);
          whoosh.type = 'sine';
          whoosh.frequency.setValueAtTime(200, audioContext.currentTime);
          whoosh.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
          whooshGain.gain.setValueAtTime(0.2, audioContext.currentTime);
          whooshGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
          whoosh.start();
          whoosh.stop(audioContext.currentTime + 0.3);
          break;
        }
          
        case 'success': {
          // Trust level up
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        }
          
        case 'click': {
          // Button click
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        }
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  
  const playComplexSound = useCallback((soundName) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    if (soundName === 'meow') {
      
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioContext.destination);
      
      osc1.type = 'sawtooth';
      osc2.type = 'sine';
      
      
      osc1.frequency.setValueAtTime(600, audioContext.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      osc1.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
      osc1.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.4);
      
      osc2.frequency.setValueAtTime(300, audioContext.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.4);
      
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioContext.currentTime + 0.4);
      osc2.stop(audioContext.currentTime + 0.4);
    }
  }, []);

  return { playSound, playComplexSound };
};
