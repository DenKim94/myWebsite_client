import { useState, useEffect, useRef } from 'react';
import './../styles/TabsContainer.css';
import { useSharedContext } from './../context/sharedStates';
import EducationContent from './EducationContent.jsx'
import JobExperienceContent from './JobExperienceContent.jsx'
import PersonalContent from './PersonalContent.jsx'
import * as globalConstants from './../globalConstants.js';

/**
 * TabsContainer-Komponente
 * 
 * Diese Komponente rendert eine Container für Tabs, die verschiedene Inhalte anzeigen.
 * Die Tabs und deren Inhalte werden dynamisch basierend auf den globalConstants.TAB_INFOS konfiguriert.
 * 
 * @component
 * 
 * @example
 * return (
 *   <TabsContainer />
 * )
 * 
 * @returns {JSX.Element} Ein Container mit Tabs und deren zugehörigen Inhalten.
 * 
 * @description
 * - Verwendet useState, um den aktiven Tab und die Sichtbarkeit des Containers zu verwalten.
 * - Verwendet useRef, um auf das DOM-Element des Containers zuzugreifen.
 * - Verwendet useEffect, um einen IntersectionObserver zu initialisieren, der die Sichtbarkeit des Containers überwacht.
 * - Die aktive Komponente wird basierend auf der aktiven Tab-ID aus einer Map von Komponenten bestimmt.
 * 
 * @see {@link globalConstants.TAB_INFOS} für die Konfiguration der Tabs.
 * @see {@link useSharedContext} für den Kontext, der die Sichtbarkeit der Karte verwaltet.
 */

const TabsContainer = () => {
    const [activeTab, setActiveTab] = useState(globalConstants.TAB_INFOS[0].label); // (Default) erster Tab ist aktiv
    const [isVisible, setIsVisible] = useState(false);
    const sliderRef = useRef(null);
    const { visibleCardInfo } = useSharedContext();

    let activeTabId = (globalConstants.TAB_INFOS.find((tab) => tab.label === activeTab)?.contentId) || undefined;

    const COMPONENT_MAP = {
        tab_1: JobExperienceContent,
        tab_2: EducationContent,
        tab_3: PersonalContent,
    };

    useEffect(() => {
        if (visibleCardInfo.isVisible === false) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= globalConstants.OBSERVER_THRESHOLD_TABS) {
                        setIsVisible(true);  // Animation starten

                    } else {
                        setIsVisible(false); // Animation zurücksetzen
                    }
                },
                { threshold: globalConstants.OBSERVER_THRESHOLD_TABS } 
            );
            const sliderElement = sliderRef.current;

            if (sliderElement) {
                observer.observe(sliderElement);
            }

            return () => {
                if (sliderElement) {
                    observer.unobserve(sliderElement);
                }
            };
        }
        else {
            setIsVisible(false); // Animation zurücksetzen
            
        }
    }, [visibleCardInfo.isVisible]);

    if (!activeTabId) {
        return null;
    }

    // Die aktive Komponente basierend auf der aktiven Tab-ID bestimmen (Null indiziert)
    const ActiveComponent = Object.values(COMPONENT_MAP)[activeTabId-1];

    return (
        <div
            ref={sliderRef}
            className={`tabs-container ${isVisible ? 'animated' : ''}`}
            style={visibleCardInfo.isVisible ? {zIndex: -10} : {zIndex: 0}}
        >
            <div className="tabs" data-testid="tabs">
                {globalConstants.TAB_INFOS.map((tab) => (
                    <button
                        key={tab.label}
                        id="about-tab"
                        className={`tab ${activeTab === tab.label ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        <img
                            src={tab.icon}
                            alt={`${tab.label} Icon`}
                            className="tab-icon"
                        />
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className="tab-content" data-testid="active-tab-content">
                <ActiveComponent />
            </div>
        </div>
    );
};

export default TabsContainer;