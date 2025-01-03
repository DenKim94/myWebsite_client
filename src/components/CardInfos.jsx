import * as globalConstants from './../globalConstants.js'
import './../styles/CardInfos.css'
import { useSharedContext } from './../context/sharedStates';
import Button from './Button.jsx'
import { motion } from 'framer-motion';


/**
 * Die CardInfos-Komponente zeigt detaillierte Informationen zu einem ausgewählten Projekt an.
 * Sie verwendet die `useSharedContext`-Hook, um den aktuell sichtbaren Kartenindex zu erhalten und 
 * die Sichtbarkeit der Karteninformationen zu steuern.
 * 
 * @component
 * @returns {JSX.Element} Eine animierte Container-Div, die den Projektnamen, die Projektbeschreibung und 
 * optional ein Projekt-Demovideo anzeigt. Ein Schließen-Button ist ebenfalls enthalten, um die Karteninformationen auszublenden.
 * 
 * @example
 * // Beispielverwendung:
 * <CardInfos />
 * 
 * @remarks
 * Diese Komponente verwendet `framer-motion` für Animationen und `globalConstants` für Konfigurationswerte.
 * 
 * @hook
 * @name useSharedContext
 * @description Hook, um den gemeinsam genutzten Zustand der sichtbaren Karteninformationen zu verwalten.
 * 
 * @constant {Object} globalConstants.PROJECT_CARDS_DATA - Enthält die Daten aller Projektkarten.
 * @constant {number} globalConstants.CARDINFO_ANIMATION_DURATION - Dauer der Animation für die Karteninformationen.
 * 
 * @typedef {Object} ProjectInfo
 * @property {string} projectName - Der Name des Projekts.
 * @property {string} projectURL - Die URL des Projekts.
 * @property {string[]} projectDescription - Eine Liste von Beschreibungen des Projekts.
 * @property {string} [projectDemo] - Optionaler Pfad zu einem Demovideo des Projekts.
 */

const slideAnimation = {
    hidden: { y: '-100%', opacity: 0 },  // Start außerhalb des Bildschirms auf der linken Seite
    visible: { y: 0, opacity: 1 },       // In die Sicht schieben
    exit: { y: '-100%', opacity: 0 }     // Beim Schließen nach links herausgleiten
  };

const CardInfos = () => {
    const { visibleCardInfo, setVisibleCardInfo } = useSharedContext();
    const projInfo = globalConstants.PROJECT_CARDS_DATA[visibleCardInfo?.cardIndex];

    return ( 
        <motion.div className="card-infos-container"
            data-testid="card-infos-container"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideAnimation}
            transition={{ duration: globalConstants.CARDINFO_ANIMATION_DURATION }}
        >
            <h2 id="info-project-name">
                <a  href={projInfo?.projectURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    id="info-project-title"
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                    {projInfo?.projectName}
                </a>
            </h2>
            <div className="info-project-content" data-testid="info-project-content">
                <ul id="info-project-description" data-testid="info-project-description">
                    {projInfo?.projectDescription.map((item, index) => (
                    <li key={index} style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                       <strong>{item.split(':')[0]}</strong>: {item.split(':')[1]}
                    </li>
                    ))}
                </ul> 
                
                {projInfo?.projectDemo ? (   
                    <video className = "info-project-demo" width="90%" height="auto" controls controlsList="nodownload" muted>
                        <source src={projInfo.projectDemo} type="video/mp4"/>
                        Ihr Browser unterstützt das Video-Tag nicht.
                    </video>
                ): null}

            </div>
            <Button
                buttonID={`close-button`}
                buttonText={"Schließen"}
                callBackFcn={() => setVisibleCardInfo({isVisible: false})}
            />
        </motion.div>
     );
}


export default CardInfos;