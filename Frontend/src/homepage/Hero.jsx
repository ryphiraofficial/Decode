import React, { useEffect, useRef, useState } from 'react';
import './css/Hero.css';

const Hero = () => {
    const gridRef = useRef(null);
    const pixelsRef = useRef([]);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(0);

    const categories = ["People", "Project", "Business"];
    const images = [
        // '/dcoode profiles/home_ph_1.webp',
        // '/dcoode profiles/home_ph_2.webp',
        // '/dcoode profiles/home_ph_3.webp',
        // '/dcoode profiles/home_ph_4.webp',
        // '/dcoode profiles/home_ph_5.webp',
        // '/dcoode profiles/home_ph_6.webp',
        '/profiles dcoode/vishnu.jpg',
        '/profiles dcoode/saharash.jpg',
        '/profiles dcoode/nandhu.jpg',
        '/profiles dcoode/barath.jpg',
        '/profiles dcoode/vineesh.jpg',
        '/profiles dcoode/biju.jpg',
        '/profiles dcoode/deepu.jpg',
        '/profiles dcoode/vaideesh.jpg',
        '/profiles dcoode/arya.jpg',
        '/profiles dcoode/farzin.jpg',
        '/profiles dcoode/rohit.jpg',
        '/profiles dcoode/nidhin.jpg',
        '/profiles dcoode/mridul.jpg',
        // '/profiles dcoode/image1.png',
        // '/profiles dcoode/image2.png',
        // '/profiles dcoode/image3.png',
        // '/profiles dcoode/image4.png'
    ];

    const colors = [
        'rgba(149, 255, 0, 0.85)',
        'rgba(0, 163, 0, 0.85)',
        // 'rgba(255, 235, 0, 0.85)',
        // 'rgba(12, 12, 11, 0.85)', 
        'transparent', 'transparent', 'transparent', 'transparent', 'transparent'
    ];

    const [gridDim, setGridDim] = useState({ rows: 12, cols: 20 });

    useEffect(() => {
        const calculateGrid = () => {
            const isMobile = window.innerWidth <= 1024;
            const size = isMobile ? 60 : 40;
            const cols = Math.ceil(window.innerWidth / size);
            const rows = Math.ceil(window.innerHeight / size);
            setGridDim({ rows, cols });
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);
        return () => window.removeEventListener('resize', calculateGrid);
    }, []);

    const { rows, cols } = gridDim;

    useEffect(() => {
        const gridElement = gridRef.current;
        if (!gridElement) return;

        // Set CSS variables for the grid
        gridElement.style.setProperty('--grid-cols', cols);
        gridElement.style.setProperty('--grid-rows', rows);

        const pixels = [];
        gridElement.innerHTML = '';

        for (let i = 0; i < rows * cols; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            gridElement.appendChild(pixel);
            pixels.push({
                el: pixel,
                col: i % cols,
                row: Math.floor(i / cols)
            });
        }
        pixelsRef.current = pixels;

        const updatePixels = () => {
            if (pixelsRef.current.length === 0) return;
            const count = Math.max(10, Math.ceil(pixelsRef.current.length / 20)); // Minimum 10 updates per tick
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * pixelsRef.current.length);
                const p = pixelsRef.current[randomIndex];

                const isMobile = window.innerWidth <= 1024;
                const colMid = cols / 2;
                const rowMid = rows / 2;
                const colRange = isMobile ? cols * 0.25 : cols * 0.15; // Narrowed for mobile
                const rowRange = rows * 0.3;

                let isCenter;
                if (isMobile) {
                    // Narrower top clear area and center strip
                    isCenter = p.row <= Math.ceil(rows * 0.15) || (p.col >= colMid - colRange && p.col <= colMid + colRange);
                } else {
                    isCenter =
                        p.col >= colMid - colRange && p.col <= colMid + colRange &&
                        p.row >= rowMid - rowRange && p.row <= rowMid + rowRange;
                }

                if (isCenter) {
                    p.el.style.backgroundColor = 'transparent';
                } else {
                    p.el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                }
            }
        };

        const pixelInterval = setInterval(updatePixels, 35);

        // Initial fill
        for (let i = 0; i < 30; i++) updatePixels();

        return () => clearInterval(pixelInterval);
    }, [rows, cols]);

    useEffect(() => {
        const swapInterval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % images.length);

            if (Math.random() > 0.6) {
                setCategoryIndex((prev) => (prev + 1) % categories.length);
            }
        }, 500);

        return () => clearInterval(swapInterval);
    }, [images.length, categories.length]);

    return (
        <div className="hero-muscat-root">
            <div className="grain-overlay"></div>

            <div className="hero-container">
                {/* Top Nav */}
                <div className="flex justify-between items-start top-nav-row">
                    {/* <div className="nav-btn">EN</div> */}

                    {/* <div className="flex items-center gap-4 cursor-pointer group">
                        <span className="font-bold text-sm tracking-tighter">MENU</span>
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span className="w-2/3 ml-auto"></span>
                        </div>
                    </div> */}
                </div>

                <div ref={gridRef} className="pixel-grid"></div>

                <div className="image-container">
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Slide ${index}`}
                            className={`person-image ${index === currentImgIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className="flex justify-between items-center h-full main-content-row">
                    <div className="headline-wrapper">
                        <span className="seo-hero-title">IT Solutions & Software Development</span>
                        <h1 className="headline">Difference<br />for the<br />future.</h1>
                    </div>

                    <div className="sidebar-info text-right md:text-left">
                        {/* <div className="logo mb-4 uppercase">DCOODE<span className="dot">.</span></div> */}
                        {/* <p className="font-bold mb-2">DCOODE STUDIO</p> */}
                        {/* <p>Architecting digital resilience through<br />bespoke engineering and visionary<br />design for future-forward brands.</p> */}
                    </div>
                </div>

                <div className="footer-nav">
                    {/* <div>
                        <div className="category-label">{categories[categoryIndex]}</div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs uppercase tracking-widest cursor-pointer font-bold border-b-2 border-black pb-1">View more</span>
                        </div>
                    </div> */}
                    {/* <div className="flex items-center gap-4">
                        <span className="text-xs tracking-widest font-bold">Discover D</span>
                        <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all bg-white shadow-md">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Hero;
