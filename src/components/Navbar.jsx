"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 200],
    ["rgba(0,0,0,0)", "rgba(0, 30, 60, 0.5)"]
  );
  const blur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(10px)"]);

  return (
    <motion.nav
      style={{
        background,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
      }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white border-b border-blue-300/10"
    >
      {/* === LOGO === */}
      <motion.div
        className="text-2xl font-bold tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="flex items-center gap-2">
          <motion.span
            className="text-blue-400"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            ⚙️
          </motion.span>
          CRM<span className="text-blue-300">Nexus</span>
        </Link>
      </motion.div>

      
      {/* === BUTTONS === */}
      <div className="hidden md:flex items-center gap-4">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 10px rgba(0,153,255,0.6)",
          }}
          
          className="px-4 py-2 border border-blue-300/40 rounded-full hover:bg-blue-800/40 transition-all"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px rgba(0,153,255,0.8)",
          }}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-400 rounded-full font-semibold transition-all"
            onClick={() => router.push("/auth/register")}
        >
          Register
        </motion.button>
      </div>

      {/* === MOBILE MENU === */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="md:hidden flex items-center text-2xl cursor-pointer"
      >
        ☰
      </motion.div>
    </motion.nav>
  );
}
