import { useEffect, useRef, type RefObject } from "react";

export function useAutoScroll({
  speed = 3000,
  pauseOnHover = true,
  externalRef = null,
}: {
  speed?: number;
  pauseOnHover?: boolean;
  externalRef?: RefObject<HTMLDivElement | null> | null;
} = {}) {
  const internalRef = useRef<HTMLDivElement>(null);
  const scrollRef = externalRef || internalRef;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isPaused = false;
    
    const pause = () => { isPaused = true; };
    const play = () => { isPaused = false; };

    if (pauseOnHover) {
      el.addEventListener('mouseenter', pause);
      el.addEventListener('mouseleave', play);
      el.addEventListener('touchstart', pause, { passive: true });
      el.addEventListener('touchend', play, { passive: true });
    }

    const interval = setInterval(() => {
      if (isPaused) return;
      
      const maxScroll = el.scrollWidth - el.clientWidth;
      
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstChild = el.children[0] as HTMLElement;
        // get gap from computed style
        const gapStyle = window.getComputedStyle(el).gap;
        const gap = gapStyle !== 'normal' ? parseFloat(gapStyle) : 16; 
        const scrollAmount = firstChild ? firstChild.offsetWidth + gap : 300;
        
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, speed);

    return () => {
      clearInterval(interval);
      if (pauseOnHover) {
        el.removeEventListener('mouseenter', pause);
        el.removeEventListener('mouseleave', play);
        el.removeEventListener('touchstart', pause);
        el.removeEventListener('touchend', play);
      }
    };
  }, [speed, pauseOnHover]);

  return scrollRef;
}
