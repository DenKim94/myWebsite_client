import './../styles/SectionsGeneric.css'
import './../styles/StartSection.css'
import InfoTextContainer from './InfoTextContainer.jsx';
import PhotoSlider from './PhotoSlider.jsx';
import * as globalConstants from './../globalConstants.js'

/**
 * The StartSection component is a React functional component that serves
 * as the start page section of the application. It renders a section
 * containing an 'InfoTextContainer' and a 'PhotoSlider', utilizing the
 * 'fullPhotoPath' constant from globalConstants to display images.
 * 
 * @returns {JSX.Element} A JSX element representing the start section.
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