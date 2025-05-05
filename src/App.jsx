import React, { useState } from 'react';
import CatOracle from './components/CatOracle';
import IntroOverlay from './components/IntroOverlay';
import CursorEffect from './utils/cursorEffect';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  return (
    <div>
      <CursorEffect />
      {showIntro && <IntroOverlay onClose={handleCloseIntro} />}
      <CatOracle />
    </div>
  );
}

export default App;