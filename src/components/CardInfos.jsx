import * as globalConstants from './../globalConstants.js'
import './../styles/CardInfos.css'
import { useSharedContext } from './../context/sharedStates';
import Button from './Button.jsx'
import { motion } from 'framer-motion';


/**
 * A component that renders a container with project informations.
 * The component renders a CardInfos component if the shared state 'visibleCardInfo' is set to true.
 * Otherwise, it renders nothing.
 * 
 * The component uses framer motion to slide in and out of the screen.
 * The animation duration can be adjusted by changing the 'transition' property.
 * 
 * The component also renders a button to close the container.
 * When the button is clicked, the component changes a shared state to display the project information by another component.
 * 
 * @returns {JSX.Element} The rendered component.
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
        <motion.div className='card-infos-container'
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
                    id='info-project-title'
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                    {projInfo?.projectName}
                </a>
            </h2>
            <div className='info-project-content'>
                <ul id='info-project-description'>
                    {projInfo?.projectDescription.map((item, index) => (
                    <li key={index} style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                       <strong>{item.split(':')[0]}</strong>: {item.split(':')[1]}
                    </li>
                    ))}
                </ul> 
                
            {projInfo?.projectDemo ? (   
                <video className = 'info-project-demo' width="90%" height="auto" controls controlsList="nodownload">
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