'use client'

import { useEffect, useState } from "react";

export default function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px');
    
    function handleChange() {
        setIsMobile(media.matches)
    };
    media.addEventListener('change', handleChange);

    return () => {
        media.removeEventListener('change', handleChange)
    }
  }, []);

  return isMobile;
}
