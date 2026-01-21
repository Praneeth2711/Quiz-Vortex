import { useRef, useState, useEffect } from 'react';

interface MousePos {
  x: number;
  y: number;
}

interface ElementPos {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useMagneticButton = (strength: number = 30) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovering) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - elementCenterX;
      const distanceY = e.clientY - elementCenterY;

      // Calculate distance from cursor to element
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // If cursor is within magnetic range
      if (distance < strength * 3) {
        // Calculate pull direction (normalized)
        const angle = Math.atan2(distanceY, distanceX);
        const pullX = Math.cos(angle) * Math.min(distance / 2, strength);
        const pullY = Math.sin(angle) * Math.min(distance / 2, strength);

        setOffset({ x: pullX, y: pullY });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering, strength]);

  return {
    ref,
    offset,
    setIsHovering,
  };
};
