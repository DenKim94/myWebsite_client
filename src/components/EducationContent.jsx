import './../styles/EducationContent.css';
import * as globalConstants from './../globalConstants.js';

const EducationContent = () => {
    return ( 
        <div className='education-content'>
            {globalConstants.EDUCATION_CONTENT.map((obj, obj_index) => (
                <div className='education-list' key={obj_index}>
                    <h5 id='education-time-period'>{obj.timePeriod}</h5>
                    <div className='education-items'>
                        <h4 id='education-title'>{obj.description}</h4>
                        <p id='education-location'>{obj.institution}</p>
                        <ul className='education-duties'>
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