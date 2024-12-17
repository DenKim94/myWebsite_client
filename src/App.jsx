import Header from './components/Header';
import StartSection from './components/StartSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { SharedStateProvider } from './context/SharedStateContext';
import './styles/App.css'

/**
 * The main app component. This component renders all other
 * components together.
 * Version: 1.0
 * 
 * The structure is as follows: 
 * - Header: navigation
 * - main: 
 *   - StartSection: start page with photo slider and text
 *   - PortfolioSection: page with portfolio projects
 *   - AboutSection: page about the author
 *   - ContactSection: page with contact information
 * - Footer: footer with copyright information
 */
function App() {

  return (
    <div className='app-container'>
      <Header />
      <main className='main-content'>
        <SharedStateProvider initialValue={{ cardIndex: undefined, isVisible: false }}>
          <StartSection /> 
          <PortfolioSection />
          <AboutSection />
          <ContactSection />
        </SharedStateProvider>
      </main>
      <Footer />
    </div>
  )
}

export default App
