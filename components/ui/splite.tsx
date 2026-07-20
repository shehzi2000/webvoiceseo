'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const removeWatermark = () => {
      if (!containerRef.current) return;
      
      // Target standard react-spline elements containing the link
      const links = containerRef.current.querySelectorAll('a[href*="spline.design"]');
      links.forEach((link) => {
        (link as HTMLElement).style.display = 'none';
        (link as HTMLElement).style.opacity = '0';
        (link as HTMLElement).style.pointerEvents = 'none';
        
        let parent = link.parentElement;
        while (parent && parent !== containerRef.current) {
          const style = window.getComputedStyle(parent);
          if (style.position === 'absolute' || style.position === 'fixed') {
            parent.style.display = 'none';
            parent.style.opacity = '0';
            parent.style.pointerEvents = 'none';
            break;
          }
          parent = parent.parentElement;
        }
      });

      // Target shadow roots for spline-viewer elements if any
      const splineViewers = containerRef.current.querySelectorAll('spline-viewer');
      splineViewers.forEach((viewer) => {
        if (viewer.shadowRoot) {
          const logo = viewer.shadowRoot.getElementById('logo');
          if (logo) {
            (logo as HTMLElement).style.display = 'none';
            (logo as HTMLElement).style.opacity = '0';
          }
          const badge = viewer.shadowRoot.querySelector('a[href*="spline.design"]');
          if (badge) {
            (badge as HTMLElement).style.display = 'none';
            (badge as HTMLElement).style.opacity = '0';
            const parent = badge.parentElement;
            if (parent) {
              parent.style.display = 'none';
              parent.style.opacity = '0';
            }
          }
        }
      });
    };

    removeWatermark();

    const observer = new MutationObserver(() => {
      removeWatermark();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    const interval = setInterval(removeWatermark, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            <span className="loader animate-pulse text-neutral-500 text-xs font-mono">Loading scene...</span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </div>
  )
}
