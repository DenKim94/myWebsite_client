import './../styles/AboutSection.css'
import './TabsContainer.jsx'
import TabsContainer from './TabsContainer.jsx';


function AboutSection() {
    return ( 
        <section id='about' className='about-section'>
            <h1 id ='about-title'> Über mich </h1>
            <TabsContainer />
        </section>
        );
}

export default AboutSection;