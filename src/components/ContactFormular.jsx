import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import './../styles/ContactFormular.css'
import './../styles/Button.css'
import * as globalConstants from './../globalConstants.js';
import PopUp from "./PopUp";
import LoadingSpinnerPopup from './LoadingSpinnerPopup';


const ContactFormular = () => {
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

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
                fetch(`${SERVER_URL}/api/validate-captcha`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ captchaToken, userEmail}),
                }),
                serverTimeoutPromise
            ]);

            setIsLoading(false);

            if(response.ok) {
                emailjs
                .sendForm(serviceId, templateId, formData.current, {
                  publicKey: publicKey,
                })
                .then(
                  () => {
                    showPopup("Nachricht erfolgreich gesendet!", "success");
                    formData.current.reset();
                  },
                  (error) => {
                    console.log('Fehler beim Senden der Nachricht: ', error.text);
                    showPopup("Fehler beim Senden der Nachricht.", "error"); 
                  },
                );

            }else{
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
            <form className='contact-form' ref={formData} onSubmit={handleSubmit}>
                <div className='form-label'>
                    <label id='name-label'>Name:</label>
                    <input type="text" 
                            name="from_UserName"
                            placeholder='<Dein Name>' 
                            required/>
                </div>
                <div className='form-label'>
                    <label className='email-label'>E-Mail:</label>
                    <input type="email" 
                            name="from_UserEmail"
                            placeholder='<Deine E-Mail>'  
                            required/>
                </div>
                <div className='message-container'>
                    <label className='message-label'>Nachricht:</label>
                    <textarea id="text-field" 
                                name="message"
                                placeholder='<Deine Nachricht an mich>' 
                                required/>
                </div>
                {/* ReCaptcha */}
                <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                />

                {/* Datenschutzbestimmungen */}
                <div className='data-privacy-container' style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <input 
                        type="checkbox" 
                        className="checkbox-data-privacy" 
                        style={{ marginRight: '8px' }} 
                        required
                    />
                    <label>
                        Ich stimme den{" "} 
                        <a 
                        href="src/assets/datenschutz.html"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'black', textDecoration: 'underline'}}
                        >
                            Datenschutzbestimmungen
                        </a> 
                        {" "}zu.
                    </label>
                </div>
                <input className="generic-button" id='send-button' type="submit" value="Senden" />
            </form>
            {/* Popup-Komponenten */}
            <PopUp message={popupMessage} visible={popupVisible} type={popupType} />
            {!popupVisible && <LoadingSpinnerPopup isLoading={isLoading} />}
      </>
     );
}
 
export default ContactFormular;