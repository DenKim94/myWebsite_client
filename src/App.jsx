import Header from './components/Header';
import StartSection from './components/StartSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { SharedStateProvider } from './context/SharedStateContext';
import './styles/App.css'

/**
 * @component
 * 
 * @returns {JSX.Element} Die gerenderte App-Komponente.
 * 
 * @description
 * Version: 1.0:
 * Die Haupt-App-Komponente. Diese Komponente rendert alle anderen
 * Komponenten zusammen.
 * 
 * Die App-Komponente verwendet den `SharedStateProvider`, um einen gemeinsamen Zustand für die untergeordneten Komponenten bereitzustellen.
 * Der `SharedStateProvider` wird mit einem initialen Wert `{ cardIndex: undefined, isVisible: false }` bedatet.
 * 
 * @see {@link Header} für die Header-Komponente.
 * @see {@link StartSection} für die StartSection-Komponente.
 * @see {@link PortfolioSection} für die PortfolioSection-Komponente.
 * @see {@link AboutSection} für die AboutSection-Komponente.
 * @see {@link ContactSection} für die ContactSection-Komponente.
 * @see {@link Footer} für die Footer-Komponente.
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
