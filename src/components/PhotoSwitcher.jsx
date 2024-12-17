import './../styles/PhotoSwitcher.css'
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as globalConstants from './../globalConstants.js'

const PhotoSwitcher = ({ fullPhotoPath, size_px = globalConstants.PHOTO_SIZE_DEFAULT_PX }) => {
    const [imgIndex, setImgIndex] = useState(0);

    function handleNext(){
        setImgIndex((prevIndex) => (prevIndex + 1) % fullPhotoPath.length);
    };

    function handlePrevious(){
        setImgIndex((prevIndex) => (prevIndex - 1 + fullPhotoPath.length) % fullPhotoPath.length);
    };

    return (
        <div className="switcher-container">
            <div
            className="image-switch-container"
            style={{
                '--border-color': globalConstants.PHOTO_BORDER_COLOR_SWITCHER,
                '--border-width': globalConstants.PHOTO_BORDER_WIDTH_SWITCHER,
                '--photoFrameSize': size_px
            }}
            >
                <div
                    className="image-slider"
                    style={{ transform: `translateX(-${imgIndex * 100}%)` }}
                >
                {fullPhotoPath.map((imagePath, index) => (
                    <div
                        className="current-image"
                        key={index}
                        style={{ backgroundImage: `url(${imagePath})`}}
                    />
                ))}
                </div>
            </div>
            <div className="button-container">
                <button className="switcher-button" onClick={handlePrevious}>
                    <img
                        src={globalConstants.ICON_PATHS_PHOTO_SWITCHER.left}
                        alt={`Icon previous image`}
                        className="arrow-left"
                    />
                </button>
                <button className="switcher-button" onClick={handleNext}>
                    <img
                        src={globalConstants.ICON_PATHS_PHOTO_SWITCHER.right}
                        alt={`Icon next image`}
                        className="arrow-right"
                    />
                </button>
            </div>
        </div>
    );
};
PhotoSwitcher.propTypes = {
    fullPhotoPath: PropTypes.arrayOf(PropTypes.string),
    size_px: PropTypes.string
  };

export default PhotoSwitcher;