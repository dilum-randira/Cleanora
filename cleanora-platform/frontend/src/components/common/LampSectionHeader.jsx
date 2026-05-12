import { motion } from 'motion/react';
import { LampContainer } from '../ui/lamp.jsx';
import { cn } from '../../lib/utils.js';

function LampSectionHeader({ eyebrow, title, description, highlight, className }) {
  return (
    <div className={cn('mx-auto mb-10 max-w-7xl overflow-hidden px-0 sm:mb-12', className)}>
      <LampContainer className="min-h-[14rem] rounded-3xl border border-white/10 shadow-2xl shadow-cleanora-ink/20 sm:min-h-[16rem] md:min-h-[18rem]">
        <motion.div
          initial={{ opacity: 0.65, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mx-auto w-full max-w-4xl px-4"
        >
          {eyebrow && (
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cleanora-mint sm:text-sm">
              {eyebrow}
            </p>
          )}
          <h2 className="mx-auto mt-4 max-w-[17rem] break-words text-2xl font-black leading-tight tracking-tight text-white min-[420px]:max-w-3xl min-[420px]:text-3xl sm:text-4xl md:text-5xl">
            {title}
            {highlight && (
              <>
                <br />
                <span className="text-cleanora-mint">{highlight}</span>
              </>
            )}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
              {description}
            </p>
          )}
        </motion.div>
      </LampContainer>
    </div>
  );
}

export default LampSectionHeader;
