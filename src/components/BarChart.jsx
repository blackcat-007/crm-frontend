"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const barData = [
  { label: "Leads", value: 80 },
  { label: "Customers", value: 60 },
  { label: "Revenue", value: 90 },
];

export default function BarChart() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoverHeights, setHoverHeights] = useState(
    Array(barData.length).fill(0)
  );

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotateX = Math.max(-6, Math.min(6, offsetY / 15));
    const rotateY = Math.max(-6, Math.min(6, -offsetX / 15));
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleBarMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const heightPercent = Math.max(
      0,
      Math.min(100, 100 - (mouseY / rect.height) * 100)
    );
    setHoverHeights((prev) => {
      const newHeights = [...prev];
      newHeights[index] = heightPercent;
      return newHeights;
    });
  };

  const colorFamilies = ["#3B82F6", "#10B981", "#8B5CF6"];

  return (
    <motion.div
      ref={ref}
      className="relative w-fit flex gap-8 h-80 items-end justify-center perspective-1000 cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
    >
      {barData.map((bar, i) => {
        const color = colorFamilies[i % colorFamilies.length];
        return (
          <motion.div
            key={i}
            onMouseMove={(e) => handleBarMouseMove(e, i)}
            className="relative w-14 bg-white/10 rounded-t-xl flex flex-col justify-end overflow-hidden border border-white/10 h-full"
          >
            {/* Animated bar fill */}
            <motion.div
              style={{
                height: `${hoverHeights[i]}%`,
                background: `linear-gradient(to top, ${color}, ${color}CC)`,
                borderRadius: "0.75rem 0.75rem 0 0",
              }}
              animate={{
                height: `${hoverHeights[i]}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="w-full absolute bottom-0 left-0"
            />
            {/* Label */}
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-white/80 font-medium">
              {bar.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
