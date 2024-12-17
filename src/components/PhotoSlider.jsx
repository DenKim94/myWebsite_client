import './../styles/SectionsGeneric.css'
import './../styles/PhotoSlider.css'
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import * as globalConstants from './../globalConstants.js'

/**
 * Component for the photo slider on the start page.
 * 
 * @param {array<string>} fullPhotoPath Array of paths to the images to be displayed.
 * The images are displayed in order, and the component will cycle through
 * the array when it reaches the end.
 * 
 * @returns A JSX element which is a div with the class 'image-container',
 * containing a div with the class 'slider' which contains a div with the class 'slide'
 * for each image in the array. The 'slide' divs are positioned side by side
 * and have their background image set to the corresponding image in the array.
 * The 'slider' div is translated to the left by the width of the current image
 * (which is determined by the 'currentIndex' state variable) to create the
 * animation effect.
 */
const PhotoSlider = ({ fullPhotoPath, size_px = globalConstants.PHOTO_SIZE_DEFAULT_PX}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInView, setIsInView] = useState(false); // Status, ob die Komponente im sichtbaren Bereich ist
    const [isForward, setIsForward] = useState(true); // Status für die Richtung der Diashow
    const sliderRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting); // Setze isInView auf true, wenn der Slider sichtbar ist
        },
        { threshold: globalConstants.OBSERVER_THRESHOLD_PHOTOSLIDER }
      );
      const sliderElement = sliderRef.current;

      if (sliderElement) {
        observer.observe(sliderElement);
      }
  
      return () => {
        if (sliderElement) {
          observer.unobserve(sliderElement);
        }
      };
    }, []);

    useEffect(() => {
      if (!isInView) return; // Wenn die Komponente nicht im sichtbaren Bereich ist, keine Diashow ausführen

      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (isForward) {
            // Wenn die Richtung vorwärts ist und das letzte Bild erreicht wird
            if (prevIndex === fullPhotoPath.length - 1) {
              setIsForward(false); // Richtung auf rückwärts ändern
              return prevIndex - 1;
            }
            return prevIndex + 1;
          } else {
            // Wenn die Richtung rückwärts ist und das erste Bild erreicht wird
            if (prevIndex === 0) {
              setIsForward(true); // Richtung auf vorwärts ändern
              return prevIndex + 1;
            }
            return prevIndex - 1;
          }
        });
      }, globalConstants.DURATION_IMAGE_ANIMATION); // Zeitintervall für den Bildwechsel in Sekunden
      
      return () => clearInterval(intervalId);

    }, [fullPhotoPath.length, isInView, isForward]);

    return ( 
        <div
          ref={sliderRef} // Referenz für den IntersectionObserver
          className="image-container"
          style={{
            '--border-color': globalConstants.PHOTO_BORDER_COLOR,
            '--border-width': globalConstants.PHOTO_BORDER_WIDTH,
            '--photoFrameSize': size_px
          }}
        >
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {fullPhotoPath.map((imagePath, index) => (
            <div
                className="slide"
                key={index}
                style={{ backgroundImage: `url(${imagePath})` }}
            />
          ))}
        </div>
      </div>
     );
}

PhotoSlider.propTypes = {
    fullPhotoPath: PropTypes.arrayOf(PropTypes.string),
    size_px: PropTypes.string
  };

export default PhotoSlider;