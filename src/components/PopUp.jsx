import PropTypes from 'prop-types';
import "./../styles/PopUp.css";

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
        <div className={`popup ${visible ? "show" : "hide"}`} style={popupStyle}>
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