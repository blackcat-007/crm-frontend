"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function TiltPieChart() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState({ ring: null, segment: null });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    // Amplified tilt angles for more depth
    const rotateX = Math.max(-18, Math.min(18, offsetY / 8));
    const rotateY = Math.max(-18, Math.min(18, -offsetX / 8));
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const ringColors = [
    ["#3B82F6", "#60A5FA", "#93C5FD"], // Blue tones
    ["#10B981", "#34D399", "#6EE7B7"], // Green tones
    ["#6366F1", "#818CF8", "#A5B4FC"], // Indigo tones
  ];

  return (
    <motion.div
      ref={ref}
      className="relative w-[300px] h-[300px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 10,
        mass: 0.6,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
    >
      {ringColors.map((colors, ringIndex) => {
        const ringRadius = 60 + ringIndex * 25;
        const circumference = 2 * Math.PI * ringRadius;
        const segmentSize = circumference / 3;

        return (
          <motion.svg
            key={ringIndex}
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="absolute"
            style={{
              transform: `translateZ(${ringIndex * 30}px)`, // adds true 3D stacking depth
            }}
          >
            {[0, 1, 2].map((segmentIndex) => {
              const isHovered =
                hovered.ring === ringIndex && hovered.segment === segmentIndex;

              return (
                <motion.circle
                  key={segmentIndex}
                  r={ringRadius}
                  cx="160"
                  cy="160"
                  fill="transparent"
                  stroke={colors[segmentIndex]}
                  strokeWidth={isHovered ? 22 : 16}
                  strokeDasharray={`${segmentSize - 5} ${
                    circumference - segmentSize
                  }`}
                  strokeDashoffset={-segmentIndex * segmentSize}
                  style={{
                    transformOrigin: "50% 50%",
                    rotate: "-90deg",
                    filter: isHovered
                      ? `drop-shadow(0 0 22px ${colors[segmentIndex]})`
                      : `drop-shadow(0 0 8px ${colors[segmentIndex]}55)`,
                    transition: "all 0.3s ease-out",
                  }}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: -segmentIndex * segmentSize }}
                  transition={{
                    duration: 1.4,
                    delay: ringIndex * 0.2 + segmentIndex * 0.1,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() =>
                    setHovered({ ring: ringIndex, segment: segmentIndex })
                  }
                  onMouseLeave={() => setHovered({ ring: null, segment: null })}
                />
              );
            })}
          </motion.svg>
        );
      })}

    
    </motion.div>
  );
}
