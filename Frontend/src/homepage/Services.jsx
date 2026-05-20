"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Code2,
  Cloud,
  Palette,
  ShieldCheck,
  Cpu
} from "lucide-react";
const UiloraKineticSlider = ({
  services = [],
  brandName = "CORE.TECH",
  ease = 0.1,
}) => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const audioCtxRef = useRef(null);
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isJumpingRef = useRef(false);
  const navButtonsRef = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(true);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0 });

  // Animation settings
  const transitionDuration = 0.45;
  const visualPreset = "centerZoom";

  useEffect(() => {
    const updatePill = () => {
      const activeButton = navButtonsRef.current[activeIndex];
      if (activeButton) {
        setPillStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
          height: activeButton.offsetHeight
        });
      }
    };
    // Let the DOM render completely first
    setTimeout(updatePill, 50);
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeIndex]);

  useEffect(() => {
    let isMounted = true;
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };

    if (!window.gsap) {
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js").then(() => {
        if (!isMounted) return;
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js").then(() => {
          if (isMounted) setGsapLoaded(true);
        });
      });
    } else if (!window.ScrollTrigger) {
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js").then(() => {
        if (isMounted) setGsapLoaded(true);
      });
    } else {
      setGsapLoaded(true);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const playTickSound = () => {
    if (!audioFeedback) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Design an elegant high-frequency mechanical switch click
      osc.frequency.setValueAtTime(750, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.04);

      gainNode.gain.setValueAtTime(0.012, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio feedback blocked or not initialized yet.");
    }
  };

  const animateSlides = (fromIdx, toIdx) => {
    if (!window.gsap) return;
    const gsap = window.gsap;
    const currentSlide = slidesRef.current[fromIdx];
    const targetSlide = slidesRef.current[toIdx];
    if (!currentSlide || !targetSlide) return;

    const isNext = toIdx > fromIdx;

    if (visualPreset === "centerZoom") {
      gsap.to(currentSlide, {
        opacity: 0,
        scale: isNext ? 2.2 : 0.4,
        duration: transitionDuration,
        ease: "power2.inOut",
        force3D: true,
        onComplete: () => {
          gsap.set(currentSlide, { pointerEvents: 'none' });
        }
      });

      gsap.fromTo(targetSlide,
        {
          opacity: 0,
          scale: isNext ? 0.4 : 2.2,
          pointerEvents: 'none'
        },
        {
          opacity: 1,
          scale: 1,
          duration: transitionDuration,
          ease: "power2.inOut",
          force3D: true,
          onComplete: () => {
            gsap.set(targetSlide, { pointerEvents: 'auto' });
          }
        }
      );
    } else {
      gsap.to(currentSlide, {
        opacity: 0,
        xPercent: isNext ? -60 : 60,
        scale: 0.85,
        duration: transitionDuration,
        ease: "power3.inOut",
        force3D: true,
        onComplete: () => {
          gsap.set(currentSlide, { pointerEvents: 'none' });
        }
      });

      gsap.fromTo(targetSlide,
        {
          opacity: 0,
          xPercent: isNext ? 60 : -60,
          scale: 0.85,
          pointerEvents: 'none'
        },
        {
          opacity: 1,
          xPercent: 0,
          scale: 1,
          duration: transitionDuration,
          ease: "power3.inOut",
          force3D: true,
          onComplete: () => {
            gsap.set(targetSlide, { pointerEvents: 'auto' });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (!gsapLoaded || !window.gsap || !window.ScrollTrigger || services.length === 0) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Initial positioning setup
    slidesRef.current.forEach((slide, idx) => {
      if (!slide) return;
      if (idx !== 0) {
        gsap.set(slide, {
          opacity: 0,
          scale: 0.4,
          pointerEvents: 'none',
          force3D: true
        });
      } else {
        gsap.set(slide, {
          opacity: 1,
          scale: 1,
          pointerEvents: 'auto',
          force3D: true
        });
      }
    });

    let isLocked = false;
    let lastIndex = 0;
    // Create ScrollTrigger over the runway
    const st = ScrollTrigger.create({
      id: "services-trigger",
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,

      onUpdate: (self) => {
        if (isLocked || isJumpingRef.current) return;

        const totalSlides = services.length;
        const progress = self.progress;

        const targetIndex = Math.min(
          totalSlides - 1,
          Math.max(0, Math.floor(progress * totalSlides))
        );

        if (targetIndex !== activeIndexRef.current) {
          isLocked = true;
          isTransitioningRef.current = true;

          const prevIndex = activeIndexRef.current;

          activeIndexRef.current = targetIndex;
          setActiveIndex(targetIndex);

          animateSlides(prevIndex, targetIndex);
          playTickSound();

          // Snap scroll to exact section center
          const start = self.start;
          const end = self.end;
          const segmentSize = (end - start) / totalSlides;

          const targetScroll =
            start + targetIndex * segmentSize + segmentSize / 2;

          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });

          // Hold the slide for 0.2 sec
          setTimeout(() => {
            isLocked = false;
            isTransitioningRef.current = false;
          }, 200);
        }

        lastIndex = targetIndex;
      }
    });

    return () => {
      st.kill();
    };
  }, [gsapLoaded, services.length]);

  const jumpTo = (idx) => {
    if (isTransitioningRef.current || idx === activeIndexRef.current) return;
    if (!window.ScrollTrigger || !containerRef.current) return;

    const st = window.ScrollTrigger.getById("services-trigger");
    if (st) {
      isJumpingRef.current = true;
      isTransitioningRef.current = true;
      playTickSound();

      const prevIndex = activeIndexRef.current;
      activeIndexRef.current = idx;
      setActiveIndex(idx);

      animateSlides(prevIndex, idx);

      const start = st.start;
      const end = st.end;
      const segmentSize = (end - start) / services.length;
      const targetScroll = start + (idx * segmentSize) + (segmentSize / 2);

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });

      // Release lock after smooth scroll settles (700ms buffer)
      setTimeout(() => {
        isJumpingRef.current = false;
        isTransitioningRef.current = false;
      }, 700);
    }
  };

  return (
    <div
      ref={containerRef}
      className="services-section relative w-full h-[400vh] bg-black text-white select-none"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-black">
        {/* Background Video with refined overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            src="/story bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        </div>

        <div className="relative w-full h-full flex items-center justify-center z-10 px-6 md:px-12">
          {/* Full-width Central Typographic Canvas */}
          <div className="w-full max-w-4xl relative h-[300px] md:h-[400px] flex items-center justify-center pointer-events-none">
            {services.map((service, idx) => (
              <div
                key={idx}
                ref={(el) => (slidesRef.current[idx] = el)}
                className="absolute w-full flex flex-col items-center text-center select-none pointer-events-auto"
              >
                {/* Visual Label */}
                <div className="flex items-center justify-center gap-3 mb-4 opacity-50">
                  <span className="text-[9px] font-mono tracking-[0.5em] text-neutral-400 uppercase">
                    SECTOR 0{idx + 1}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40"></span>
                  <div className="text-neutral-300">
                    {React.cloneElement(service.icon, { size: 12, className: "opacity-80 animate-pulse" })}
                  </div>
                </div>

                {/* Massive Minimalist Center Typography */}
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4 text-white select-none text-center">
                  {service.title}
                </h3>

                {/* Ultra-Minimal Subtext description centered */}
                <p className="text-xs font-medium tracking-wide text-neutral-400 max-w-sm leading-relaxed uppercase text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Bottom Navigation Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
          <div className="relative flex items-center gap-2 px-3 py-2 bg-neutral-900/40 backdrop-blur-xl rounded-full border border-white/[0.04]">
            {/* Sliding absolute white pill */}
            <div
              style={{
                position: "absolute",
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                height: `${pillStyle.height}px`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              className="bg-white rounded-full transition-all duration-300 ease-out z-0 pointer-events-none"
            />

            {services.map((service, idx) => {
              const displayTitle = service.title.trim().split(/\s+/)[0];
              return (
                <button
                  key={idx}
                  ref={(el) => (navButtonsRef.current[idx] = el)}
                  onClick={() => jumpTo(idx)}
                  className={`group relative flex items-center justify-center transition-colors duration-300 rounded-full z-10 w-20 md:w-28 h-8 md:h-9 text-[9px] md:text-[10px] ${activeIndex === idx
                      ? "text-black font-black"
                      : "text-neutral-400 hover:text-white"
                    }`}
                >
                  {activeIndex === idx ? (
                    <div className="flex items-center gap-1 md:gap-1.5 font-bold uppercase tracking-widest text-[8px] md:text-[9px] font-mono">
                      {React.cloneElement(service.icon, { size: 9 })}
                      <span>{displayTitle}</span>
                    </div>
                  ) : (
                    <span className="text-[9px] md:text-[10px] font-mono">0{idx + 1}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const serviceData = [
    {
      icon: <Smartphone />,
      title: "Mobile App Development",
      description: "Next-gen native applications designed for seamless interaction and high retention rates."
    },
    {
      icon: <Code2 />,
      title: "Custom Software Architect",
      description: "Building scalable backend ecosystems that handle complex data streams with zero latency."
    },
    {
      icon: <Cloud />,
      title: "Cloud Migration Strategy",
      description: "Secure AWS and Azure deployments optimized for performance and cost-efficiency."
    },
    {
      icon: <Palette />,
      title: "UI/UX Visual Engineering",
      description: "Data-driven design processes focused on conversion metrics and brand identity."
    },
    {
      icon: <ShieldCheck />,
      title: "Cyber Resilience Systems",
      description: "Advanced threat detection and encryption protocols to safeguard enterprise assets."
    },
    {
      icon: <Cpu />,
      title: "Web Development",
      description: "Next-gen native applications designed for seamless interaction and high retention rates."
    }
  ];

  return (
    <main>
      <UiloraKineticSlider
        services={serviceData}
        brandName="CORE.TECH"
        ease={0.15}
      />
    </main>
  );
}