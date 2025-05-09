import { useState, useEffect } from 'react';

export const useCatnip = () => {
  const [catnip, setCatnip] = useState(false);

  useEffect(() => {
    const savedCatnip = localStorage.getItem('catOracleCatnip');
    if (savedCatnip === 'true') {
      setCatnip(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('catOracleCatnip', catnip.toString());
  }, [catnip]);

  const toggleCatnip = () => {
    setCatnip(prevState => !prevState);
  };

  return { catnip, toggleCatnip };
};