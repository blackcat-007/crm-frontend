"use client";
import {useRef,useState} from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import GrowthAnim from "@/lottie/GrowthChart.json";
import DashboardAnim from "@/lottie/Dashboard.json";
import TeamworkAnim from "@/lottie/TeamWork.json";
import BarChart from "@/components/BarChart";
import TiltPieChart from "@/components/TiltPieChart";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/navigation";
const pieData = [
  { label: "Active", value: 40, color: "#3B82F6" },
  { label: "Inactive", value: 30, color: "#6366F1" },
  { label: "Pending", value: 30, color: "#10B981" },
];

// Slide-in variants
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};
const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

export default function CRMHome() {
   const router = useRouter();
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [featureRef, featureInView] = useInView({ threshold: 0.3 });
  const [dashRef, dashInView] = useInView({ threshold: 0.4 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3 });

  const { scrollYProgress } = useScroll();
  const heroLottieY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const featureLottieY = useTransform(scrollYProgress, [0.2, 0.5], [0, -40]);
  const dashboardY = useTransform(scrollYProgress, [0.4, 0.7], [0, -50]);
 

  return (
    <div className="bg-gradient-to-br from-[#003366] via-[#00509e] to-[#007bff] text-white overflow-hidden ">
      <Navbar/>
  {/* === HERO === */}
{/* === HERO === */}
<section className="relative mt-48 sm:mt-0 flex flex-col md:flex-row items-center justify-center min-h-[90vh] md:h-screen px-6 sm:px-10 md:px-20 gap-12 md:gap-16 text-center md:text-left overflow-hidden">

  {/* Background Animation */}
  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
    <Lottie animationData={GrowthAnim} loop />
  </div>

  {/* === LEFT SIDE TEXT === */}
  <div className="flex-1 z-10 flex flex-col items-center md:items-start max-w-xl">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 sm:mb-6 leading-tight text-white">
      Manage Customers <br />
      <span className="text-blue-300">Build Relationships</span>
    </h1>

    <p className="text-blue-100 text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg mb-8">
      A modern CRM that simplifies workflow, tracks leads, and boosts growth.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
      <motion.button
        whileHover={{ scale: 1.08, boxShadow: "0px 0px 25px rgba(59,130,246,0.6)" }}
        className="px-7 py-3 bg-blue-500 hover:bg-blue-400 rounded-full text-base sm:text-lg font-semibold shadow-md transition-all duration-300"
        onClick={() => router.push("/auth/register")}
      >
        Get Started Free
      </motion.button>

  
    </div>
  </div>

  {/* === RIGHT SIDE VISUALS === */}
  <div className="flex-1 flex flex-col sm:flex-row justify-center md:justify-end items-center gap-8 md:gap-10 z-10 w-full sm:w-auto mt-10 md:mt-0">
    {/* === Vertical Bar Graph === */}
    <div className="scale-90 sm:scale-100 md:scale-105">
      <BarChart />
    </div>

    {/* === Interactive 3D Pie Chart === */}
    <div className="scale-90 sm:scale-100 md:scale-110">
      <TiltPieChart />
    </div>
  </div>
</section>


      {/* === FEATURES === */}
      <section
        ref={featureRef}
        className="relative py-32 px-6 flex flex-col items-center text-center overflow-hidden"
      >
        <motion.div style={{ y: featureLottieY }} className="absolute inset-0 opacity-10 pointer-events-none">
          <Lottie animationData={TeamworkAnim} loop />
        </motion.div>

        <motion.h2
          variants={slideInLeft}
          initial="hidden"
          animate={featureInView ? "visible" : "hidden"}
          className="text-5xl font-bold text-blue-200 mb-16 z-10"
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl z-10">
          {[
            {
              title: "Smart Lead Tracking",
              desc: "Automatically track and categorize leads based on engagement.",
            },
            {
              title: "AI-Powered Analytics",
              desc: "Make better decisions with visual insights and trend detection.",
            },
            {
              title: "Seamless Integrations",
              desc: "Integrate your favorite tools like Slack, Gmail, and more.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              animate={featureInView ? "visible" : "hidden"}
              custom={i * 0.3 + 1}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-8 bg-white/10 rounded-3xl border border-blue-300/20 backdrop-blur-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">{f.title}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === DASHBOARD === */}
      <section
        ref={dashRef}
        className="relative py-40 px-6 flex flex-col items-center text-center overflow-hidden"
      >
        <motion.div style={{ y: dashboardY }} className="absolute inset-0 opacity-15 pointer-events-none">
          <Lottie animationData={DashboardAnim} loop />
        </motion.div>

        <motion.h2
          variants={slideInLeft}
          initial="hidden"
          animate={dashInView ? "visible" : "hidden"}
          className="text-5xl font-bold text-blue-200 mb-10 z-10"
        >
          Visualize Everything
        </motion.h2>
        <motion.p
          variants={slideInRight}
          initial="hidden"
          animate={dashInView ? "visible" : "hidden"}
          custom={1.2}
          className="text-blue-100 max-w-2xl mb-10 z-10"
        >
          Real-time insights, metrics, and interactive dashboards to help your
          business grow confidently.
        </motion.p>
        <motion.img
          src="/dashboard-preview.png"
          alt="CRM Dashboard Preview"
          className="rounded-3xl border border-blue-300/20 shadow-2xl max-w-4xl z-10"
          initial={{ opacity: 0, x: -100 }}
          animate={dashInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* === CTA === */}
      <section
        ref={ctaRef}
        className="py-40 text-center bg-blue-950/40 backdrop-blur-lg relative animated-gradient"
      >
        <motion.h2
          variants={slideInLeft}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="text-5xl font-bold text-blue-200 mb-6 z-10"
        >
          Ready to Elevate Your Business?
        </motion.h2>
        <motion.p
          variants={slideInRight}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          custom={1.2}
          className="text-blue-100 mb-10 max-w-2xl mx-auto z-10"
        >
          Start free today. Experience automation, analytics, and growth — all in
          one CRM platform built for ambitious teams.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-10 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full shadow-lg z-10"
          onClick={() => router.push("/auth/register")}
        >
          Get Started Now
        </motion.button>
      </section>
    </div>
  );
}
