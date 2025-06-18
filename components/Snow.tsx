import React, { useEffect, useRef } from 'react';

export default function Snow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const numParticles = 100;
    //const colors = ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'];
    const startSnow = () => {
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      //const color = colors[Math.floor(Math.random() * colors.length)];
		const color = "rgb(255,255,255)";
      particle.setAttribute('cx', `${Math.random() * 100}vw`);
      particle.setAttribute('cy', `${Math.random() * 200}`);
      particle.setAttribute('r', `${Math.random() * 5 + 2}`);
      particle.setAttribute('fill', color);

      particle.animate(
        [
          { transform: 'translate(0, 0)', opacity: '1' },
          { transform: `translate(${Math.random() * 100}vw,100vh)`, opacity: '0' },
        ],
        {
          duration: Math.random() * 3000 + 5000,
          iterations: Infinity,
        }
      );
      svg?.appendChild(particle);
    }
  };
  const timeout = setTimeout(startSnow, 0);

  return () => clearTimeout(timeout);
}, []);
  return (
    <svg ref={svgRef} width="100vw" height="100vh" style={{ overflow: 'hidden' , pointerEvents: 'none'}} className="fixed top-0 left-0 bg-transparent animate-fadeIn" />
  );
}