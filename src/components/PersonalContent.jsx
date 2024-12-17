import './../styles/PersonalContent.css';
import PhotoSwitcher from './PhotoSwitcher.jsx';
import * as globalConstants from './../globalConstants.js';

const PersonalContent = () => {
    return ( 
        <div className="personal-content">
            <div className="personal-photo-switcher">
                <PhotoSwitcher fullPhotoPath={globalConstants.fullPhotoPath_switcher} size_px = {globalConstants.PHOTO_SIZE_SWITCHER_PX}  />
            </div>
            <p id="personal-description" style={{ whiteSpace: 'pre-line' }}>
                {globalConstants.INFO_TEXT_PERSONAL}
            </p> 
        </div>
     );
}
 
export default PersonalContent;