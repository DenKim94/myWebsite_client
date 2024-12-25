import * as globalConstants from './../globalConstants.js'
import './../styles/PortfolioSection.css'
import ProjectCard from './ProjectCard.jsx'
import CardInfos from './CardInfos.jsx'
import { useSharedContext } from './../context/sharedStates';
import { useRef } from "react";
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Eine Komponente, die einen Container mit Projektkarten rendert.
 * Die Komponente rendert eine CardInfos-Komponente, wenn der gemeinsame Zustand 'visibleCardInfo' auf true gesetzt ist.
 * Andernfalls rendert sie einen Container mit ProjectCard-Komponenten.
 * 
 * @returns {JSX.Element} Die gerenderte Komponente.
 */

const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,  // Verzögert das Erscheinen der einzelnen Karten
        when: "afterChildren", // Warten, bis die Subelemente animiert wurden
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,   // Gestaffeltes Erscheinen der Karten
        when: "beforeChildren", // Subelemente zuerst animieren
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
        when: "afterChildren", // Karten zuerst entfernen
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.15 } }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } }, 
    exit: { opacity: 0, y: -50 , transition: { duration: 0.15 }},
  };

  const ProjectCardsContainer = () => {
    const { visibleCardInfo } = useSharedContext();  
    const containerRef = useRef(null);

    function hideScrollbar(){
      if (containerRef.current) {
        containerRef.current.style.overflow = "hidden";
      }
    };

    function showScrollbar(){
      if (containerRef.current) {
        containerRef.current.style.overflow = "auto";
      }
    };

    return (
      <div>
        <AnimatePresence mode="wait">
          {visibleCardInfo.isVisible ? (
            <CardInfos key="cardInfos" />
          ) : (
            <motion.div
              ref={containerRef}
              className="project-cards-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onAnimationStart={hideScrollbar}     // Ausblenden der Scrollleiste für die Animationsdauer
              onAnimationComplete={showScrollbar}  // Einblenden der Scrollleiste nach der Animation           
            >
              {globalConstants.PROJECT_CARDS_DATA.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants} // Animation für jede Karte
                >
                  <ProjectCard
                    cardIndex={index}
                    projectName={project.projectName}
                    projectDescription={project.projectDescription}
                    projectURL={project.projectURL}
                    projectImage={project.projectImage}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  export default ProjectCardsContainer;