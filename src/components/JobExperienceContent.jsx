import './../styles/JobContent.css';
import * as globalConstants from './../globalConstants.js';

const JobExperienceContent = () => {

    return ( 
        <div className='job-content'>
            <p id="job-description">
                {globalConstants.INFO_TEXT_JOB_EXPERIENCE}
            </p>
            {globalConstants.JOB_EXPERIENCE_CONTENT.map((jobObj, job_index) => (
                <div className='job-list' key={job_index}>
                    <h5 id='job-time-period'>{jobObj.timePeriod}</h5>
                    <div className='job-items'>
                        <h4 id='job-title'>{jobObj.jobTitle}</h4>
                        <a id='company-name' href={jobObj.url} target="_blank">{jobObj.company}</a>
                        <p id='job-location'>{jobObj.location}</p>
                        <ul className='job-duties'>
                            {jobObj.duties.map((duty, duty_index) => (
                                <li key={duty_index}>{duty}</li>
                            ))}
                        </ul>
                    </div>                
                </div>
            ))}
        </div> 
     );
}
 
export default JobExperienceContent;