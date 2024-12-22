import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import './../styles/ContactFormular.css'
import './../styles/Button.css'


const ContactFormular = () => {
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

    const formData = useRef();
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!captchaToken) {
            console.log('Bitte lösen Sie das Captcha.'); // To-Do: Popup 
            return;
        }

        try{
            const response = await fetch(`${SERVER_URL}/api/validate-captcha`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ captchaToken }),
              });
              
            // Antwort vom Server in JSON parsen
            const data = await response.json();
            console.log(data.message);

            if(response.ok) {
                emailjs
                .sendForm(serviceId, templateId, formData.current, {
                  publicKey: publicKey,
                })
                .then(
                  () => {
                    console.log('Nachricht erfolgreich gesendet!'); // To-Do: Popup 
                  },
                  (error) => {
                    console.log('Fehler beim Senden der Nachricht: ', error.text); // To-Do: Popup 
                  },
                );

            }else{

                console.log('Fehler bei Validierung des Captchas.'); // To-Do: Popup 
            } 

        }catch(error){
            console.error(error.message)
        }
    }

    return ( 
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
     );
}
 
export default ContactFormular;