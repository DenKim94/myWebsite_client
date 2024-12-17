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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,  // Verzögert das Erscheinen der einzelnen Karten
      },
    },
  };

const ProjectCardsContainer = () => {
    const { visibleCardInfo } = useSharedContext();

    return ( 
        <div>
            <AnimatePresence>
                {visibleCardInfo.isVisible ? (
                    <CardInfos key="cardInfos"/>
                ) : (
                    <motion.div
                        className="project-cards-container"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {globalConstants.PROJECT_CARDS_DATA.map((project, index) => (
                            <ProjectCard
                                key={index}
                                cardIndex = {index}
                                projectName={project.projectName}
                                projectDescription={project.projectDescription}
                                projectURL={project.projectURL}
                                projectImage={project.projectImage}
                            />
                        ))}
                    </motion.div>             
                )}   
            </AnimatePresence>     
        </div>      
     );
}
 
export default ProjectCardsContainer;