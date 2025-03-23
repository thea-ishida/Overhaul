"use client";

import React, { useRef, useState, useEffect } from "react";

const Magnifier: React.FC = () => {
  const lensRef = useRef<HTMLDivElement>(null);
  const zoom = 2;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveLens = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      if (lensRef.current) {
        lensRef.current.style.left = `${x - 75}px`;
        lensRef.current.style.top = `${y - 75}px`;
      }
    };

    document.addEventListener("mousemove", moveLens);
    return () => document.removeEventListener("mousemove", moveLens);
  }, []);

  return (
    <div
      ref={lensRef}
      className="fixed w-[150px] h-[150px] pointer-events-none z-[9999]"
      style={{
        left: `${position.x - 75}px`,
        top: `${position.y - 75}px`,
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid #000",
        boxShadow: "0 0 8px rgba(0,0,0,0.3)", // soft glow
        // backdropFilter: "blur(1px)", // optional subtle blur
        backgroundColor: "rgba(255,255,255,0.05)", // translucent look
      }}
    >
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: `${position.x}px ${position.y}px`,
          position: "absolute",
          left: `-${position.x}px`,
          top: `-${position.y}px`,
        }}
      >
        {}
      </div>
    </div>
  );
};

export default Magnifier;
