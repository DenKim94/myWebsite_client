import { describe, expect, it, beforeEach } from 'vitest';
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

    it('Req_001: Alle Elemente in der Navigationsleiste werden angezeigt', async () => {
        const {getByText} = render(<Header />);
        const header = await screen.findByRole('banner');
        expect(header).toBeInTheDocument();
        const logoText = getByText(testInputs.logoValue);
        expect(logoText).toBeVisible();

        const navElements = screen.getAllByRole('link').filter(link => link.closest('li')?.classList.contains('hideOnMobile'));
        navElements.forEach((element) => {
            expect(element).toBeInTheDocument(); 
            expect(element).toBeVisible(); 
        })

        const navElementTexts = navElements.map(value => value.textContent);
        expect(navElementTexts).toEqual(testInputs.navBarValues);
    });

    it('Req_001: Navigationsleiste wird beim Scrollen immer mitgezogen', () => {
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
})