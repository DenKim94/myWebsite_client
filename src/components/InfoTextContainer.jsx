import './../styles/SectionsGeneric.css'
import Typical from 'react-typical'
import * as globalConstants from './../globalConstants.js'

/**
 * Component for the text on the start page, which is initially invisible and then slides up.
 * The greeting text is animated using the react-typical library.
 * 
 * @returns A JSX element containing a div with the class 'info-text-container', 
 * which contains a h1 element with the class 'greeting-text' and a p element with the class 'description-text'.
 */
const InfoTextContainer = () => {
    return ( 
        <div className='info-text-container'>
            <h1 className="greeting-text">
                Hallo, ich bin{' '}
                <Typical
                    loop={globalConstants.NUMBER_LOOP_ANIMATION}
                    wrapper="span"
                    steps={[
                        'D', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'De', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Den', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Deni', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Denis.', globalConstants.HOLD_ANIMATION_DURATION_1,   
                        'Deni', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Den', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'De', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'D', globalConstants.TYPE_ANIMATION_DURATION_1,
                        '', globalConstants.TYPE_ANIMATION_DURATION_1, 
                        'W', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'We', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Web', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webe', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Weben', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webent', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentw', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwi', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwic', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwickl', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwickle', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwickler.', globalConstants.HOLD_ANIMATION_DURATION_2,   
                        'Webentwickle', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwickl', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwick', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwic', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentwi', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webentw', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webent', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Weben', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Webe', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'Web', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'We', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'W', globalConstants.TYPE_ANIMATION_DURATION_2,
                        '', globalConstants.TYPE_ANIMATION_DURATION_2,
                        'D', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'De', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Den', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Deni', globalConstants.TYPE_ANIMATION_DURATION_1,
                        'Denis.', globalConstants.HOLD_ANIMATION_DURATION_1,   
                    ]}
                />
            </h1>     
        </div>
    );
}
 
export default InfoTextContainer;