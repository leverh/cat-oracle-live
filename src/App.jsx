import { useState, useEffect } from 'react';
import CatOracle from './components/CatOracle/CatOracle';
import IntroOverlay from './components/IntroOverlay/IntroOverlay';
import CursorEffect from './components/CursorEffect/CursorEffect';
import './global.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  
  const websiteUrl = "https://pixelsummit.dev/";
  useEffect(() => {
    const hasVisited = localStorage.getItem('catOracleVisited');
    if (hasVisited) {
      setShowIntro(false);
    }
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
    localStorage.setItem('catOracleVisited', 'true');
  };

  return (
    <div className="mystic-container">
      <div className="mystic-background"></div>
      <CursorEffect />
      {showIntro && <IntroOverlay onClose={handleCloseIntro} />}
      <CatOracle yourSiteUrl={websiteUrl}/>
    </div>
  );
}

export default App;