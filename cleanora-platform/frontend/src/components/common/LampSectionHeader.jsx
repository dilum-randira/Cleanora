import { motion } from 'motion/react';
import { LampContainer } from '../ui/lamp.jsx';
import { cn } from '../../lib/utils.js';

function LampSectionHeader({ eyebrow, title, description, highlight, className }) {
  return (
    <div className={cn('mx-auto mb-10 max-w-7xl px-0 sm:mb-12', className)}>
      <LampContainer
        className="min-h-[260px] rounded-3xl border border-white/10 shadow-2xl shadow-cleanora-ink/20 sm:min-h-[280px] md:min-h-[300px]"
        contentClassName="absolute inset-0 translate-y-0 justify-center px-5 py-8 sm:translate-y-0 sm:px-8 md:py-10"
      >
        <motion.div
          initial={{ opacity: 0.65, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mx-auto w-full max-w-4xl"
        >
          {eyebrow && (
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cleanora-mint">
              {eyebrow}
            </p>
          )}
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {highlight && (
            <p className="mx-auto mt-2 max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-teal-300 sm:text-3xl md:text-5xl">
              {highlight}
            </p>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 md:text-base md:leading-7">
              {description}
            </p>
          )}
        </motion.div>
      </LampContainer>
    </div>
  );
}

export default LampSectionHeader;
