"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/utils/apiRoutes";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${apiRoutes.users}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // send cookies
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user.name));
      localStorage.setItem("email", JSON.stringify(data.user.email));
      localStorage.setItem("role", JSON.stringify(data.user.role));
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white overflow-hidden animated-gradient">
      {/* Moving background texture */}
      <div className="absolute inset-0 z-0 bg-texture animate-bgMove opacity-25" />

      {/* SVG filter for distortion */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.02 0.02"
          numOctaves={2}
          seed={92}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale={110}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
      </svg>

      {/* Glass Card */}
      <div className="liquid-glass-card z-10">
        <div className="card-content">
          <h2>Welcome Back</h2>
          <p>Log in to your CRM account</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4 w-full">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button type="submit" disabled={loading} className="glass-button mt-2">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="text-blue-300 hover:text-blue-200 cursor-pointer underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>

       <div
  dangerouslySetInnerHTML={{
    __html: `
      <style>
        /* === Moving Background Image === */
        .bg-texture {
          background-image: url("/bgtexture.jpg");
          background-size: cover;
          background-repeat: repeat-y;
          background-position: center bottom;
        }

        @keyframes bgMove {
          0% {
            background-position: center bottom;
          }
          100% {
            background-position: center top;
          }
        }

        .animate-bgMove {
          animation: bgMove 60s linear infinite;
        }

        /* === Glass Card === */
        .liquid-glass-card {
          position: relative;
          width: 400px;
          min-height: 450px;
          border-radius: 28px;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .liquid-glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 28px;
          box-shadow: inset 0 0 12px -2px rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          pointer-events: none;
        }

        .liquid-glass-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 28px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          filter: url(#glass-distortion);
          -webkit-filter: url(#glass-distortion);
          pointer-events: none;
          isolation: isolate;
        }

        .card-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px;
          color: white;
        }

        .card-content h2 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .card-content p {
          opacity: 0.8;
          margin-bottom: 16px;
        }

        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 10px 14px;
          border-radius: 10px;
          outline: none;
          color: white;
          transition: all 0.3s ease;
        }

        .input-field:focus {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(173, 216, 230, 0.7);
          box-shadow: 0 0 10px rgba(100, 180, 255, 0.4);
        }

        .glass-button {
          background: rgba(0, 123, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .glass-button:hover {
          background: rgba(0, 180, 255, 0.6);
          transform: translateY(-1px);
          box-shadow: 0 0 10px rgba(0, 180, 255, 0.4);
        }
      </style>
    `,
  }}
/>
    </div>
  );
}
