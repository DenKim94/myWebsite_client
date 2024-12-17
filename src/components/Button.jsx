import './../styles/ProjectCard.css'
import './../styles/Button.css'
import PropTypes from 'prop-types';

/**
 * A reusable button component that displays a button with customizable text and an ID.
 *
 * @param {string} [buttonID='default-button'] - The ID for the button element.
 * @param {string} [buttonText='Click Me'] - The text to display on the button.
 * @param {function} callBackFcn - A callback function to be executed when the button is clicked.
 * @returns {JSX.Element} A styled button element.
 */
const Button = ({buttonID = 'default-button', buttonText = 'Click Me', callBackFcn}) => {
    return ( 
        <button className='generic-button' id={buttonID} onClick={callBackFcn}>
            {buttonText}
        </button>
     );
}

Button.propTypes = {
    buttonID: PropTypes.string,
    buttonText: PropTypes.string,
    callBackFcn: PropTypes.func.isRequired,
  };

export default Button;