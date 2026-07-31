import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  // Position state (smooth lerping)
  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const springStretch = useRef(0);
  const springVel = useRef(0);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable interactive elements
    const handleOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('.cursor-pointer') ||
          target.closest('[role="button"]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleOver, { passive: true });

    let animationFrameId;

    const render = () => {
      // Lerp position for liquid paintball physics movement
      const ease = 0.16;
      const dx = targetPos.current.x - pos.current.x;
      const dy = targetPos.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      // Calculate velocity & speed
      velocity.current = {
        x: dx * 0.2,
        y: dy * 0.2,
      };

      const speed = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);
      const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);

      // Spring physics for jelly snapback bounce when stopping
      const targetStretch = Math.min(speed * 0.045, 0.85);
      const force = (targetStretch - springStretch.current) * 0.2;
      springVel.current = (springVel.current + force) * 0.78; // Damping
      springStretch.current += springVel.current;

      const stretch = Math.max(0, springStretch.current);
      const scaleX = 1 + stretch * 1.1;
      const scaleY = Math.max(0.4, 1 / (1 + stretch * 0.8));

      // Organic liquid border-radius morphing
      const r1 = Math.min(75, 50 + stretch * 28);
      const r2 = Math.max(25, 50 - stretch * 22);

      if (cursorRef.current) {
        const pressScale = isPressed ? 0.8 : 1;
        const hoverScale = isHovered ? 1.25 : 1;

        cursorRef.current.style.borderRadius = `${r1}% ${r2}% ${r1}% ${r2}% / ${r2}% ${r1}% ${r2}% ${r1}%`;
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX * hoverScale * pressScale}, ${scaleY * hoverScale * pressScale})`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isPressed]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Outer Large Liquid Paintball Bubble (#24201E) */}
      <div
        ref={cursorRef}
        className={`absolute top-0 left-0 w-20 h-20 bg-[#24201E]/85 backdrop-blur-[2px] border border-[#24201E]/40 shadow-[0_8px_30px_rgba(36,32,30,0.4)] transition-colors duration-200 ${
          isHovered ? 'bg-[#24201E]/95 border-amber-500/50 shadow-[0_10px_35px_rgba(36,32,30,0.6)]' : ''
        }`}
        style={{
          willChange: 'transform, border-radius',
          transformOrigin: 'center center',
        }}
      />

      {/* Precise focal pointer dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#24201E] border border-white/40 shadow-xs"
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  );
}
