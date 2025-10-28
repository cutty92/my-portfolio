import { motion } from "framer-motion";
import { useState } from "react";

export default function GameHeader() {
  const [hovered, setHovered] = useState(null);
  const menuItems = ["Home", "Projects", "Contact"];

  return (
    <header className="w-full flex justify-center bg-black/60 backdrop-blur-md py-6">
      <nav className="flex gap-8">
        {menuItems.map((item, i) => (
          <motion.div
            key={item}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={{
              scale: hovered === i ? 1.25 : 1,
              opacity: hovered === null || hovered === i ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`
              relative text-white font-bold text-xl cursor-pointer 
              px-8 py-2 rounded-xl border border-cyan-400 
              transition-all duration-300
              ${hovered === i ? "bg-cyan-500/20 shadow-[0_0_20px_#06b6d4]" : "bg-transparent"}
            `}
          >
            {item}
          </motion.div>
        ))}
      </nav>
    </header>
  );
}
