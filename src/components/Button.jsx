import './../styles/ProjectCard.css'
import './../styles/Button.css'
import PropTypes from 'prop-types';


/**
 * Button-Komponente, die einen generischen Button rendert.
 *
 * @param {string} buttonID - Die ID des Buttons. Standardwert ist 'default-button'.
 * @param {string} buttonText - Der Text, der auf dem Button angezeigt wird. Standardwert ist 'Click Me'.
 * @param {function} callBackFcn - Die Callback-Funktion, die beim Klicken auf den Button aufgerufen wird.
 * @returns {JSX.Element} Ein Button-Element.
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