import React from "react";

const TestMorph = () => {
  return (
    <div className="liquid-wrapper">
      {/* SVG filters for distortion */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Primary animated distortion filter */}
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="3"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.015 0.02; 0.02 0.03; 0.015 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="80"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Secondary filter (for subtle layer blending) */}
          <filter id="glass-distortion-2" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.015"
              numOctaves="2"
              seed="8"
              result="noise2"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                values="0.02 0.015; 0.03 0.02; 0.02 0.015"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise2"
              scale="60"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* Card */}
      <div className="liquid-glass-card">
        <div className="card-content">
          <h2>Liquid Glass Card</h2>
          <p>Beautiful distorted glass effect</p>
          <button className="glass-button">Get Started</button>
        </div>
      </div>

      <style jsx>{`
        .liquid-wrapper {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top left, #1e2a78, #0d1a2d 60%);
        }

        /* Card Base */
        .liquid-glass-card {
          position: relative;
          width: 400px;
          height: 300px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          isolation: isolate;
          animation: distortionSwitch 10s infinite alternate ease-in-out;
        }

        /* Distorted glass back layer */
        .liquid-glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(120deg, rgba(255, 0, 200, 0.2), rgba(0, 200, 255, 0.2));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          mix-blend-mode: screen;
          z-index: 0;
          filter: url(#glass-distortion);
        }

        /* Blend with secondary moving filter */
        .liquid-glass-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 28px;
          mix-blend-mode: overlay;
          filter: url(#glass-distortion-2);
          opacity: 0.6;
          z-index: 1;
        }

        /* Text & Button */
        .card-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 24px;
        }

        .card-content h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .card-content p {
          opacity: 0.85;
          margin-bottom: 24px;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 12px 24px;
          color: white;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Switch filter layers over time */
        @keyframes distortionSwitch {
          0% {
            filter: url(#glass-distortion);
          }
          100% {
            filter: url(#glass-distortion-2);
          }
        }
      `}</style>
    </div>
  );
};

export default TestMorph;
