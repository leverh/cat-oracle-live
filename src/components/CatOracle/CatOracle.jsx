import { useState, useEffect, useRef } from 'react';
import styles from './CatOracle.module.css';
import { useTrust } from '../../hooks/useTrust';
import { useCatnip } from '../../hooks/useCatnip';
import MysticParticles from '../MysticParticles/MysticParticles';
import MoonPhaseIndicator from '../MoonPhaseIndicator/MoonPhaseIndicator';
import CatImage from '../CatImage/CatImage';
import QuestionInput from '../QuestionInput/QuestionInput';
import TrustMeter from '../TrustMeter/TrustMeter';
import FortuneDisplay from '../FortuneDisplay/FortuneDisplay';
import DailyFortune from '../DailyFortune/DailyFortune';
import CatnipButton from '../CatnipButton/CatnipButton';
import Footer from '../Footer/Footer';
import { fortunes, catnipFortunes } from '../../data/fortunes';

// Importing cat images
import catSitting from '../../assets/images/cat-poses/cat-sitting.jpg';
import catWise from '../../assets/images/cat-poses/cat-wise.jpg';
import catPlayful from '../../assets/images/cat-poses/cat-playful.jpg';
import catSleepy from '../../assets/images/cat-poses/cat-sleepy.jpg';
import catMysterious from '../../assets/images/cat-poses/cat-mysterious.jpg';
import catCatnip1 from '../../assets/images/cat-poses/cat-catnip1.jpg';
import catCatnip2 from '../../assets/images/cat-poses/cat-catnip2.jpg';
import fallbackCat from '../../assets/images/fallback-cat.jpg';

const CatOracle = ({ portfolioSiteUrl = "https://pixelsummit.dev/" }) => {
  const regularCatImages = [
    catSitting,
    catWise,
    catPlayful,
    catSleepy,
    catMysterious,
  ];

  const specialCatnipImages = [
    catCatnip1,
    catCatnip2,
  ];
  
  const [question, setQuestion] = useState('');
  const [askedQuestion, setAskedQuestion] = useState('');
  const [fortune, setFortune] = useState('');
  const [catImage, setCatImage] = useState(regularCatImages[0]);
  const [previousImage, setPreviousImage] = useState(null);
  const [catAnimationState, setCatAnimationState] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { trust, increaseTrust } = useTrust();
  const { catnip, toggleCatnip } = useCatnip();
  
  const fortuneTimeoutRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  // Random fortune
  const getRandomFortune = (useCatnip = false) => {
    if (useCatnip) {
      return catnipFortunes[Math.floor(Math.random() * catnipFortunes.length)];
    }
    
    const categories = Object.keys(fortunes);
    const category = categories[Math.floor(Math.random() * categories.length)];
    return fortunes[category][Math.floor(Math.random() * fortunes[category].length)];
  };

  useEffect(() => {
    // Cleanup timeouts
    return () => {
      if (fortuneTimeoutRef.current) clearTimeout(fortuneTimeoutRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  const getRandomCatImage = () => {
    const imageSet = catnip ? specialCatnipImages : regularCatImages;
    
    if (imageSet.length <= 1) {
      return imageSet[0];
    }
    
    const availableImages = imageSet.filter(img => img !== previousImage);
    
    if (availableImages.length === 0) {
      return imageSet[Math.floor(Math.random() * imageSet.length)];
    }
    
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const handleAsk = () => {
    if (!question.trim() || isProcessing) return;
    
    setAskedQuestion(question);
    
    setQuestion('');
    
    setIsProcessing(true);
    setFortune('');
    
    if (fortuneTimeoutRef.current) clearTimeout(fortuneTimeoutRef.current);
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    
    setCatAnimationState('thinking');
    
    fortuneTimeoutRef.current = setTimeout(() => {
      const response = getRandomFortune(catnip);
      
      setPreviousImage(catImage);
      const newCatImage = getRandomCatImage();
      setCatImage(newCatImage);
      
      setCatAnimationState('revealing');
      
      revealTimeoutRef.current = setTimeout(() => {
        setFortune(response);
        increaseTrust();
        
        setTimeout(() => {
          setCatAnimationState('');
          setIsProcessing(false);
        }, 500);
      }, 1000);
    }, 2000);
  };

  const handleCatnipToggle = () => {
    if (isProcessing) return;
    
    toggleCatnip();
    setCatAnimationState('catnip');
    
    if (!catnip && specialCatnipImages.length > 0) {
      setPreviousImage(catImage);
      const catnipImg = specialCatnipImages[Math.floor(Math.random() * specialCatnipImages.length)];
      setCatImage(catnipImg);
    } else if (catnip) {
      setPreviousImage(catImage);
      const regularImg = regularCatImages[Math.floor(Math.random() * regularCatImages.length)];
      setCatImage(regularImg);
    }
    
    setTimeout(() => {
      setCatAnimationState('');
    }, 1000);
  };

  return (
    <>
      <MysticParticles />
      <MoonPhaseIndicator />
      
      <div className={styles.container}>
        <div className={styles.oracleHeader}>
          <h1 className={styles.oracleTitle}>The Mystical Cat Oracle</h1>
          <p className={styles.oracleSubtitle}>
            Seek wisdom from the cosmic feline who peers beyond the veil of time
          </p>
        </div>
        
        <div className={styles.contentWrapper}>
          <CatImage 
            src={catImage} 
            alt="Mystical Cat Oracle"
            animationState={catAnimationState} 
            fallbackSrc={fallbackCat}
          />
          
          <QuestionInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleAsk}
            disabled={isProcessing}
          />
          
          <TrustMeter trust={trust} />
          
          {fortune && (
            <FortuneDisplay 
              fortune={fortune} 
              question={askedQuestion}
            />
          )}
          
          <DailyFortune />
          
          <CatnipButton 
            active={catnip} 
            onClick={handleCatnipToggle}
            disabled={isProcessing}
          />
        </div>
        
        <Footer portfolioSiteUrl={portfolioSiteUrl} />
      </div>
    </>
  );
};

export default CatOracle;