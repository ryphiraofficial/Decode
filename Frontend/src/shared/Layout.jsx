import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children }) => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // Direction: going to "/" = back (left), going anywhere else = forward (right)
  const isGoingHome = location.pathname === '/' && prevPath.current !== '/';
  const direction = isGoingHome ? -1 : 1;

  // Update previous path after determining direction
  React.useEffect(() => {
    prevPath.current = location.pathname;
  }, [location.pathname]);

  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 1,
      zIndex: 2,
    }),
    animate: {
      x: 0,
      opacity: 1,
      zIndex: 2,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 1,
      zIndex: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  return (
    <>
      <Navbar />
      <div className="page-transition-wrapper">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={location.pathname}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="page-slide"
          >
            <main>{children}</main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Layout;
