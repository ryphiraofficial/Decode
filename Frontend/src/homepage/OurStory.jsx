import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, Globe } from 'lucide-react';
import './css/OurStory.css';

const OurStory = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-black selection:bg-white selection:text-black">
            {/* Background Video with refined overlay */}
            <div className="absolute inset-0 z-0">
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

            {/* Floating Technical Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-20 opacity-20 flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-white"></div>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white font-mono">EST. 2018 // HQ_LON</span>
                </div>
                <div className="absolute bottom-20 right-20 opacity-20 flex flex-col items-end gap-2">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white font-mono">Global Impact</span>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full"></div>)}
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="relative z-20 container mx-auto px-6 min-h-screen flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    
                    {/* Left: Strong Typography */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-white/60 mb-8 backdrop-blur-sm">
                                Evolution of Excellence
                            </span>
                            
                            <h2 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase text-white mb-10">
                                Legacy<br/>
                                <span className="text-transparent border-t-white/10 stroke-white/20 outline-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Forged</span><br/>
                                in Code.
                            </h2>
                            <br/>                            
                            {/* <p className="text-lg md:text-xl text-white/60 max-w-xl font-medium leading-relaxed mb-12">
                                We didn't just build a studio; we engineered a movement. From raw academic theory to industrial titan, our journey is defined by the relentless pursuit of engineering perfection.
                            </p> */}

                            {/* Data Blocks */}
                            <div className="flex flex-wrap gap-12 mt-16 border-t border-white/10 pt-12">
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-black text-white uppercase">200+</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Systems Deployed</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-black text-white uppercase">99.9%</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Success Rate</span>
                                </div>
                                {/* <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-black text-white uppercase">Global</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Industry Leader</span>
                                </div> */}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Enhanced "System Core" Visual */}
                    <div className="lg:col-span-5 hidden lg:block relative h-[600px] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="relative w-full h-full"
                        >
                            {/* Decorative Orbiting Rings */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                            
                            {/* Scanning Pulse Line */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[pan_4s_ease-in-out_infinite]"></div>

                            {/* Center Core Hub */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="relative p-1 bg-white/10 rounded-full backdrop-blur-3xl border border-white/20">
                                    <div className="w-24 h-24 bg-white flex items-center justify-center rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                                        <Zap size={40} className="text-black animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Satellite Value Labels (Text Only) */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[15%] left-[10%] group cursor-default"
                            >
                                <Target size={18} className="text-white/40 mb-3 group-hover:text-white transition-colors" />
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors mb-1">Precision</h4>
                                <p className="text-[8px] opacity-20 group-hover:opacity-60 uppercase tracking-tighter text-white">0.01ms Tolerance</p>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-[20%] left-[0%] group cursor-default text-left"
                            >
                                <Shield size={18} className="text-white/40 mb-3 group-hover:text-white transition-colors" />
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors mb-1">Resilience</h4>
                                <p className="text-[8px] opacity-20 group-hover:opacity-60 uppercase tracking-tighter text-white">Military Grade Enc.</p>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-[25%] right-[0%] group cursor-default text-right items-end flex flex-col"
                            >
                                <Globe size={18} className="text-white/40 mb-3 group-hover:text-white transition-colors" />
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors mb-1">Global</h4>
                                <p className="text-[8px] opacity-20 group-hover:opacity-60 uppercase tracking-tighter text-white">Distributed Nodes</p>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                className="absolute bottom-[10%] right-[15%] group cursor-default text-right items-end flex flex-col"
                            >
                                <Zap size={18} className="text-white/40 mb-3 group-hover:text-white transition-colors" />
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors mb-1">Velocity</h4>
                                <p className="text-[8px] opacity-20 group-hover:opacity-60 uppercase tracking-tighter text-white">Infinite Scaling</p>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
