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

        try{
            setIsLoading(true);
            // const response = await fetch(`${SERVER_URL}/api/validate-captcha`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ captchaToken }),
            // });

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const res = await fetch(`${SERVER_URL}/api/validate-captcha`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ captchaToken }),
                    });
                    resolve(res);
                }, 5000);
            });

            setIsLoading(false);

            if(response.ok) {
                emailjs
                .sendForm(serviceId, templateId, formData.current, {
                  publicKey: publicKey,
                })
                .then(
                  () => {
                    showPopup("Nachricht erfolgreich gesendet!", "success");
                  },
                  (error) => {
                    console.log('Fehler beim Senden der Nachricht: ', error.text);
                    showPopup("Fehler beim Senden der Nachricht.", "error"); 
                  },
                );

            }else{
                console.log('Fehler bei Validierung des Captchas.'); 
                showPopup("Fehler bei Validierung des Captchas. Bitte erneut versuchen.", "error"); 
            } 

        }catch(error){
            setIsLoading(false);

            console.error(error.message)
            showPopup("Serverfehler ist aufgetreten.", "error"); 
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