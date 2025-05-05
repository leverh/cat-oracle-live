import { useState, useEffect } from 'react';

const CATNIP_KEY = 'catOracleCatnipMode';

export function useCatnip() {
  const [catnip, setCatnip] = useState(() => {
    return localStorage.getItem(CATNIP_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(CATNIP_KEY, catnip.toString());
  }, [catnip]);

  const toggleCatnip = () => setCatnip((prev) => !prev);

  return { catnip, toggleCatnip };
}
