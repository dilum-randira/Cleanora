import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils.js';

export const ContainerScroll = ({
  titleComponent,
  children,
  className = '',
  contentClassName = '',
  cardClassName = '',
  innerClassName = ''
}) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : isMobile ? [8, 0] : [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.78, 0.9] : [1.03, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -80]);

  return (
    <div
      className={cn(
        'relative flex min-h-[50rem] items-start justify-center overflow-hidden px-2 py-10 md:min-h-[74rem] md:items-center md:px-10',
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn('relative w-full py-4 md:py-24', contentClassName)}
        style={{
          perspective: '1000px'
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} scale={scale} className={cardClassName} innerClassName={innerClassName}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const ScrollCard = ({ rotate, scale, children, className = '', innerClassName = '' }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: '0 28px 80px rgba(20, 33, 61, 0.16)'
      }}
      className={cn(
        'mx-auto mt-6 h-[30rem] w-[86vw] max-w-5xl rounded-[28px] border border-slate-200 bg-white p-2 shadow-soft sm:w-full md:mt-14 md:h-[40rem] md:p-4',
        className
      )}
    >
      <div className={cn('h-full w-full overflow-hidden rounded-[22px] bg-cleanora-mist', innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
};
