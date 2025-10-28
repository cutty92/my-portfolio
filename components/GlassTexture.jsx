import { useState, useEffect } from "react";

export default function GlassTexture() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glowHue = scrollY % 360;
  const glowStyle = {
    boxShadow: `0 0 30px 5px hsl(${glowHue}, 100%, 50%)`,
  };

  return (
    <div className="flex justify-center my-32">
      <div
        className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 max-w-lg w-full text-center transition-all duration-300"
        style={glowStyle}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Frosted Glass Box</h2>
        <p className="text-gray-200">
          This is a frosted glass textbox with a glowing underglow that changes as you scroll!
        </p>
      </div>
    </div>
  );
}
