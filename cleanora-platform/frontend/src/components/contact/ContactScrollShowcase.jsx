import React from 'react';
import { ContainerScroll } from '../ui/container-scroll-animation.jsx';

const fallbackImageUrl =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80';

function ContactScrollShowcase() {
  return (
    <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white via-cleanora-porcelain to-white">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cleanora-mint">
              Contact & Location
            </p>
            <h2 className="mx-auto mt-4 max-w-[21rem] break-words text-3xl font-black leading-tight text-cleanora-ink sm:max-w-3xl sm:text-4xl md:text-6xl">
              Reach Cleanora
              <br />
              Faster
              <br />
              <span className="text-cleanora-mint">Contact & Location</span>
            </h2>
          </>
        }
      >
        <img
          src="/images/contact-map-preview.png"
          alt="Cleanora contact and location preview"
          height={720}
          width={1400}
          className="mx-auto h-full w-full object-cover object-left-top"
          draggable={false}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImageUrl;
          }}
        />
      </ContainerScroll>
    </div>
  );
}

export default ContactScrollShowcase;
