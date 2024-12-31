import PropTypes from 'prop-types';
import "./../styles/PopUp.css";

/**
 * Popup-Komponente, die eine Nachricht anzeigt und je nach Typ unterschiedliche Stile anwendet.
 *
 * @param {Object} props - Die Eigenschaften, die an die Komponente übergeben werden.
 * @param {string} props.message - Die Nachricht, die im Popup angezeigt wird.
 * @param {boolean} props.visible - Gibt an, ob das Popup sichtbar ist oder nicht.
 * @param {string} [props.type='info'] - Der Typ des Popups, der das Styling bestimmt. 
 *                                       Mögliche Werte sind 'info', 'warning', 'success', 'error'.
 *
 * @returns {JSX.Element} Die gerenderte Popup-Komponente.
 */

const Popup = ({ message, visible, type = 'info' }) => {
  
    const normalizedType = (type || "info").toLowerCase();
    const validTypes = ["info", "warning", "success", "error"];
  
    // Fallback auf den Standardwert, wenn der Wert von 'type' ungültig ist
    const appliedType = validTypes.includes(normalizedType) ? normalizedType : "info";

    const typeStyles = {
        info: { backgroundColor: "#333", color: "white" },
        warning: { backgroundColor: "#333", color: "yellow" },
        success: { backgroundColor: "#333", color: "lightgreen" },
        error: { backgroundColor: "#333", color: "red" },
    };

    const popupStyle = {
        ...typeStyles[appliedType],
      };

    return (
        <div className={`popup ${visible ? "show" : "hide"}`} data-testid="pop-up" style={popupStyle}>
            {message}
        </div>
    );
};

Popup.propTypes = {
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    type: PropTypes.string,
  };

export default Popup;