import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Team = () => {
    const slides = [
        {
            src: "/dcoode profiles/home_ph_1.webp",
            name: "Arjun K.",
            role: "Creative Director"
        },
        {
            src: "/dcoode profiles/home_ph_2.webp",
            name: "Sarah M.",
            role: "Lead Engineer"
        },
        {
            src: "/dcoode profiles/home_ph_3.webp",
            name: "Marcus L.",
            role: "Product Designer"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [lighting, setLighting] = useState("cool"); // "cool", "warm", "mono"

    const autoplayTimerRef = useRef(null);

    // Start Autoplay slideshow
    const startSlideshow = () => {
        if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
    };

    const resetAutoplayTimer = () => {
        if (isAutoplay) {
            startSlideshow();
        }
    };

    useEffect(() => {
        if (isAutoplay) {
            startSlideshow();
        } else {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        }
        return () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        };
    }, [isAutoplay]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
        resetAutoplayTimer();
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
        resetAutoplayTimer();
    };

    const handleGoTo = (index) => {
        setActiveIndex(index);
        resetAutoplayTimer();
    };

    const toggleAutoplay = () => {
        setIsAutoplay(!isAutoplay);
    };

    // Get dynamic lighting overlays based on current mode
    const getLightingOverlay = () => {
        if (lighting === "warm") {
            return (
                <>
                    <div className="absolute inset-0 bg-amber-500/10 mix-blend-color-dodge pointer-events-none transition-all duration-700" />
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-amber-500/25 to-transparent blur-md mix-blend-screen pointer-events-none transition-all duration-700" />
                </>
            );
        }
        if (lighting === "mono") {
            return null;
        }
        // Cool Cyan/Teal default lighting
        return (
            <>
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-color-dodge pointer-events-none transition-all duration-700" />
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cyan-400/25 to-transparent blur-md mix-blend-screen pointer-events-none transition-all duration-700" />
            </>
        );
    };

    return (
        <section className="sticky top-0 w-full min-h-screen bg-white text-neutral-900 flex flex-col justify-between overflow-x-hidden selection:bg-neutral-100">

            {/* Main Content Container */}
            <main className="flex-grow flex items-center justify-center py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 lg:pl-10 xl:pl-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

                    {/* Left Column (Static Content Frame matching Video) */}
                    <div className="lg:col-span-6 lg:col-start-2 flex flex-col justify-center space-y-10">

                        <div className="space-y-8 max-w-xl">
                            {/* Heading matching thin weight & line break of the video */}
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-neutral-900 leading-[1.1] whitespace-nowrap">
                                You Will Like It Here!
                            </h2>

                            {/* Elegant low-contrast body text */}
                            <p className="text-neutral-500 text-lg md:text-xl leading-relaxed font-light">
                                At Decoode, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let's make a fruitful journey!
                            </p>
                        </div>

                        {/* Manual Navigation Slide Controls / Indicator Bars */}
                        <div className="flex items-center justify-between pt-10 border-t border-neutral-100 w-full max-w-lg mt-4">
                            {/* Arrows */}
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handlePrev}
                                    className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300 group"
                                >
                                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300 group"
                                >
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex items-center space-x-2.5">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleGoTo(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex
                                            ? "w-12 bg-neutral-900"
                                            : "w-2.5 bg-neutral-200 hover:bg-neutral-400"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right Column (Portrait Studio Frame with Exact Video Transitions) */}
                    <div className="lg:col-span-5 lg:col-start-8 relative flex justify-center lg:justify-end">

                        {/* Image Frame Aspect Ratio matching 4:5 */}
                        <div className="relative w-full max-w-[440px] aspect-[4/5] bg-neutral-950 overflow-hidden shadow-sm">

                            {/* Portrait Layers (Preloaded for immediate seamless transition) */}
                            <div className="absolute inset-0 w-full h-full">
                                {slides.map((slide, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${idx === activeIndex
                                            ? "opacity-100 scale-100 pointer-events-auto"
                                            : "opacity-0 scale-105 pointer-events-none"
                                            }`}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={slide.name}
                                            className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-all duration-1000"
                                        />

                                        {/* Caption name tag */}
                                        <div className="absolute bottom-6 left-6 z-30 font-mono text-[10px] tracking-[0.2em] text-white/95 uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded">
                                            {slide.name} // {slide.role}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Color Correction Overlays (Simulating the cinematic cyan side lighting shown in the video) */}
                            {getLightingOverlay()}

                            {/* Smooth gradient overlay to dark at the bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />

                            {/* Rotating SVG Circle Badge (Positioned at bottom-right of image, exactly overlapping the edge) */}
                            <div className="absolute -bottom-16 -right-16 w-44 h-44 pointer-events-none z-20">
                                <svg className="animate-[spin_20s_linear_infinite] w-full h-full text-white/20 font-light" viewBox="0 0 120 120">
                                    <defs>
                                        <path id="badgePath" d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                                    </defs>
                                    <text className="text-[7.5px] tracking-[0.27em] uppercase fill-white/80 font-medium">
                                        <textPath href="#badgePath" startOffset="0%">
                                            join our team • join our team •
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                        </div>

                    </div>

                </div>
            </main>
        </section>
    );
};
export default Team;