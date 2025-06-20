import React, { useEffect, useRef, useState } from 'react';
import { Snows } from '../lib/types';

const backupPull:Snows = {
  id: 1,
  attributes: {
    snowing: false,
    count: 75
  },
}

export default function Snow({dark} : {dark: boolean}) {
  const [snow, setSnow] = useState<Snows>();
  const svgRef = useRef<SVGSVGElement>(null);
  const svg = svgRef.current;

  useEffect(() => {
    const fetchSnow = async () => {
      fetch(
        "https://strapi.mbhs.edu/api/snow?populate=*"
      ).then((res) => res.json())
      .then((res) => {
        setSnow(res.data)
      }).catch(() => setSnow(backupPull))
    }
    fetchSnow()
  })
  
  useEffect(() => {
    if (!snow?.attributes.snowing) return
    const numParticles = snow.attributes.count;
    //const colors = ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'];
    const startSnow = () => {
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        //const color = colors[Math.floor(Math.random() * colors.length)];
        const color = dark ? "rgb(225,225,255)" : "rgb(150,150,180)";
        particle.setAttribute('cx', `${Math.random() * 100}vw`);
        particle.setAttribute('cy', `${Math.random() * 20}vh`);
        particle.setAttribute('r', `${Math.random() * 2 + 2}`);
        particle.setAttribute('fill', color);

        particle.animate(
          [
            { transform: 'translate(0, 0)', opacity: '1' },
            { transform: `translate(${Math.random() * 100-50}vw, ${Math.random() * 100}vh)`, opacity: '0' },
          ],
          {
            duration: Math.random() * 3000 + 3000,
            iterations: Infinity,
          }
        );
        svg?.appendChild(particle);
      }
    };
    const timeout = setTimeout(startSnow, 0);
    return () => clearTimeout(timeout);
  }, [snow?.attributes.snowing, dark]);
  useEffect(() => {
    while(svg?.firstChild) {
      svg.removeChild(svg.firstChild)
    }
  }, [dark])
  return (
    <svg ref={svgRef} width="100vw" height="100vh" style={{ overflow: 'hidden' , pointerEvents: 'none'}} className={`fixed top-0 left-0 bg-transparent animate-fadeIn`} />
  );
}