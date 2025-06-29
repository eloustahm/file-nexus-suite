
import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is mobile
 * @param breakpoint - The breakpoint in pixels (default: 768)
 * @returns boolean indicating if the device is mobile
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkDevice();

    // Add event listener for window resize
    window.addEventListener('resize', checkDevice);

    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, [breakpoint]);

  return isMobile;
};
