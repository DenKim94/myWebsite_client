import * as globalConstants from './../globalConstants.js'
import './../styles/PortfolioSection.css'

const GeneralProjectDescription = () => {
    return ( 
        <div className='general-project-description'>
            <p>
                {globalConstants.GENERAL_PROJECT_DESCRIPTION}
            </p>
        </div>
     );
}
 
export default GeneralProjectDescription;