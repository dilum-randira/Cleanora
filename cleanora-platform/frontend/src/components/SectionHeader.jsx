function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cleanora-mint">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-cleanora-ink sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      )}
    </div>
  );
}

export default SectionHeader;
