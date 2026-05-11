import { Component, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import CleanoraScene from './CleanoraScene.jsx';

function HeroFallbackVisual() {
  return (
    <div className="grid h-full min-h-[320px] place-items-center rounded-lg bg-gradient-to-br from-cleanora-mist via-white to-emerald-50 p-6">
      <div className="relative h-56 w-56 rounded-full bg-cleanora-mint/10 shadow-soft">
        <div className="absolute left-1/2 top-8 h-32 w-20 -translate-x-1/2 rounded-b-3xl rounded-t-lg bg-white shadow-soft" />
        <div className="absolute left-[52%] top-3 h-8 w-28 -translate-x-1/2 rounded-lg bg-cleanora-ink" />
        <div className="absolute bottom-10 left-10 h-10 w-10 rounded-full bg-cleanora-mint/30" />
        <div className="absolute right-9 top-20 h-7 w-7 rounded-full bg-cleanora-aqua/20" />
        <div className="absolute bottom-16 right-14 h-4 w-4 rounded-full bg-white shadow-sm" />
      </div>
    </div>
  );
}

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <HeroFallbackVisual />;
    }

    return this.props.children;
  }
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    setReducedMotion(query.matches);

    function handleChange(event) {
      setReducedMotion(event.matches);
    }

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, []);

  return reducedMotion;
}

function Hero3DCanvas() {
  const reducedMotion = useReducedMotionPreference();
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative h-[320px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft sm:h-[420px] lg:h-[520px]">
      {!isReady && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-cleanora-mist text-sm font-bold text-cleanora-ink">
          Preparing Cleanora 3D scene...
        </div>
      )}

      <CanvasErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [3.7, 2.35, 4.4], fov: 42 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          fallback={<HeroFallbackVisual />}
          onCreated={({ gl }) => {
            gl.setClearColor('#ffffff', 0);
            setIsReady(true);
          }}
        >
          <Suspense fallback={null}>
            <CleanoraScene reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-lg border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cleanora-mint">Live service platform</p>
        <p className="mt-1 text-sm font-bold text-cleanora-ink">Book, manage, and complete cleaning requests.</p>
      </div>
    </div>
  );
}

export default Hero3DCanvas;
