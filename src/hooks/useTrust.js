import { useState, useEffect } from 'react';

export const useTrust = () => {
  const [trust, setTrust] = useState(10);

  useEffect(() => {
    const savedTrust = localStorage.getItem('catOracleTrust');
    if (savedTrust) {
      setTrust(parseInt(savedTrust, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('catOracleTrust', trust.toString());
  }, [trust]);

  const increaseTrust = () => {
    setTrust(prevTrust => {
      const increase = 2 + Math.floor(Math.random() * 4);
      return Math.min(prevTrust + increase, 100);
    });
  };

  const decreaseTrust = () => {
    setTrust(prevTrust => {
      const decrease = 1 + Math.floor(Math.random() * 3);
      return Math.max(prevTrust - decrease, 0);
    });
  };

  return { trust, increaseTrust, decreaseTrust };
};