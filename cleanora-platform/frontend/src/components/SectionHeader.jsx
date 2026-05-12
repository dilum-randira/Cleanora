function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cleanora-mint sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black leading-tight tracking-tight text-cleanora-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
      )}
    </div>
  );
}

export default SectionHeader;
