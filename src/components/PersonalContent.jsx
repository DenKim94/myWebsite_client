import './../styles/PersonalContent.css';
import PhotoSwitcher from './PhotoSwitcher.jsx';
import * as globalConstants from './../globalConstants.js';

/**
 * PersonalContent-Komponente
 * 
 * Diese Komponente rendert persönliche Inhalte, einschließlich eines Foto-Switchers und einer Beschreibung.
 * 
 * @returns {JSX.Element} Ein div-Element mit der Klasse "personal-content", das einen Foto-Switcher und eine Beschreibung enthält.
 */

const PersonalContent = () => {
    return ( 
        <div className="personal-content" data-testid="personal-content">
            <div className="personal-photo-switcher" data-testid="personal-photo-switcher">
                <PhotoSwitcher fullPhotoPath={globalConstants.fullPhotoPath_switcher} size_px = {globalConstants.PHOTO_SIZE_SWITCHER_PX}  />
            </div>
            <p id="personal-description" data-testid="personal-description" style={{ whiteSpace: 'pre-line' }}>
                {globalConstants.INFO_TEXT_PERSONAL}
            </p> 
        </div>
     );
}
 
export default PersonalContent;