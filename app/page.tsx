"use client";

// pages/index.js  (or app/page.js if using App Router)
import { motion } from "framer-motion";
import { useState } from "react";
import GlassTexture from '../components/GlassTexture';
import GameHeader from '../components/GameHeader';

function ContactLink() {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "cutcliffecharlie@gmail.com";

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative inline-block">
      <a
        href="#!"
        className="text-gray-400 hover:text-white cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {hovered ? email : "Contact"}
      </a>

      {copied && (
        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
          Copied!
        </span>
      )}
    </div>
  );
}

export default function Home() {<GameHeader />;
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-4 text-white-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Charles Cutcliffe <br></br> Portfolio
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A visual showcase
        </motion.p>
        {/* ================= CTA BUTTON ================= */}
        <motion.a
          href="#projects"
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Web Design
        </motion.a>
        <motion.a
          href="#projects"
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          AI Generated Artwork
        </motion.a>
        <motion.a
          href="#about"
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          About Me
        </motion.a>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section id="projects" className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Web Design
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Example project card */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-2">lovebullets.co.uk</h3>
            <p className="text-gray-300 mb-4">
              High-end Jewellery e-commerce store
            </p>
            <a
              href="https://www.lovebullets.co.uk"
              className="text-blue-400 underline"
            >
              <img src="/images/lovebullets.png" alt="lovebullets screenshot" className="rounded-lg" />
          
            </a>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-2">silent-king.co.uk</h3>
            <p className="text-gray-300 mb-4">
              Designer clothing e-commerce store
            </p>
            <a
              href="https://silent-king.co.uk"
              className="text-blue-400 underline"
            >
            <img src="/images/silent-king.png" alt="silent king screenshot" className="rounded-lg" />
            </a>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-2">theabbeystore.co.uk</h3>
            <p className="text-gray-300 mb-4">
              Health & wellbeing e-commerce store
            </p>
            <a
              href="https://www.theabbeystore.co.uk/"
              className="text-blue-400 underline"
            >
             <img src="/images/theabbeystore.png" alt="the abbey store screenshot" className="rounded-lg" />
            </a>
          </motion.div>
        </div>
      </section>

      {/*
      
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">External Content</h2>

        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">My YouTube Video</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">My GitHub Repo</h3>
          <a
            href="https://github.com/cutty92"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
          
          </a>
        </div>

        
        <div>
          <h3 className="text-2xl font-semibold mb-4">Instagram Post</h3>
          <iframe
            src="https://www.instagram.com/p/CnXxxxxxx/embed"
            className="w-full h-[500px] rounded-lg"
            allowTransparency={true}
            frameBorder="0"
            scrolling="no"
            title="Instagram embed"
          ></iframe>
        </div>
      </section> 
      */}

        {/* ================= ABOUT ================= */}

      <section id="about" className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          About Me
        </h2>
        <GlassTexture />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-800 py-8 mt-16 text-center">
        <p className="text-gray-400 mb-2">
          © 2025 Charles Cutcliffe. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/cutty92"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            GitHub
          </a>

          <ContactLink />
        </div>
      </footer>
    </div>
  );
}
