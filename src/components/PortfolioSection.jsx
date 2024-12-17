import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import GeneralProjectDescription from './GeneralProjectDescription';
import ProjectCardsContainer from './ProjectCardsContainer';
import './../styles/SectionsGeneric.css'
import './../styles/PortfolioSection.css'
import * as globalConstants from './../globalConstants.js'

/**
 * The PortfolioSection component renders a section containing a heading
 * and cards with project descriptions. The div-section is animated by using framer motion 
 * to scale up and become more opaque as the user scrolls into view.
 *
 * @returns {JSX.Element} The rendered component.
 */
function PortfolioSection() {
  const motionRef = useRef(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [dynamicOffset, setDynamicOffset] = useState(globalConstants.SCROLL_OFFSET_DEFAULT);

  const calculateDynamicOffset = (width) => {
    try{
      if(width <= globalConstants.SCROLL_THRESHOLD_LOW){
        return globalConstants.SCROLL_OFFSET_MIN
  
      }else if(width > globalConstants.SCROLL_THRESHOLD_LOW & width <= globalConstants.SCROLL_THRESHOLD_HIGH){
        return globalConstants.SCROLL_OFFSET_MEDIUM
  
      }else{
        return globalConstants.SCROLL_OFFSET_MAX
      }
    }catch(err){
      console.log(err)
    }
  };
  
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleWindowResize);

    setDynamicOffset(calculateDynamicOffset(window.innerWidth))

    // Cleanup-Funktion, um den Event-Listener zu entfernen
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize.width]);

  const { scrollYProgress } = useScroll({
    target: motionRef,
    offset: dynamicOffset,
  });

  const scaledProgress = useTransform(scrollYProgress, [0, 1], [globalConstants.SCROLL_SCALING_FACTOR, 1]);

  return (
      <section id='portfolio' className='portfolio-section'>
        <h1 id='portfolio-title'>Meine Projekte</h1>
        <motion.div
          ref={motionRef}
          style={{
            scale: scaledProgress,
            opacity: scaledProgress,
            position: 'relative'
          }}
          id='portfolio-motion-div'
          className='portfolio-content-container'
        >
          <GeneralProjectDescription />
          <ProjectCardsContainer />
        </motion.div>
      </section>
  );
}

export default PortfolioSection;