import './../styles/AboutSection.css'
import './TabsContainer.jsx'
import TabsContainer from './TabsContainer.jsx';


/**
 * Die AboutSection-Komponente rendert einen Abschnitt mit Informationen über mich.
 * 
 * @component
 * @example
 * return (
 *   <AboutSection />
 * )
 * 
 * @returns {JSX.Element} Ein JSX-Element, das den "Über mich"-Abschnitt darstellt.
 */

function AboutSection() {
    return ( 
        <section id='about' className='about-section'>
            <h1 id ='about-title'> Über mich </h1>
            <TabsContainer />
        </section>
        );
}

export default AboutSection;