"use client";

import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

const Magnifier: React.FC = () => {
  const lensRef = useRef<HTMLDivElement>(null);
  const zoom = 1.5; // Zoom level (1.5x)
  const lensSize = 150; // Size of the magnifier lens
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pageImage, setPageImage] = useState<string | null>(null); // Stores the captured page image

  // Capture the page as an image
  useEffect(() => {
    const capturePage = async () => {
      const canvas = await html2canvas(document.body);
      const image = canvas.toDataURL("image/png");
      setPageImage(image); // Set the captured image as the source
    };

    capturePage();
  }, []);

  // Move the lens with the mouse
  useEffect(() => {
    const moveLens = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      if (lensRef.current) {
        // Center the lens on the cursor
        lensRef.current.style.left = `${x - lensSize / 2}px`;
        lensRef.current.style.top = `${y - lensSize / 2}px`;
      }
    };

    document.addEventListener("mousemove", moveLens);
    return () => document.removeEventListener("mousemove", moveLens);
  }, []);

  return (
    <>
      {/* Magnifier Lens */}
      <div
        ref={lensRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: `${lensSize}px`,
          height: `${lensSize}px`,
          left: `${position.x - lensSize / 2}px`,
          top: `${position.y - lensSize / 2}px`,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #000",
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      >
        {pageImage && (
          <div
            style={{
              width: `${window.innerWidth}px`,
              height: `${window.innerHeight}px`,
              backgroundImage: `url(${pageImage})`,
              backgroundSize: `${window.innerWidth * zoom}px ${window.innerHeight * zoom}px`,
              backgroundPosition: `-${position.x * zoom - 160 + lensSize / 2}px -${position.y * zoom - 120 + lensSize / 2}px`,
              transform: `scale(${zoom})`,
              transformOrigin: "0 0",
            }}
          />
        )}
      </div>
    </>
  );
};

export default Magnifier;