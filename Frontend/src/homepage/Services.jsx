"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Code2,
  Cloud,
  Palette,
  ShieldCheck,
  Cpu,
  ArrowRight
} from "lucide-react";

/**
 * UiloraKineticSlider - Mobile Optimized Split Layout
 * Left: Fixed heading. Right: Kinetic scrollable cards.
 */
const UiloraKineticSlider = ({
  services = [],
  brandName = "CORE.TECH",
  sidebarTitle = "Digital\nArchitecture",
  ease = 0.1,
}) => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const rightPanelRef = useRef(null);
  const slidesRef = useRef([]);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);

    return () => {
      window.removeEventListener("resize", handleResize);
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  const isMobile = windowWidth < 768;

  const jumpTo = (idx) => {
    const slide = slidesRef.current[idx];
    if (slide && containerRef.current && wrapperRef.current && rightPanelRef.current) {
      const panelWidth = rightPanelRef.current.offsetWidth;
      const maxHorizontal = wrapperRef.current.offsetWidth - panelWidth;
      const runwayHeight = containerRef.current.offsetHeight - window.innerHeight;

      const requiredX = (slide.offsetLeft + slide.offsetWidth / 2) - panelWidth / 2;
      const bufferedProgress = Math.max(0, Math.min(1, requiredX / maxHorizontal));

      const buffer = isMobile ? 0.05 : 0.1;
      const progress = bufferedProgress * (1 - buffer) + buffer;

      const targetScroll = containerRef.current.offsetTop + (progress * runwayHeight);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!gsapLoaded || !window.gsap) return;

    const gsap = window.gsap;
    let currentX = 0;
    let targetX = 0;
    let animationFrameId;

    const update = () => {
      if (!containerRef.current || !wrapperRef.current || !rightPanelRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalHeight = containerRef.current.offsetHeight;
      const panelWidth = rightPanelRef.current.offsetWidth;

      const scrollStart = containerRef.current.offsetTop;
      const currentScroll = window.scrollY;

      const rawProgress = (currentScroll - scrollStart) / (totalHeight - viewHeight);
      const progress = Math.max(0, Math.min(1, rawProgress));

      setIsVisible(containerRect.top < viewHeight && containerRect.bottom > 0);

      const buffer = isMobile ? 0.05 : 0.1;
      const bufferedProgress = Math.max(0, (progress - buffer) / (1 - buffer));

      const maxHorizontal = wrapperRef.current.offsetWidth - panelWidth;
      targetX = -bufferedProgress * maxHorizontal;

      currentX = currentX + (targetX - currentX) * ease;
      gsap.set(wrapperRef.current, { x: currentX });

      let closestIdx = 0;
      let minDistance = Infinity;

      slidesRef.current.forEach((slide, idx) => {
        if (!slide) return;
        const rect = slide.getBoundingClientRect();
        const panelRect = rightPanelRef.current.getBoundingClientRect();
        const panelCenter = panelRect.left + panelRect.width / 2;
        const slideCenter = rect.left + rect.width / 2;
        const distanceFromCenter = slideCenter - panelCenter;
        const normalizedDistance = Math.abs(distanceFromCenter) / (panelWidth / 2);

        if (Math.abs(distanceFromCenter) < minDistance) {
          minDistance = Math.abs(distanceFromCenter);
          closestIdx = idx;
        }

        const scale = 1 + (1 - Math.min(1, normalizedDistance)) * (isMobile ? 0.08 : 0.15);
        const opacity = 0.3 + (1 - Math.min(1, normalizedDistance)) * 0.7;

        gsap.set(slide, { scale, opacity, force3D: true });
      });

      setActiveIndex(closestIdx);
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [ease, gsapLoaded, services.length, isMobile]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-white">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row text-black font-sans">

        {/* Branding Section */}
        <div className="w-full md:w-[45%] h-[40vh] md:h-full flex flex-col justify-center items-center text-center px-10 z-20 bg-white">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-12 opacity-40 w-full">
            <div className="w-8 md:w-12 h-[1px] bg-black"></div>
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-black">Services</p>
            <div className="w-8 md:w-12 h-[1px] bg-black"></div>
          </div>

          <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8">
            Our<br />Expertise
          </h2>

          <p className="text-[11px] md:text-sm font-bold text-black/40 max-w-[260px] md:max-w-[350px] leading-relaxed uppercase tracking-wider">
            Pushing the boundaries of digital architecture through innovative engineering and design.
          </p>
        </div>

        {/* Kinetic Panel */}
        <div ref={rightPanelRef} className="flex-1 h-[60vh] md:h-full relative overflow-hidden bg-neutral-50/50">
          <div
            ref={wrapperRef}
            className="absolute flex items-center h-full gap-8 md:gap-24 will-change-transform"
            style={{
              paddingLeft: isMobile ? '15%' : '25%',
              paddingRight: isMobile ? '15%' : '25%'
            }}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                ref={(el) => (slidesRef.current[idx] = el)}
                className="group w-[75vw] md:w-[400px] h-[350px] md:h-[450px] bg-black text-white flex-shrink-0 flex flex-col items-center justify-center p-8 md:p-12 rounded-[2.5rem] text-center shadow-2xl"
              >
                {/* <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                  {React.cloneElement(service.icon, { size: isMobile ? 24 : 28, strokeWidth: 2 })}
                </div> */}

                <div className="flex-1 flex flex-col items-center justify-center">
                  <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase mb-3">
                    Sector 0{idx + 1}
                  </span>

                  <h3 className="text-xl md:text-3xl font-black uppercase leading-tight mb-3 md:mb-4 tracking-tighter">
                    {service.title}
                  </h3>

                  <p className="text-[10px] md:text-xs font-bold text-white/50 leading-relaxed max-w-[220px] md:max-w-[280px]">
                    {service.description}
                  </p>
                </div>

                {/* <button className="flex items-center gap-2 md:gap-3 text-[9px] font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all mt-4">
                  View Service <ArrowRight size={12} />
                </button> */}
              </div>
            ))}
          </div>
        </div>

        {/* Mini Navigation */}
        <div
          className={`fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 bg-black/5 backdrop-blur-xl rounded-full transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          {services.map((service, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              className={`group relative flex items-center justify-center transition-all duration-500 rounded-full ${activeIndex === idx
                  ? 'bg-black text-white w-20 md:w-32 h-8 md:h-10 px-2 md:px-4'
                  : 'bg-neutral-200/50 text-neutral-500 w-8 h-8 md:w-10 md:h-10 hover:bg-black hover:text-white'
                }`}
            >
              <div className={`${activeIndex === idx && !isMobile ? 'mr-2' : ''}`}>
                {React.cloneElement(service.icon, { size: activeIndex === idx ? (isMobile ? 10 : 12) : 14 })}
              </div>

              {activeIndex === idx && (
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter whitespace-nowrap overflow-hidden">
                  {isMobile ? service.title.split(' ')[0].substring(0, 4) : service.title.split(' ')[0]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Brand Logo */}
        <div className="absolute top-0 left-0 p-8 md:p-10 z-50 mix-blend-difference">
          <a href="#" className="font-black uppercase tracking-tighter text-xl md:text-2xl text-white">
            {brandName}
          </a>
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
      title: "AI Neural Integrations",
      description: "Custom LLM training and predictive analytics models for operational automation."
    }
  ];

  return (
    <main>
      <UiloraKineticSlider
        services={serviceData}
        brandName=""
        sidebarTitle={"Modern\nLogistics"}
        ease={0.1}
      />
    </main>
  );
}