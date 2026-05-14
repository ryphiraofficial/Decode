"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * RevealBanner - A high-impact scroll-linked banner reveal.
 * Best used as a transition between storytelling sections and CTA.
 */
const RevealBanner = ({
  bannerTitle = "Building The Future Of Innovation",
  introLeft = "BUILD",
  introRight = "FUTURE",
  imageUrl = "https://i.pinimg.com/736x/58/a5/2d/58a52d97ff4f0264adf6bedc07ba48ad.jpg",
  maskUrl = "https://cdn.prod.website-files.com/63d02462bc5e77103606f366/63d0a28247070a2569588667_mask.png",
}) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);
  const headerWordsRef = useRef([]);
  const maskRef = useRef(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    // Dynamic GSAP Import to ensure compatibility
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    script.onload = () => {
      const triggerScript = document.createElement("script");
      triggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
      triggerScript.async = true;
      triggerScript.onload = () => setGsapLoaded(true);
      document.head.appendChild(triggerScript);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!gsapLoaded || !window.gsap) return;

    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    const words = headerWordsRef.current;
    const bannerContainer = containerRef.current;
    const mask = maskRef.current;

    // Initial states
    gsap.set(bannerContainer, { scale: 0 });
    gsap.set(words, { opacity: 0 });
    gsap.set(mask, { scale: 0.7 });

    const tl = window.ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Scale main container
        gsap.set(bannerContainer, { scale: progress });

        // 2. Scale Mask Layer
        const maskScale = 0.7 + (Math.min(progress / 0.9, 1) * 0.3);
        gsap.set(mask, { scale: maskScale });

        // 3. Move Intro Text (Left/Right)
        if (progress <= 0.9) {
          const textProgress = progress / 0.9;
          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introLeftRef.current, { x: -textProgress * moveDistance });
          gsap.set(introRightRef.current, { x: textProgress * moveDistance });
        }

        // 4. Reveal Title Words
        if (progress >= 0.7 && progress <= 0.9) {
          const headerProgress = (progress - 0.7) / 0.2;
          const totalWords = words.length;

          words.forEach((word, i) => {
            if (!word) return;
            const start = i / totalWords;
            const end = (i + 1) / totalWords;
            let opacity = 0;
            if (headerProgress >= end) opacity = 1;
            else if (headerProgress >= start) {
              opacity = (headerProgress - start) / (end - start);
            }
            gsap.set(word, { opacity });
          });
        } else if (progress < 0.7) {
          gsap.set(words, { opacity: 0 });
        } else {
          gsap.set(words, { opacity: 1 });
        }
      },
    });

    return () => tl.kill();
  }, [gsapLoaded, bannerTitle]);

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Animated Banner Section */}
      <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden">
        {/* Main Image Container */}
        <div ref={containerRef} className="relative w-full h-full will-change-transform bg-white">
          <div className="absolute inset-0 opacity-40">
            <img src={imageUrl} alt="banner" className="w-full h-full object-cover grayscale" />
          </div>

          {/* Masked Image Layer */}
          <div
            ref={maskRef}
            className="absolute inset-0 z-10 will-change-transform"
            style={{
              WebkitMaskImage: `url(${maskUrl})`,
              maskImage: `url(${maskUrl})`,
              maskSize: 'cover',
              maskPosition: 'center'
            }}
          >
            <img src={imageUrl} alt="mask" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
          </div>

          {/* Centered Reveal Title */}
          <div className="absolute inset-0 flex items-center justify-center z-20 px-8 text-center pointer-events-none">
            <h1 className="text-white text-5xl md:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter">
              {bannerTitle.split(" ").map((word, i) => (
                <span
                  key={i}
                  ref={el => { headerWordsRef.current[i] = el }}
                  className="inline-block mr-3"
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Floating Intro Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="flex gap-4 w-full px-4">
            <div ref={introLeftRef} className="flex-1 flex justify-end">
              <h1 className="text-5xl md:text-[12rem] uppercase font-black tracking-tighter text-black mix-blend-difference">{introLeft}</h1>
            </div>
            <div ref={introRightRef} className="flex-1">
              <h1 className="text-5xl md:text-[12rem] uppercase font-black tracking-tighter text-black mix-blend-difference">{introRight}</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RevealBanner;
