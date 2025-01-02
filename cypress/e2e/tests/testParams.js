import * as globalConstants from '../../../src/globalConstants';

export const viewportSizes = {
    desktop: [1920, 1080],      // [width, height] in pixels
    laptop_14: [1512, 982],
    tablet_mini: [744, 1133],
    tablet_10: [810, 1080],
    tablet_10_landscape: [1080, 810],
    tablet_11: [834, 1194],
    mobile_mini: [360, 780],
    mobile_standard: [390, 844],
    mobile_max: [430, 932],
    mobile_max_landscape: [932, 430],
};

export const genericSettings = {
    clientURL: 'http://localhost:3000',
};

export const animationDurations = {
    TYPE_ANIMATION_DURATION: globalConstants.TYPE_ANIMATION_DURATION,               // Schreibgeschwindigkeit in ms; Wert aus globalConstants.js
    TYPE_ANIMATION_DURATION_DELETE: globalConstants.TYPE_ANIMATION_DURATION_DELETE, // Löschgeschwindigkeit in ms; Wert aus globalConstants.js
    HOLD_ANIMATION_DURATION: globalConstants.HOLD_ANIMATION_DURATION,               // Pause zwischen den Wörtern in ms; Wert aus globalConstants.js 
    DURATION_IMAGE_ANIMATION: globalConstants.DURATION_IMAGE_ANIMATION,             // Zeitintervall für den Bildwechsel in ms; Wert aus globalConstants.js
};

export const textContent = {
    INFO_TEXT_START_SECTION: globalConstants.INFO_TEXT_START_SECTION,
};

export const paths = {
    sliderPhotoPath: globalConstants.fullPhotoPath_slider, 
};
