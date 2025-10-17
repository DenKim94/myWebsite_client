import {useState, useEffect} from 'react'
import './../styles/Header.css'
import * as globalConstants from './../globalConstants.js'


/**
 * Header-Komponente, die die Navigationsleiste und das Logo der Website darstellt.
 * 
 * Funktionen:
 * - showSidebar: Zeigt die Sidebar an, indem die Klasse 'open' hinzugefügt wird.
 * - hideSidebar: Versteckt die Sidebar, indem die Klasse 'open' entfernt wird.
 * - scrollToSection: Scrollt zu einem bestimmten Abschnitt der Seite, basierend auf dem href-Attribut des angeklickten Links.
 * 
 * State:
 * - windowSize: Ein State-Objekt, das die aktuelle Breite und Höhe des Fensters speichert.
 * 
 * Effekte:
 * - useEffect: Fügt einen Event-Listener hinzu, um die Fenstergröße bei einer Größenänderung zu aktualisieren und entfernt diesen bei der Bereinigung.
 * 
 * Bedingte Logik:
 * - Versteckt die Sidebar, wenn die Fensterbreite größer oder gleich dem definierten Schwellenwert ist.
 * 
 * Rückgabewert:
 * - Ein Header-Element mit einer festen Position, das das Logo und die Navigationsleiste enthält.
 * 
 * @returns {JSX.Element} Die Header-Komponente.
 */

function Header() {

  function showSidebar(){
    const sidebar = document.querySelector('.sidebar-elements')
    if(sidebar){
      sidebar.classList.add('open');
      document.body.style.overflow = 'hidden'; // Scrollen blockieren
    }
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar-elements')
    if(sidebar){
      sidebar.classList.remove('open'); 
      document.body.style.overflow = ''; // Scrollen wieder erlauben
    }
  }

  const scrollToSection = (event) => {
    try{
      const sectionId = event.target.getAttribute('href').replace('#', '');
      const section = document.getElementById(sectionId);
      const headerHeight = document.querySelector('.fixed-header').clientHeight;
      section?.scrollIntoView({ block: 'start' });
      window.scrollTo({ top: section.offsetTop - headerHeight - globalConstants.SCROLL_VIEW_OFFSET, behavior: 'smooth' });
      hideSidebar();
    }
    catch(error){
      console.error(error.message)
    }
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleWindowResize);

    // Cleanup-Funktion, um den Event-Listener zu entfernen
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  if(windowSize.width >= globalConstants.THRESHOLD_MAX_APP_WIDTH) {
    hideSidebar()
  }

  return (
    <header className="fixed-header">
      <div className="my-logo">DK</div>
      <nav className="navigation-bar">
        <ul data-testid="on-mobile-elements" className="sidebar-elements"> 
          <li onClick={hideSidebar}>
            <a id="close_icon" data-testid = "close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="M256-192.35 192.35-256l224-224-224-224L256-767.65l224 224 224-224L767.65-704l-224 224 224 224L704-192.35l-224-224-224 224Z"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#start" onClick={scrollToSection}>Start</a>
          </li>
          <li>
            <a href="#portfolio" onClick={scrollToSection}>Meine Projekte</a>
          </li>
          <li>
            <a href="#about" onClick={scrollToSection}>Über mich</a>
          </li>
          <li>
            <a id="contact_hover" href="#contact" onClick={scrollToSection}>Kontakt</a>
          </li>
        </ul>
        <ul data-testid = "nav-elements" className="navigation-elements"> 
          <li className='hideOnMobile'>
            <a href="#start" onClick={scrollToSection}>Start</a>
          </li>
          <li className='hideOnMobile'>
            <a href="#portfolio" onClick={scrollToSection}>Meine Projekte</a>
          </li>
          <li className='hideOnMobile'>
            <a href="#about" onClick={scrollToSection}>Über mich</a>
          </li>
          <li className='hideOnMobile'>
            <a id="contact_hover" href="#contact" onClick={scrollToSection}>Kontakt</a>
          </li>
          <li onClick={showSidebar}>
            <a className='showOnMobile'>
              <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="M111.87-228.28v-91h736.26v91H111.87Zm0-206.22v-91h736.26v91H111.87Zm0-206.22v-91h736.26v91H111.87Z"/>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;