import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
  contentClassName
}) => {
  return (
    <div
      className={cn(
        'relative z-0 flex min-h-[22rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-cleanora-ink',
        className
      )}>
      <div
        className="relative isolate z-0 flex w-full flex-1 scale-y-110 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.35, width: '12rem' }}
          whileInView={{ opacity: 0.9, width: '28rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-44 w-[18rem] overflow-visible from-cleanora-mint via-transparent to-transparent text-white sm:w-[28rem] [--conic-position:from_70deg_at_center_top]">
          <div
            className="absolute bottom-0 left-0 z-20 h-32 w-full bg-cleanora-ink [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div
            className="absolute bottom-0 left-0 z-20 h-full w-32 bg-cleanora-ink [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.35, width: '12rem' }}
          whileInView={{ opacity: 0.9, width: '28rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-44 w-[18rem] from-transparent via-transparent to-cleanora-mint text-white sm:w-[28rem] [--conic-position:from_290deg_at_center_top]">
          <div
            className="absolute bottom-0 right-0 z-20 h-full w-32 bg-cleanora-ink [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div
            className="absolute bottom-0 right-0 z-20 h-32 w-full bg-cleanora-ink [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div
          className="absolute top-1/2 h-40 w-full translate-y-8 scale-x-150 bg-cleanora-ink blur-2xl"></div>
        <div
          className="absolute top-1/2 z-50 h-40 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div
          className="absolute inset-auto z-50 h-28 w-[18rem] -translate-y-1/2 rounded-full bg-cleanora-mint opacity-35 blur-3xl sm:w-[24rem]"></div>
        <motion.div
          initial={{ width: '7rem' }}
          whileInView={{ width: '14rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-30 h-28 w-56 -translate-y-[5rem] rounded-full bg-cleanora-mint blur-2xl"></motion.div>
        <motion.div
          initial={{ width: '12rem' }}
          whileInView={{ width: '28rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-50 h-0.5 w-[18rem] -translate-y-[6rem] bg-cleanora-mint sm:w-[28rem]"></motion.div>

        <div
          className="absolute inset-auto z-40 h-36 w-full -translate-y-[10rem] bg-cleanora-ink"></div>
      </div>
      <div
        className={cn(
          'relative z-50 flex -translate-y-28 flex-col items-center px-5 text-center sm:-translate-y-32',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
