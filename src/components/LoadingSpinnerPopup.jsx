import PropTypes from 'prop-types';
import "./../styles/LoadingSpinnerPopup.css";

/**
 * LoadingSpinnerPopup-Komponente zeigt ein Lade-Popup mit einer Spinner-Animation und einer Nachricht an.
 *
 * @param {Object} props - Die Eigenschaften, die an die Komponente übergeben werden.
 * @param {boolean} props.isLoading - Gibt an, ob das Popup angezeigt werden soll.
 * @param {string} [props.message="Bitte warten..."] - Die Nachricht, die im Popup angezeigt wird.
 *
 * @returns {JSX.Element} Die gerenderte LoadingSpinnerPopup-Komponente.
 */

const LoadingSpinnerPopup = ({ isLoading, message = "Bitte warten..."}) => {

    return (
        <div className={`popup ${isLoading ? "show" : "hide"}`}>
            <div className="spinner-border"></div>
            <span className="spinner-message">{message}</span> 
        </div>
    );
};

LoadingSpinnerPopup.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string,
};

export default LoadingSpinnerPopup;