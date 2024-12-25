import PropTypes from 'prop-types';
import './../styles/PortfolioSection.css'
import './../styles/ProjectCard.css'
import Button from './Button.jsx'
import * as globalConstants from './../globalConstants.js'
import { useSharedContext } from './../context/sharedStates';
import { motion } from 'framer-motion';

/**
 * Eine Komponente, die eine Projektkarte rendert.
 * 
 * Die Projektkarte zeigt ein Symbol des Projekts, den Projektnamen und einen Button, um weitere Informationen anzuzeigen.
 * Wenn der Button geklickt wird, ändert die Komponente einen gemeinsamen Zustand, um die Projektinformationen durch eine andere Komponente anzuzeigen.
 * Die Höhe der Karte wird dynamisch basierend auf der Anzahl der verfügbaren Karten angepasst.
 * 
 * @param {number} [cardIndex] Index der spezifischen Karte (optional).
 * @param {string} projectName Der Name des Projekts.
 * @param {string} projectURL Die URL des Projekts.
 * @param {string} projectImage Die URL des Vorschaubildes des Projekts.
 * @returns {JSX.Element} Das gerenderte Element.
 */

const cardVariants = {
    hidden: { y: 80, opacity: 0 },  // Startposition: etwas unterhalb und unsichtbar
    visible: { y: 0, opacity: 1 },  // Endposition: in die normale Position gleiten
  };

const ProjectCard = ({cardIndex = undefined, projectName, projectURL, projectImage}) => {
    const { setVisibleCardInfo } = useSharedContext();
    let moreCardsAvailable = false;

    if(globalConstants.PROJECT_CARDS_DATA.length > globalConstants.MAX_NUM_VISIBLE_CARDS){
        moreCardsAvailable = true;
    }

    // Dynamische Anpassung der Card-Höhe in Äbhängigkeit der Anzahl der verwendeten Cards
    const height = moreCardsAvailable ? 
                    `calc(92% / ${globalConstants.MAX_NUM_VISIBLE_CARDS})`
                    : `calc(82% / ${globalConstants.MAX_NUM_VISIBLE_CARDS})`;  

    return ( 
        <motion.div
            className="project-card"
            style={{ height }}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: globalConstants.CARD_ANIMATION_DURATION }}
            whileHover={{ scale: 0.95 }}  // Zusätzlicher Hover-Effekt
        >
            <a className='project-reference' href={projectURL} target="_blank" rel="noopener noreferrer">
                <img
                    id={`card-image-${projectName}`}
                    src={projectImage}
                    alt={projectName}
                    width={globalConstants.ICON_SIZE_PX}
                    height={globalConstants.ICON_SIZE_PX}
                    style={{ borderRadius: '15px', marginTop: '0px' }}
                />
            </a>
            <div className='project-card-content'>
                <h3 className='project-card-title'>{projectName}</h3>
                <Button
                    buttonID={`info-button-${projectName}`}
                    buttonText={"Mehr Infos"}
                    callBackFcn={() => setVisibleCardInfo({cardIndex: cardIndex, isVisible: true})}
                />
            </div>
        </motion.div>
     );
}

ProjectCard.propTypes = {
    cardIndex: PropTypes.number,
    projectName: PropTypes.string.isRequired,
    projectURL: PropTypes.string.isRequired,
    projectImage: PropTypes.string.isRequired,
};

export default ProjectCard;