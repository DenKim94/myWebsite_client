import * as globalConstants from './../globalConstants.js'
import './../styles/PortfolioSection.css'
import ProjectCard from './ProjectCard.jsx'
import CardInfos from './CardInfos.jsx'
import { useSharedContext } from './../context/sharedStates';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * A component that renders a container with project cards.
 * The component renders a CardInfos component if the shared state 'visibleCardInfo' is set to true.
 * Otherwise, it renders a container with ProjectCard components.
 * 
 * @returns {JSX.Element} The rendered component.
 */

const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1, // Verzögert das Erscheinen der einzelnen Karten
        when: "afterChildren", // Warten, bis die Kinder animiert wurden
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Gestaffeltes Erscheinen der Karten
        when: "beforeChildren", // Kinder zuerst animieren
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
    hidden: { opacity: 0, y: 50 }, // Startzustand: nach unten versetzt
    visible: { opacity: 1, y: 0 }, // Zielzustand: sichtbar
    exit: { opacity: 0, y: -50 }, // Endzustand: nach oben versetzt
  };
  
  const ProjectCardsContainer = () => {
    const { visibleCardInfo } = useSharedContext();
  
    return (
      <div>
        <AnimatePresence mode="wait">
          {visibleCardInfo.isVisible ? (
            <CardInfos key="cardInfos" />
          ) : (
            <motion.div
              className="project-cards-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit" // Exit-Animation hinzufügen
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