import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils.js';

export const Compare = ({
  firstImage = '',
  secondImage = '',
  className,
  firstImageClassName,
  secondImageClassName,
  initialSliderPercentage = 50,
  slideMode = 'hover',
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000
}) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef(null);

  const autoplayRef = useRef(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16); // ~60fps
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function mouseEnterHandler() {
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    if (slideMode === 'hover') {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === 'drag') {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(() => {
    if (slideMode === 'drag') {
      setIsDragging(true);
    }
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === 'drag') {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback((clientX) => {
    if (!sliderRef.current) return;
    if (slideMode === 'hover' || (slideMode === 'drag' && isDragging)) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      requestAnimationFrame(() => {
        setSliderXPercent(Math.max(0, Math.min(100, percent)));
      });
    }
  }, [slideMode, isDragging]);

  const handleMouseDown = useCallback((e) => handleStart(e.clientX), [handleStart]);
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback((e) => handleMove(e.clientX), [handleMove]);

  const handleTouchStart = useCallback((e) => {
    if (!autoplay) {
      handleStart(e.touches[0].clientX);
    }
  }, [handleStart, autoplay]);

  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd();
    }
  }, [handleEnd, autoplay]);

  const handleTouchMove = useCallback((e) => {
    if (!autoplay) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove, autoplay]);

  return (
    <div
      ref={sliderRef}
      className={cn('h-[400px] w-full overflow-hidden', className)}
      style={{
        position: 'relative',
        cursor: slideMode === 'drag' ? 'grab' : 'col-resize',
        touchAction: 'none',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}>
      <AnimatePresence initial={false}>
        <motion.div
          className="absolute top-0 z-30 m-auto h-full w-px bg-gradient-to-b from-transparent from-[5%] via-cleanora-mint to-transparent to-[95%]"
          style={{
            left: `${sliderXPercent}%`,
            top: '0',
            zIndex: 40,
          }}
          transition={{ duration: 0 }}>
          <div
            className="absolute left-0 top-1/2 z-20 h-full w-28 -translate-y-1/2 bg-gradient-to-r from-cleanora-mint/40 via-transparent to-transparent opacity-60 [mask-image:radial-gradient(100px_at_left,white,transparent)]" />
          <div
            className="absolute left-0 top-1/2 z-10 h-1/2 w-10 -translate-y-1/2 bg-gradient-to-r from-cleanora-mint via-transparent to-transparent opacity-100 [mask-image:radial-gradient(50px_at_left,white,transparent)]" />
          {showHandlebar && (
            <div
              className="absolute -right-3 top-1/2 z-30 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white text-cleanora-ink shadow-lg">
              <span className="h-3.5 w-0.5 rounded-full bg-cleanora-ink/70" />
              <span className="ml-1 h-3.5 w-0.5 rounded-full bg-cleanora-ink/70" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div
        className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                'absolute inset-0 z-20 h-full w-full shrink-0 select-none overflow-hidden rounded-2xl',
                firstImageClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}>
              <img
                alt="first image"
                src={firstImage}
                className={cn(
                  'absolute inset-0 z-20 h-full w-full shrink-0 select-none rounded-2xl',
                  firstImageClassName
                )}
                draggable={false} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.img
            className={cn(
              'absolute left-0 top-0 z-[19] h-full w-full select-none rounded-2xl',
              secondImageClassName
            )}
            alt="second image"
            src={secondImage}
            draggable={false} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

