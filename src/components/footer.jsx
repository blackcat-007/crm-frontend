"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer1() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <footer className="relative bg-gradient-to-t from-blue-900 via-blue-950 to-black text-gray-300 py-12 px-6 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8"
      >
        {/* === Brand Section === */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">CRM Nexus</h2>
          <p className="text-sm text-gray-400 max-w-md">
            Empowering businesses to connect better with their customers.
            Automate workflows, manage leads, and grow relationships — all in one platform.
          </p>
        </div>

        {/* === Links === */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
          <a href="#resources" className="hover:text-blue-400 transition">Resources</a>
          <a href="#about" className="hover:text-blue-400 transition">About</a>
        </div>
      </motion.div>

      {/* === Socials + Copyright === */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto mt-10 border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        {/* Socials */}
        <div className="flex gap-5 text-xl">
          {[FaTwitter, FaLinkedin, FaGithub, FaEnvelope].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2, color: "#3b82f6" }}
              className="transition-all cursor-pointer"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center sm:text-right">
          © {new Date().getFullYear()} CRM Nexus. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
