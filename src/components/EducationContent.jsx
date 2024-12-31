import './../styles/EducationContent.css';
import * as globalConstants from './../globalConstants.js';

/**
 * EducationContent-Komponente
 * 
 * Diese Komponente rendert eine Liste von Bildungseinträgen basierend auf den Daten in `globalConstants.EDUCATION_CONTENT`.
 * Jeder Eintrag enthält eine Zeitperiode, eine Beschreibung, eine Institution und eine Liste von Aufgaben.
 * 
 * @component
 * @example
 * // Beispiel für die Verwendung der EducationContent-Komponente
 * // <EducationContent />
 * 
 * @returns {JSX.Element} Eine Liste von Bildungseinträgen.
 */

const EducationContent = () => {
    return ( 
        <div className="education-content" data-testid="education-content">
            {globalConstants.EDUCATION_CONTENT.map((obj, obj_index) => (
                <div className="education-list" data-testid="education-list" key={obj_index}>
                    <h5 id="education-time-period">{obj.timePeriod}</h5>
                    <div className="education-items" data-testid="education-items">
                        <h4 id="education-title">{obj.description}</h4>
                        <p id="education-location">{obj.institution}</p>
                        <ul className="education-duties">
                            {obj.duties.map((duty, duty_index) => (
                                <li key={duty_index}>{duty}</li>
                            ))}
                        </ul>
                    </div>                
                </div>
            ))}
        </div> 
     );
}
 
export default EducationContent;