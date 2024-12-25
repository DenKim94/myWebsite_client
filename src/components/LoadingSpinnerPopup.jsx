import PropTypes from 'prop-types';
import "./../styles/LoadingSpinnerPopup.css";

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