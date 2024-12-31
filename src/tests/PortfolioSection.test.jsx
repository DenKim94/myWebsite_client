import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioSection from '../components/PortfolioSection';  
import CardInfos from '../components/CardInfos'; 
import ProjectCardsContainer from '../components/ProjectCardsContainer';  
import { SharedStateProvider } from '../context/SharedStateContext';
import * as globalConstants from './../globalConstants.js'
import { testInputs } from './inputs.js';

vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual,
        motion: {
          ...actual.motion,
          div: vi.fn(({ children, ...props }) => (
            <div {...props}>{children}</div>
          )),
        },
      };
  });

  // Mock für PROJECT_CARDS_DATA  
  beforeEach(() => {
    vi.spyOn(globalConstants, 'PROJECT_CARDS_DATA', 'get').mockReturnValue(globalConstants.PROJECT_CARDS_DATA);
  });
  
 
describe("Tests: PortfolioSection Komponente", () => {

    // Hilfsfunktion, um die Komponente mit dem richtigen Provider zu rendern
    const renderWithContext = (value) => {
        return render(
        <SharedStateProvider initialValue={value}>
            <PortfolioSection />
            <ProjectCardsContainer />
            <CardInfos />
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

    it("TC_02: ProjectCardsContainer wird korrekt angezeigt", async () => {
        // Definiere den Zustand des Contexts für den Test
        const initialState = { cardIndex: undefined, isVisible: false };
        renderWithContext(initialState);

        const projectCardsContainer = screen.getByTestId("portfolio-motion-div");
        expect(projectCardsContainer).toBeInTheDocument();
        expect(projectCardsContainer).toBeVisible();

        // Warten, bis die Karten sichtbar sind
        const projectCards = await waitFor(() =>
            screen.getAllByTestId("project-card")
        );
 
        projectCards.forEach (card => {
            expect(card).toBeInTheDocument();
            expect(card).toBeVisible();
        });
    });

    it("TC_03: CardInfos Komponente wird angezeigt, wenn isVisible 'true' ist", async() => {
        const initialState = { cardIndex: 0, isVisible: true };
        renderWithContext(initialState);

        const cardInfos = await waitFor(() =>
            screen.getAllByTestId("card-infos-container")
        );

        cardInfos.forEach (card => {
            expect(card).toBeInTheDocument();
            expect(card).toBeVisible();
        });

      });
});