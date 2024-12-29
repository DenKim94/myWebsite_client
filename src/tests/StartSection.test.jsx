import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StartSection from '../components/StartSection';  
import PhotoSlider from '../components/PhotoSlider'; 
import InfoTextContainer from '../components/InfoTextContainer';  
import { useTypewriter } from "react-simple-typewriter"; 
import * as globalConstants from './../globalConstants.js'


// IntersectionObserver mocken
globalThis.IntersectionObserver = class {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {
        // Simuliert, dass das beobachtete Element im sichtbaren Bereich ist
        this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
};

// Mock für die Tippanimation
vi.mock("react-simple-typewriter", () => ({
    useTypewriter: vi.fn().mockReturnValue(["Webentwickler.", "Denis."]), // Simuliert ein Array,
    // eslint-disable-next-line react/prop-types
    Cursor: ({ cursorStyle }) => <span>{cursorStyle}</span>,
  }));
  
describe("Test: StartSection Komponente", () => {

    it("TC_01: StartSection wird korrekt angezeigt", async () => {
       
        const { getByTestId } = render(<StartSection />);
        const startSection = getByTestId("start-section");
        expect(startSection).toBeInTheDocument();
        expect(startSection).toBeVisible();
    
    });

    it("TC_02: Begrüßungstext wird korrekt angezeigt", async () => {
        
        const { getByTestId } = render(<InfoTextContainer />);
        const greetingText = getByTestId("animated-text");
        expect(greetingText).toBeInTheDocument();
        expect(greetingText).toBeVisible();
    });

    it("TC_03: Tippanimation wird korrekt ausgeführt", async () => {
        // Mock-Werte für die Tippanimation
        const mockText = "Denis.";
        useTypewriter.mockReturnValue([mockText]); // Simuliert die Rückgabe der animierten Wörter

        render(<InfoTextContainer />);
        // Warten, bis der Text tatsächlich gerendert wird
        await waitFor(() => {
            const animatedText = screen.getByTestId("animated-text");
            expect(animatedText).toBeInTheDocument();
            expect(animatedText).toHaveTextContent(`Hallo, ich bin ${mockText}`);
        });
    });

    it("TC_04: PhotoSlider wird korrekt angezeigt", async () => {
        
        const { getByTestId } = render(<PhotoSlider fullPhotoPath = {globalConstants.fullPhotoPath_slider} />);
        const photoContainer = getByTestId("image-container");
        expect(photoContainer).toBeInTheDocument();
        expect(photoContainer).toBeVisible();
    });

    it("TC_05: Die Fotos werden im PhotoSlider korrekt angezeigt", async () => {
        // Beispiel-Foto-Pfade
        const photoPaths = globalConstants.fullPhotoPath_slider;

        render(<PhotoSlider fullPhotoPath={photoPaths} />);
        
        // Testen, ob die richtige Anzahl an Slide-Divs vorhanden ist
        const slides = screen.getAllByTestId(/^photo-slide-/);
        expect(slides.length).toBe(photoPaths.length); // Die Anzahl der Slides sollte mit der Anzahl der Pfade übereinstimmen

        // Testen, ob das erste Bild den richtigen Pfad anzeigt (über background-image)
        const firstSlide = slides[0];
        expect(firstSlide).toHaveStyle(`background-image: url(${photoPaths[0]})`);

        // Testen, ob das zweite Bild den richtigen Pfad anzeigt (über background-image)
        const secondSlide = slides[1];
        expect(secondSlide).toHaveStyle(`background-image: url(${photoPaths[1]})`);

        // Testen, ob das letzte Bild den richtigen Pfad anzeigt (über background-image)
        const lastSlide = slides[slides.length - 1];
        expect(lastSlide).toHaveStyle(`background-image: url(${photoPaths[photoPaths.length - 1]})`);
    });

});