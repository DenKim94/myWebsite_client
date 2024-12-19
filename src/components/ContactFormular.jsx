import { useRef } from 'react';
import emailjs from '@emailjs/browser';
// import ReCAPTCHA from "react-google-recaptcha";
import './../styles/ContactFormular.css'
import './../styles/Button.css'


const ContactFormular = () => {
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const formData = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm(serviceId, templateId, formData.current, {
          publicKey: publicKey,
        })
        .then(
          () => {
            console.log('SUCCESS!'); // To-Do: Popup 
          },
          (error) => {
            console.log('FAILED...', error.text); // To-Do: Popup 
          },
        );
    }

    return ( 
        <form className='contact-form' ref={formData} onSubmit={sendEmail}>
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
            {/* To-Do: ReCaptcha */}


            {/* Datenschutzbestimmungen */}
            <div className='data-privacy-container' style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <input 
                    type="checkbox" 
                    className="checkbox-data-privacy" 
                    style={{ marginRight: '8px' }} 
                    required
                />
                <label>
                    Ich habe die{" "} 
                    <a 
                    href="src/assets/datenschutz.html"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'black', textDecoration: 'underline'}}
                    >
                        Datenschutzbestimmungen
                    </a> 
                    {" "} gelesen und stimme diesen zu.
                </label>
            </div>
            <input className="generic-button" id='send-button' type="submit" value="Senden" />
        </form>
     );
}
 
export default ContactFormular;