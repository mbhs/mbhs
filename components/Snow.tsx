import React, { useEffect, useRef, useState } from 'react';

export async function getStaticProps() {
	let snow = await fetch(
		"https://strapi.mbhs.edu/api/snow?populate=*"
	).then((res) => res.json());

	return {
		props: {
			snow: snow.data,
		},
		revalidate: 60,
	};
}

export default function Snow() {
  const [snow, setSnow] = useState(null);

  const fetchSnow = async () => {
    fetch(
      "https://strapi.mbhs.edu/api/snow?populate=*"
    ).then((res) => res.json())
    .then((res) => {
      setSnow(res.data.attributes.snow)
    })
  }
  useEffect(() => {
    fetchSnow()
  })

  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    const numParticles = 200;
    //const colors = ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'];
    const startSnow = () => {
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        //const color = colors[Math.floor(Math.random() * colors.length)];
        const color = "rgb(255,255,255)";
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
  }, []);
  return (
    <svg ref={svgRef} width="100vw" height="100vh" style={{ overflow: 'hidden' , pointerEvents: 'none'}} className={`fixed top-0 left-0 bg-transparent animate-fadeIn ${snow ? "" : "hidden"}`} />
  );
}