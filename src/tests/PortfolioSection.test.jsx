import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioSection from '../components/PortfolioSection';  
import ProjectCard from '../components/ProjectCard'; 
import ProjectCardsContainer from '../components/ProjectCardsContainer';  
import { SharedStateProvider } from '../context/SharedStateContext';
import * as globalConstants from './../globalConstants.js'
import { testInputs } from './inputs.js';


describe("Tests: PortfolioSection Komponente", () => {

    // Hilfsfunktion, um die Komponente mit dem richtigen Provider zu rendern
    const renderWithContext = (value) => {
        return render(
        <SharedStateProvider initialValue={value}>
            <PortfolioSection />
            <ProjectCardsContainer />
        </SharedStateProvider>
        );
    };

    it("TC_01: PortfolioSection wird korrekt angezeigt", () => {
        // Definiere den Zustand des Contexts für den Test
        const initialState = { cardIndex: undefined, isVisible: false };
        renderWithContext(initialState);

        // Prüfen ob PortfolioSection korrekt gerendert wird
        const portfolioSection = screen.getByTestId("portfolio-section");
        expect(portfolioSection).toBeInTheDocument();
        expect(portfolioSection).toBeVisible();

        // Prüfen ob der Titel korrekt gerendert und benannt wird
        const portfolioTitle = screen.getByTestId("portfolio-title");
        expect(portfolioTitle).toBeInTheDocument();
        expect(portfolioTitle).toBeVisible();
        expect(portfolioTitle).toHaveTextContent(testInputs.titlePortfolioSection);
    });

    it("TC_02: ProjectCardsContainer wird korrekt angezeigt", () => {
        // Definiere den Zustand des Contexts für den Test
        const initialState = { cardIndex: undefined, isVisible: false };
        renderWithContext(initialState);

        screen.debug();

        // TBD: Scroll-Animation in PortfolioSection muss noch gemockt werden, um die Karten zu rendern

        // const projectCardsContainer = screen.getAllByTestId("project-cards-container");
        // projectCardsContainer.forEach(container => {
        //     expect(container).toBeInTheDocument();
        // });

        // const projectCards = screen.getAllByTestId("project-card");

        // projectCards.forEach (card => {
        //     expect(card).toBeInTheDocument();
        //     expect(card).toBeVisible();
        // });
    });

});