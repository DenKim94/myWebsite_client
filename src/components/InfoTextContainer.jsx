import './../styles/SectionsGeneric.css'
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import * as globalConstants from './../globalConstants.js'


/**
 * Komponente mit animiertem Begrüßungstext (Bibliothek: react-simple-typewriter).
 * 
 * @returns Ein JSX-Element, das ein div mit der Klasse 'info-text-container' enthält,
 * welches ein h1-Element mit der Klasse 'greeting-text' und ein p-Element mit der Klasse 'description-text' enthält.
 */

const InfoTextContainer = () => {
    const [text] = useTypewriter({
        words: ['Denis.', 'Webentwickler.', 'Denis.'], // Animierte Wörter
        loop: globalConstants.NUMBER_LOOP_ANIMATION,   // Anzahl der Wiederholungen
        typeSpeed: globalConstants.TYPE_ANIMATION_DURATION_1,   // Schreibgeschwindigkeit
        deleteSpeed: globalConstants.TYPE_ANIMATION_DURATION_2, // Löschgeschwindigkeit
        delaySpeed: globalConstants.HOLD_ANIMATION_DURATION,  // Pause zwischen den Wörtern
    });

    return ( 
        <div className='info-text-container'>
            <h1 className="greeting-text">
                Hallo, ich bin{' '}
                <span>{text}</span>
                <Cursor cursorStyle="|" />
            </h1>     
        </div>
    );
}
 
export default InfoTextContainer;
