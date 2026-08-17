import { useCallback, useMemo, useRef, useState, type TouchEvent } from 'react';

const SWIPE_THRESHOLD_PX = 48;

export function useDotCarousel(slideCount: number) {
  const [storedIndex, setActiveIndexState] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // A shrinking slide set (filtered data, responsive grouping) can leave the stored
  // index out of range; fall back to the first slide instead of syncing via effect.
  const activeIndex = slideCount > 0 && storedIndex >= slideCount ? 0 : storedIndex;

  const setActiveIndex = useCallback(
    (index: number) => {
      if (slideCount <= 0) return;
      setActiveIndexState(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goPrev = useCallback(() => {
    setActiveIndex(activeIndex - 1);
  }, [activeIndex, setActiveIndex]);

  const goNext = useCallback(() => {
    setActiveIndex(activeIndex + 1);
  }, [activeIndex, setActiveIndex]);

  const swipeHandlers = useMemo(() => {
    const onTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartX.current === null || slideCount <= 1) return;

      const endX = event.changedTouches[0]?.clientX;
      if (endX === undefined) return;

      const delta = endX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      if (delta < 0) goNext();
      else goPrev();
    };

    return { onTouchStart, onTouchEnd };
  }, [goNext, goPrev, slideCount]);

  return {
    activeIndex,
    setActiveIndex,
    goPrev,
    goNext,
    swipeHandlers,
  };
}
