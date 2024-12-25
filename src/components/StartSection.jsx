import './../styles/SectionsGeneric.css'
import './../styles/StartSection.css'
import InfoTextContainer from './InfoTextContainer.jsx';
import PhotoSlider from './PhotoSlider.jsx';
import * as globalConstants from './../globalConstants.js'


/**
 * StartSection-Komponente
 * 
 * Diese Komponente rendert den Startabschnitt der Webseite. 
 * Sie enthält einen InfoTextContainer und einen PhotoSlider.
 * 
 * @component
 * @returns {JSX.Element} Der gerenderte Startabschnitt
 */

function StartSection() {
    return ( 
        <section id='start'className='start-section'>
            <InfoTextContainer />
            <div className='start-content-container'>
                <p className="description-text">
                    {globalConstants.INFO_TEXT_START_SECTION}
                </p>  
                <PhotoSlider fullPhotoPath = {globalConstants.fullPhotoPath_slider} size_px={globalConstants.PHOTO_SIZE_DEFAULT_PX} />
            </div>
        </section>
    );
}

export default StartSection;