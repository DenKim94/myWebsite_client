import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import './../styles/ContactFormular.css'
import './../styles/Button.css'
import * as globalConstants from './../globalConstants.js';
import PopUp from "./PopUp";
import LoadingSpinnerPopup from './LoadingSpinnerPopup';


/**
 * ContactFormular-Komponente
 * 
 * Diese Komponente stellt ein Kontaktformular bereit, das es Benutzern ermöglicht, eine Nachricht zu senden.
 * Es beinhaltet Felder für den Namen, die E-Mail-Adresse und die Nachricht des Benutzers sowie eine ReCAPTCHA-Überprüfung.
 * 
 * @component
 * 
 * @returns {JSX.Element} Ein JSX-Element, das das Kontaktformular darstellt.
 * 
 * @example
 * <ContactFormular />
 * 
 * @remarks
 * - Die Komponente verwendet die EmailJS-Bibliothek, um E-Mails zu senden.
 * - Die ReCAPTCHA-Überprüfung stellt sicher, dass das Formular nicht von Bots ausgefüllt wird.
 * - Popup-Nachrichten informieren den Benutzer über den Status des Formulars (Erfolg, Fehler, Warnung).
 * - Die Komponente verwendet Umgebungsvariablen für die Konfiguration von EmailJS und ReCAPTCHA.
 * 
 * @requires useRef
 * @requires useState
 * @requires emailjs
 * @requires ReCAPTCHA
 * @requires PopUp
 * @requires LoadingSpinnerPopup
 * 
 * @constant {string} serviceId - Die Service-ID für EmailJS.
 * @constant {string} templateId - Die Template-ID für EmailJS.
 * @constant {string} publicKey - Der öffentliche Schlüssel für EmailJS.
 * @constant {string} SERVER_URL - Die URL des Servers für die Captcha-Validierung.
 * 
 * @function showPopup
 * @description Zeigt eine Popup-Nachricht an.
 * @param {string} message - Die Nachricht, die im Popup angezeigt werden soll.
 * @param {string} popUpType - Der Typ des Popups (z.B. "info", "success", "warning", "error").
 * 
 * @function handleSubmit
 * @description Behandelt das Absenden des Formulars.
 * @param {Event} e - Das Submit-Event des Formulars.
 * @returns {Promise<void>}
 */

const ContactFormular = () => {
    
    const formData = useRef();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("info");
    const [popupVisible, setPopupVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function showPopup(message, popUpType) {
        setPopupMessage(message);
        setPopupType(popUpType)
        setPopupVisible(true);
        
        // Popupnachricht nach Ablauf des Timers schließen
        setTimeout(() => setPopupVisible(false), globalConstants.POPUP_TIMEOUT_ms); 
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!captchaToken) {
            showPopup("Bitte lösen Sie das Captcha.", "warning"); 
            return;
        }
        
        const userEmail = formData.current.from_UserEmail.value;

        const serverTimeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout: Keine Rückmeldung vom Server.")), globalConstants.SERVER_TIMEOUT_THRESHOLD_ms)
        );

        try{
            setIsLoading(true);
            const response = await Promise.race([
                fetch(`${globalConstants.SERVER_URL}/api/validate-captcha`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ captchaToken, userEmail}),
                }),
                serverTimeoutPromise
            ]);

            if(response.ok) {
                emailjs
                .sendForm(globalConstants.SERVICE_ID, globalConstants.TEMPLATE_ID, formData.current, {
                  publicKey: globalConstants.PUBLIC_KEY,
                })
                .then(
                  () => {
                    setIsLoading(false);
                    showPopup("Nachricht erfolgreich gesendet!", "success");
                    formData.current.reset();
                    setCaptchaToken(null);
                  },
                  (error) => {
                    setIsLoading(false);
                    console.log('Fehler beim Senden der Nachricht: ', error.text);
                    showPopup("Fehler beim Senden der Nachricht.", "error"); 
                  },
                );

            }else{
                setIsLoading(false);
                const errorData = await response.json();
                showPopup(errorData.error, "error"); 
            } 

        }catch(error){
            setIsLoading(false);
            console.error(error.message)
            showPopup("Serverfehler. Bitte erneut versuchen.", "error"); 
        }
    }

    return ( 
        <>
            <form className="contact-form" 
                data-testid="contact-form"
                ref={formData} 
                onSubmit={handleSubmit}>

                <div className="form-label">
                    <label id="name-label">Name:</label>
                    <input type="text"
                            data-testid="name-input" 
                            name="from_UserName"
                            placeholder="<Dein Name>" 
                            required/>
                </div>
                <div className="form-label">
                    <label className="email-label">E-Mail:</label>
                    <input type="email" 
                            data-testid="email-input"
                            name="from_UserEmail"
                            placeholder="<Deine E-Mail>"  
                            required/>
                </div>
                <div className="message-container">
                    <label className="message-label">Nachricht:</label>
                    <textarea id="text-field" 
                                data-testid="message-input"
                                name="message"
                                placeholder="<Deine Nachricht an mich>" 
                                required/>
                </div>
                {/* ReCaptcha */}
                <ReCAPTCHA
                    sitekey={globalConstants.RECAPTCHA_SITE_KEY}
                    data-testid="recaptcha"
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                    style={{ maxHeight: '120px' }} 
                />

                {/* Datenschutzbestimmungen */}
                <div className="data-privacy-container" style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <input 
                        type="checkbox" 
                        className="checkbox-data-privacy"
                        data-testid="data-privacy-checkbox" 
                        style={{ marginRight: '8px' }} 
                        required
                    />
                    <label>
                        Ich stimme den{" "} 
                        <a 
                        href="/datenschutz.html"
                        id='data-privacy-link'
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'black', textDecoration: 'underline'}}
                        >
                            Datenschutzbestimmungen
                        </a> 
                        {" "}zu.
                    </label>
                </div>
                <input className="generic-button" id="send-button" type="submit" value="Senden" />
            </form>
            {/* Popup-Komponenten */}
            <PopUp message={popupMessage} visible={popupVisible} type={popupType} />
            {!popupVisible && <LoadingSpinnerPopup isLoading={isLoading} />}
      </>
     );
}
 
export default ContactFormular;