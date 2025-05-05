import { useState, useEffect } from 'react';

const TRUST_KEY = 'catOracleTrustLevel';

export function useTrust() {
  const [trust, setTrust] = useState(() => {
    const stored = localStorage.getItem(TRUST_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(TRUST_KEY, trust.toString());
  }, [trust]);

  const increaseTrust = (amount = 1) => {
    setTrust((prev) => prev + amount);
  };

  return { trust, increaseTrust };
}
