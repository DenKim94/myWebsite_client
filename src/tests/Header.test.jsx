import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';  
import { testInputs } from './inputs.js';
import * as testFunctions from './helperFunctions.js';

describe('Test: Header Komponente', () => {
    // Bildschirmbreite vordefinieren
    beforeEach(() => {
        window.innerWidth = testInputs.defaultWindowWidth;
        // Resize-Event auslösen, um die Änderung zu simulieren
        window.dispatchEvent(new Event('resize'));
      });
      

    it('TC_01: Alle Elemente in der Navigationsleiste werden angezeigt', async () => {

        const {getByText} = render(<Header />);
        const header = await screen.findByRole('banner');
        expect(header).toBeInTheDocument();
        const logoText = getByText(testInputs.logoValue);
        // Prüfen ob Logo vorhanden ist
        expect(logoText).toBeVisible();

        const navElements = screen.getAllByRole('link').filter(link => link.closest('li')?.classList.contains('hideOnMobile'));
        // Prüfen ob alle Elemente definierten in der Navigationsleiste vorhanden sind
        navElements.forEach((element) => {
            expect(element).toBeInTheDocument(); 
            expect(element).toBeVisible(); 
        })

        const navElementTexts = navElements.map(value => value.textContent);
        expect(navElementTexts).toEqual(testInputs.navBarValues);
    });

    it('TC_02: Navigationsleiste wird beim Scrollen immer mitgezogen', () => {
        render(<Header />);
        testFunctions.triggerScrollEventY(testInputs.scrollY);

        const navElements = screen.getAllByRole('link').filter(link => link.closest('li')?.classList.contains('hideOnMobile'));
        navElements.forEach((element) => {
            expect(element).toBeInTheDocument(); 
            expect(element).toBeVisible(); 
        })

        const navElementTexts = navElements.map(value => value.textContent);
        expect(navElementTexts).toEqual(testInputs.navBarValues);
    })

    it('TC_03: Navigation der Links führt zum entsprechenden Abschnitt', () => {
        // Setup DOM with both sections
        document.body.innerHTML = `
          <header class="fixed-header" style="height: 60px"></header>
          <section id="portfolio"></section>
          <section id="contact"></section>
        `;
      
        // Mock scroll functions
        const mockScrollTo = vi.fn();
        const mockScrollIntoView = vi.fn();
        window.scrollTo = mockScrollTo;
        Element.prototype.scrollIntoView = mockScrollIntoView;
      
        render(<Header />);
      
        // Test 'portfolio' link
        const portfolioLink = screen.getAllByRole('link')
          .find(link => 
            link.textContent === 'Meine Projekte' && 
            link.closest('li')?.classList.contains('hideOnMobile')
          );
        portfolioLink.click();
        expect(mockScrollIntoView).toHaveBeenCalledWith({ block: 'start' });
        expect(mockScrollTo).toHaveBeenCalledWith({ 
          top: expect.any(Number),
          behavior: 'smooth'
        });
        const portfolioSection = document.getElementById('portfolio');
        expect(portfolioSection).toBeInTheDocument();
        expect(portfolioSection).toBeVisible();

        // Test 'contact' link
        const contactLink = screen.getAllByRole('link')
          .find(link => 
            link.textContent === 'Kontakt' && 
            link.closest('li')?.classList.contains('hideOnMobile')
          );
        contactLink.click();
        expect(mockScrollIntoView).toHaveBeenCalledWith({ block: 'start' });
        expect(mockScrollTo).toHaveBeenCalledWith({ 
          top: expect.any(Number),
          behavior: 'smooth'
        });
        const contactSection = document.getElementById('contact');
        expect(contactSection).toBeInTheDocument();
        expect(contactSection).toBeVisible();
      });

})