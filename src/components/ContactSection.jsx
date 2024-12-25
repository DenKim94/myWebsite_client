import './../styles/ContactSection.css'
import ContactFormular from './ContactFormular';
import * as globalConstants from './../globalConstants.js';

/**
 * Die ContactSection-Komponente rendert einen Abschnitt der Webseite, 
 * der Kontaktinformationen und ein Kontaktformular enthält.
 *
 * @component
 * @example
 * return (
 *   <ContactSection />
 * )
 */

function ContactSection() {
    return ( 
        <section id='contact' className='contact-section'>
            <h1 id="contact-title">Kontakt</h1>
            <p id="contact-text">{globalConstants.INFO_TEXT_CONTACT}</p>
            <ContactFormular />
        </section>
        );
}

export default ContactSection