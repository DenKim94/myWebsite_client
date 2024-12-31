import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import TabsContainer from '../components/TabsContainer';
import PhotoSwitcher from '../components/PhotoSwitcher';
import * as globalConstants from './../globalConstants.js';
import { useSharedContext } from './../context/sharedStates';
import { testInputs } from './inputs.js';

// Mock für den Context
vi.mock('./../context/sharedStates', () => ({
    useSharedContext: vi.fn(),
}));

// Mock für globale Konstanten
vi.spyOn(globalConstants, 'TAB_INFOS', 'get').mockReturnValue([
    { label: 'Berufsweg', contentId: 1, icon: 'work_icon.svg' },
    { label: 'Bildungsweg', contentId: 2, icon: 'education_icon.svg' },
    { label: 'Lebensweg', contentId: 3, icon: 'person_icon.svg' },
]);

// Mock-Komponenten
vi.mock('./EducationContent.jsx', () => {
    const EducationContent = () => <div data-testid="EducationContent">Bildungsweg</div>;
    EducationContent.displayName = 'EducationContent';
    return EducationContent;
});
vi.mock('./JobExperienceContent.jsx', () => {
    const JobExperienceContent = () => <div data-testid="JobExperienceContent">Berufsweg</div>;
    JobExperienceContent.displayName = 'JobExperienceContent';
    return JobExperienceContent;
});
vi.mock('./PersonalContent.jsx', () => {
    const PersonalContent = () => <div data-testid="PersonalContent">Lebensweg</div>;
    PersonalContent.displayName = 'PersonalContent';
    return PersonalContent;
});

// Mock für IntersectionObserver
class IntersectionObserverMock {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }
    observe = () => this.callback([{ isIntersecting: true, intersectionRatio: 1 }]);
    unobserve = () => null;
    disconnect = () => null;
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock für die Bildpfade
const mockPhotoPaths = testInputs.img_names_switcher.map((name) => `${testInputs.path_to_images}${name}`);

describe("Tests: TabsContainer Komponente", () => {
    beforeEach(() => {
        useSharedContext.mockReturnValue({
            visibleCardInfo: { isVisible: false },
        });
    });

    it("TC_01: Einzelne Tabs werden korrekt angezeigt", () => {
        render(<TabsContainer />);
        const tabs = screen.getByTestId("tabs");
        expect(tabs).toBeInTheDocument();

        testInputs.tabNames.forEach((tabName) => {
            expect(screen.getByText(tabName)).toBeInTheDocument();
            expect(screen.getByText(tabName)).toBeVisible();
        });
    });

    it("TC_02: Aktiver Tab zeigt korrekten Inhalt an", () => {
        render(<TabsContainer />);
        
        testInputs.tabNames.forEach((tabName, index) => {
            fireEvent.click(screen.getByText(tabName));
            expect(screen.getByTestId(testInputs.tabTestIds[index])).toBeInTheDocument();
            expect(screen.getByTestId(testInputs.tabTestIds[index])).toBeVisible();
        });
        
        // "Berufsweg" Tab
        fireEvent.click(screen.getByText("Berufsweg"));
        const jobListItems = screen.getAllByTestId("job-list");
        jobListItems.forEach(item => {
            expect(item).toBeInTheDocument();
            expect(item).toBeVisible();
        });
        
        const jobItems = screen.getAllByTestId("job-items");
        jobItems.forEach(item => {
            expect(item).toBeInTheDocument();
            expect(item).toBeVisible();
        });

        // "Bildungsweg" Tab
        fireEvent.click(screen.getByText("Bildungsweg"));
        const educationList = screen.getAllByTestId("education-list");
        educationList.forEach(item => {
            expect(item).toBeInTheDocument();
            expect(item).toBeVisible();
        });
        
        const educationItems = screen.getAllByTestId("education-items");
        educationItems.forEach(item => {
            expect(item).toBeInTheDocument();
            expect(item).toBeVisible();
        });

        // "Lebensweg" Tab
        fireEvent.click(screen.getByText("Lebensweg"));
        expect(screen.getByTestId("personal-description")).toBeInTheDocument();
        expect(screen.getByTestId("personal-description")).toBeVisible();

        const photoSwitcher = screen.getByTestId("switcher-container");
        expect(photoSwitcher).toBeInTheDocument();
        expect(photoSwitcher).toBeVisible();
    });

    it("TC_03: PhotoSwitcher zeigt die Fotos korrekt an", () => {
        const { container } = render(<PhotoSwitcher fullPhotoPath={mockPhotoPaths} />);
        
        const switcherContainer = screen.getByTestId('switcher-container');
        expect(switcherContainer).toBeInTheDocument();
        expect(switcherContainer).toBeVisible();
       
        let imageSlider = container.querySelector('.image-slider');
        expect(imageSlider.style.transform).toBe('translateX(-0%)');

    });


  it('TC_04: Korrekter Fotowechsel nach Klick auf den Button', () => {
    const { container } = render(<PhotoSwitcher fullPhotoPath={mockPhotoPaths} />);

    // Klicken auf den 'next' Button, um zum zweiten Bild zu wechseln
    const nextButton = screen.getByRole('button', { name: /next image/i });
    fireEvent.click(nextButton);
    
    let imageSlider = container.querySelector('.image-slider');
    expect(imageSlider.style.transform).toBe('translateX(-100%)');

    // Klicken auf 'previous' Button, um zurück zum vorherigen Bild zu wechseln
    const prevButton = screen.getByRole('button', { name: /previous image/i });
    fireEvent.click(prevButton);

    expect(imageSlider.style.transform).toBe('translateX(-0%)');
  });
});