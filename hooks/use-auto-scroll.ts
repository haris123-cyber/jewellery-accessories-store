import { useEffect, useRef, type RefObject } from "react";

export interface UseAutoScrollOptions {
  speed?: number;
  initialDelay?: number;
  userScrollPauseDuration?: number;
  pauseOnHover?: boolean;
  pauseOnTouch?: boolean;
  externalRef?: RefObject<HTMLDivElement | null> | null;
}

interface ScrollerEntry {
  id: string;
  el: HTMLDivElement;
  activate: () => void;
  deactivate: () => void;
}

// Global coordinator to ensure only ONE section scrolls at any given time
let instanceCounter = 0;
const registry = new Map<string, ScrollerEntry>();
let activeId: string | null = null;
let rafId: number | null = null;
let hasListeners = false;

function evaluateActive() {
  if (typeof window === "undefined") return;

  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;

  let bestId: string | null = null;
  let bestScore = -Infinity;

  for (const [id, entry] of registry) {
    const el = entry.el;
    if (!el || !el.isConnected) continue;

    // Check if content overflows horizontally
    if (el.scrollWidth <= el.clientWidth + 5) continue;

    const rRect = el.getBoundingClientRect();
    const rVisibleTop = Math.max(0, rRect.top);
    const rVisibleBottom = Math.min(viewportHeight, rRect.bottom);
    const rVisibleHeight = Math.max(0, rVisibleBottom - rVisibleTop);

    // Require at least 60px of the carousel rail to be in the viewport
    if (rVisibleHeight < 60) continue;

    // Consider the entire section (title + rail) to know user focus
    const section = el.closest("section") || el;
    const sRect = section.getBoundingClientRect();
    const sVisibleTop = Math.max(0, sRect.top);
    const sVisibleBottom = Math.min(viewportHeight, sRect.bottom);
    const sVisibleHeight = Math.max(0, sVisibleBottom - sVisibleTop);

    const sVisibleCenter = (sVisibleTop + sVisibleBottom) / 2;
    const distFromCenter = Math.abs(sVisibleCenter - viewportCenter);

    // Focus score: larger visible portion and closer to the screen center
    const score = sVisibleHeight * 2 - distFromCenter;

    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }
  }

  // Hysteresis: only switch away from the current activeId if the new candidate
  // is decisively more prominent (prevents rapid toggling near boundaries)
  if (activeId && bestId && activeId !== bestId) {
    const currentEntry = registry.get(activeId);
    if (currentEntry && currentEntry.el && currentEntry.el.isConnected) {
      const el = currentEntry.el;
      const rRect = el.getBoundingClientRect();
      const rVisibleTop = Math.max(0, rRect.top);
      const rVisibleBottom = Math.min(viewportHeight, rRect.bottom);
      const rVisibleHeight = Math.max(0, rVisibleBottom - rVisibleTop);

      if (rVisibleHeight >= 60) {
        const section = el.closest("section") || el;
        const sRect = section.getBoundingClientRect();
        const sVisibleTop = Math.max(0, sRect.top);
        const sVisibleBottom = Math.min(viewportHeight, sRect.bottom);
        const sVisibleHeight = Math.max(0, sVisibleBottom - sVisibleTop);
        const sVisibleCenter = (sVisibleTop + sVisibleBottom) / 2;
        const distFromCenter = Math.abs(sVisibleCenter - viewportCenter);
        const currentScore = sVisibleHeight * 2 - distFromCenter;

        if (bestScore < currentScore + 60) {
          bestId = activeId;
        }
      }
    }
  }

  if (bestId !== activeId) {
    // 1. Immediately deactivate and stop previous active section
    if (activeId) {
      const prev = registry.get(activeId);
      if (prev) prev.deactivate();
    }

    activeId = bestId;

    // 2. Activate the single best section
    if (activeId) {
      const curr = registry.get(activeId);
      if (curr) curr.activate();
    }
  }
}

function scheduleEvaluation() {
  if (typeof window === "undefined") return;
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    evaluateActive();
  });
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (activeId) {
      const curr = registry.get(activeId);
      if (curr) curr.deactivate();
    }
  } else {
    scheduleEvaluation();
  }
}

function ensureGlobalListeners() {
  if (typeof window === "undefined" || hasListeners) return;
  window.addEventListener("scroll", scheduleEvaluation, { passive: true });
  window.addEventListener("resize", scheduleEvaluation, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  hasListeners = true;
}

export function useAutoScroll({
  speed = 3000,
  initialDelay = 1200,
  userScrollPauseDuration = 5000, // pause for 5 seconds when user scrolls or interacts
  pauseOnHover = true,
  pauseOnTouch = true,
  externalRef = null,
}: UseAutoScrollOptions = {}) {
  const internalRef = useRef<HTMLDivElement>(null);
  const scrollRef = externalRef || internalRef;

  const instanceIdRef = useRef<string>("");
  if (!instanceIdRef.current) {
    instanceIdRef.current = `scroller-${++instanceCounter}`;
  }
  const id = instanceIdRef.current;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    ensureGlobalListeners();

    let isPaused = false;
    let isProgrammaticScroll = false;
    let programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let initialTimeout: ReturnType<typeof setTimeout> | null = null;
    let intervalTimer: ReturnType<typeof setInterval> | null = null;
    let userInteractionTimeout: ReturnType<typeof setTimeout> | null = null;

    const stopScrolling = () => {
      if (initialTimeout) {
        clearTimeout(initialTimeout);
        initialTimeout = null;
      }
      if (intervalTimer) {
        clearInterval(intervalTimer);
        intervalTimer = null;
      }
    };

    const performScroll = () => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 10) return;

      // Flag that this scroll event is triggered by the auto-scroller, not the user
      isProgrammaticScroll = true;
      if (programmaticScrollTimeout) clearTimeout(programmaticScrollTimeout);
      programmaticScrollTimeout = setTimeout(() => {
        isProgrammaticScroll = false;
      }, 650);

      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstChild = container.children[0] as HTMLElement | undefined;
        const gapStyle = window.getComputedStyle(container).gap;
        const gap = gapStyle && gapStyle !== "normal" ? parseFloat(gapStyle) : 16;
        const scrollAmount = firstChild ? firstChild.offsetWidth + gap : 280;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const activate = () => {
      stopScrolling();
      if (isPaused) return;

      // Wait initialDelay after becoming active before performing first scroll
      initialTimeout = setTimeout(() => {
        if (activeId !== id || isPaused) return;

        performScroll();

        intervalTimer = setInterval(() => {
          if (activeId !== id || isPaused) return;
          performScroll();
        }, speed);
      }, initialDelay);
    };

    const deactivate = () => {
      stopScrolling();
    };

    // Trigger pause whenever user manually scrolls or touches this section
    const pauseForUser = (delay = userScrollPauseDuration) => {
      isPaused = true;
      stopScrolling();

      if (userInteractionTimeout) clearTimeout(userInteractionTimeout);
      userInteractionTimeout = setTimeout(() => {
        isPaused = false;
        if (activeId === id) {
          activate();
        }
      }, delay);
    };

    // User manual scroll event on the rail
    const handleRailScroll = () => {
      // If the scroll was triggered by the auto-scroller, ignore it
      if (isProgrammaticScroll) return;

      // User manually scrolled this section! Stop animation for a few seconds.
      pauseForUser(userScrollPauseDuration);
    };

    // User hover listeners
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        isPaused = true;
        stopScrolling();
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        pauseForUser(1500); // Resume shortly after mouse leaves
      }
    };

    // User touch / pointer / wheel listeners
    const handleTouchStart = () => {
      isProgrammaticScroll = false;
      if (programmaticScrollTimeout) clearTimeout(programmaticScrollTimeout);
      isPaused = true;
      stopScrolling();
    };

    const handleTouchEnd = () => {
      pauseForUser(userScrollPauseDuration);
    };

    const handleWheel = () => {
      isProgrammaticScroll = false;
      pauseForUser(userScrollPauseDuration);
    };

    // Attach user scroll listener directly to the rail
    el.addEventListener("scroll", handleRailScroll, { passive: true });

    if (pauseOnHover) {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    if (pauseOnTouch) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchend", handleTouchEnd, { passive: true });
      el.addEventListener("touchcancel", handleTouchEnd, { passive: true });
      el.addEventListener("pointerdown", handleTouchStart, { passive: true });
      el.addEventListener("pointerup", handleTouchEnd, { passive: true });
      el.addEventListener("pointercancel", handleTouchEnd, { passive: true });
      el.addEventListener("wheel", handleWheel, { passive: true });
    }

    // Register this instance with global coordinator
    registry.set(id, {
      id,
      el,
      activate,
      deactivate,
    });

    scheduleEvaluation();
    const timer1 = setTimeout(scheduleEvaluation, 150);
    const timer2 = setTimeout(scheduleEvaluation, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (programmaticScrollTimeout) clearTimeout(programmaticScrollTimeout);
      if (userInteractionTimeout) clearTimeout(userInteractionTimeout);
      stopScrolling();

      registry.delete(id);
      if (activeId === id) {
        activeId = null;
        scheduleEvaluation();
      }

      el.removeEventListener("scroll", handleRailScroll);
      if (pauseOnHover) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (pauseOnTouch) {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchend", handleTouchEnd);
        el.removeEventListener("touchcancel", handleTouchEnd);
        el.removeEventListener("pointerdown", handleTouchStart);
        el.removeEventListener("pointerup", handleTouchEnd);
        el.removeEventListener("pointercancel", handleTouchEnd);
        el.removeEventListener("wheel", handleWheel);
      }
    };
  }, [id, speed, initialDelay, userScrollPauseDuration, pauseOnHover, pauseOnTouch]);

  return scrollRef;
}
