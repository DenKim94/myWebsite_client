import * as globalConstants from './../globalConstants.js'
import './../styles/PortfolioSection.css'

/**
 * GeneralProjectDescription-Komponente
 * 
 * Diese Komponente rendert eine allgemeine Projektbeschreibung.
 * Der Beschreibungstext wird aus den globalen Konstanten entnommen.
 * 
 * @component
 * @example
 * return (
 *   <GeneralProjectDescription />
 * )
 */

const GeneralProjectDescription = () => {
    return ( 
        <div className="general-project-description" data-testid="general-project-description">
            <p>
                {globalConstants.GENERAL_PROJECT_DESCRIPTION}
            </p>
        </div>
     );
}
 
export default GeneralProjectDescription;