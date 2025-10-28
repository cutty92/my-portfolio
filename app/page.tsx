"use client";

// pages/index.js  (or app/page.js if using App Router)
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-4 text-blue-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A showcase of my projects, animations, and code experiments.
        </motion.p>
        {/* ================= CTA BUTTON ================= */}
        <motion.a
          href="#projects"
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          View Projects
        </motion.a>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section id="projects" className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          My Projects
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
            <h3 className="text-2xl font-semibold mb-2">Project One</h3>
            <p className="text-gray-300 mb-4">
              Description of Project One. Short summary of what it does.
            </p>
            <a
              href="/projects/project-one"
              className="text-blue-400 underline"
            >
              View Details
            </a>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Project Two</h3>
            <p className="text-gray-300 mb-4">
              Another project example with description.
            </p>
            <a
              href="/projects/project-two"
              className="text-blue-400 underline"
            >
              View Details
            </a>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Project Three</h3>
            <p className="text-gray-300 mb-4">
              Description of Project Three.
            </p>
            <a
              href="/projects/project-three"
              className="text-blue-400 underline"
            >
              View Details
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= EMBEDDED CONTENT ================= */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">External Content</h2>

        {/* YouTube Embed */}
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

        {/* GitHub Embed */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">My GitHub Repo</h3>
          <a
            href="https://github.com/YOUR-USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Visit my GitHub
          </a>
        </div>

        {/* Instagram Embed */}
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

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-800 py-8 mt-16 text-center">
        <p className="text-gray-400 mb-2">
          © 2025 Your Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/YOUR-USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/YOUR-USERNAME/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Instagram
          </a>
          <a
            href="/contact"
            className="text-gray-400 hover:text-white"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
