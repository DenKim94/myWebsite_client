import './../styles/SectionsGeneric.css'
import Typical from 'react-typical'
import * as globalConstants from './../globalConstants.js'

/**
 * Generates steps for the Typical component based on the provided word and durations.
 * 
 * @param {string} word - The word to animate.
 * @param {number} typeDuration - The duration for each character typing.
 * @param {number} holdDuration - The duration to hold the complete word.
 * @returns {Array} An array of steps for the Typical component.
 */
const generateSteps = (word, typeDuration, holdDuration) => {
    const steps = [];
    for (let i = 1; i <= word.length; i++) {
        steps.push(word.substring(0, i), typeDuration);
    }
    steps.push(word, holdDuration);
    return steps;
}

/**
 * Component for the text on the start page, which is initially invisible and then slides up.
 * The greeting text is animated using the react-typical library.
 * 
 * @returns A JSX element containing a div with the class 'info-text-container', 
 * which contains a h1 element with the class 'greeting-text' and a p element with the class 'description-text'.
 */
const InfoTextContainer = () => {
    const steps = [
        ...generateSteps('Denis.', globalConstants.TYPE_ANIMATION_DURATION_1, globalConstants.HOLD_ANIMATION_DURATION_1),
        ...generateSteps('Webentwickler.', globalConstants.TYPE_ANIMATION_DURATION_2, globalConstants.HOLD_ANIMATION_DURATION_2),
        ...generateSteps('Denis.', globalConstants.TYPE_ANIMATION_DURATION_1, globalConstants.HOLD_ANIMATION_DURATION_1),
    ];

    return ( 
        <div className='info-text-container'>
            <h1 className="greeting-text">
                Hallo, ich bin{' '}
                <Typical
                    loop={globalConstants.NUMBER_LOOP_ANIMATION}
                    wrapper="span"
                    steps={steps}
                />
            </h1>     
        </div>
    );
}
 
export default InfoTextContainer;
