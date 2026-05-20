import { useEffect, useRef, useState } from 'react';

const SAD_MESSAGES = [
  // "Hey 😢",
  // "Heyy 👀",
  "Heyyy ",
  " "
];

// We use inline SVG Data URIs to create a perfectly crisp crying emoji animation!
// This requires no external files and works instantly on all modern browsers.
const FAVICON_FRAMES = [
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👀</text></svg>`,
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">😒</text></svg>`,
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🙄</text></svg>`,
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">😒</text></svg>`,
];

export const useDynamicFavicon = ({
  originalTitle = 'Codropic | Dcoode',
  originalFavicon = '/logo.jpeg',
  delayMs = 1200, // Premium 1.2s delay before triggering
  frameIntervalMs = 500 // 500ms between favicon frames
} = {}) => {
  const [isAway, setIsAway] = useState(false);
  const timeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    // 1. Helper to safely update document title
    const updateTitle = (newTitle) => {
      document.title = newTitle;
    };

    // 2. Helper to safely update document favicon
    const updateFavicon = (href) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // 3. Start the dramatic sad animation
    const startSadAnimation = () => {
      // Pick a random emotional message
      const randomMsg = SAD_MESSAGES[Math.floor(Math.random() * SAD_MESSAGES.length)];
      updateTitle(randomMsg);
      setIsAway(true);

      // Start Favicon Animation Loop
      frameIndexRef.current = 0;
      updateFavicon(FAVICON_FRAMES[0]);

      animationIntervalRef.current = setInterval(() => {
        frameIndexRef.current = (frameIndexRef.current + 1) % FAVICON_FRAMES.length;
        updateFavicon(FAVICON_FRAMES[frameIndexRef.current]);
      }, frameIntervalMs);
    };

    // 4. Restore everything instantly when they return
    const stopSadAnimation = () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      updateTitle(originalTitle);
      updateFavicon(originalFavicon);
      setIsAway(false);
    };

    // 5. The core visibility event handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Subtle delay: Wait before changing.
        // This prevents rapid tab-switch flickering (premium UX detail)
        timeoutRef.current = setTimeout(() => {
          startSadAnimation();
        }, delayMs);
      } else {
        // User came back! 
        // Clear the timeout if they came back before the delay even finished
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        stopSadAnimation();
      }
    };

    // Mount listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Deep cleanup on unmount to completely prevent memory leaks
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [originalTitle, originalFavicon, delayMs, frameIntervalMs]);

  return { isAway };
};
