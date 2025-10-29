import { useState, useEffect } from "react";

export default function GlassTexture() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glowChange = scrollY % 360;
  const glowStyle = {
    boxShadow: `30 30 10 5px hsl(${glowChange}, 70%, 80%`,};

  return (
    <div className="flex justify-center my-32">
      <div
        className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 max-w-lg w-full text-center transition-all duration-300"
        style={glowStyle}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Education</h2>
        <p className="text-gray-200">
          MSc Applied Marine Geophysics <br></br>
          BSC Ocean Science<br></br>
        </p>
        <h2 className="text-3xl font-bold text-white my-4">Languages</h2>
        <p className="text-gray-200">
          C++, C#, JavaScript, React, Next.js, Node.js, Python, HTML, CSS, MATLAB
          
                  <h2 className="text-3xl font-bold text-white my-4">Software</h2>
         </p>
        <p className="text-gray-200">
          Substance, Blender, Unreal Engine inc. Niagara, Unity, ComfyUI, Affinity Designer, ArcMap, Canva, Git, World Builders (various), Microsoft Suite inc. Access
        </p>
            </div>
    </div>
  );
}
