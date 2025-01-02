import {genericSettings, viewportSizes, animationDurations, textContent, paths} from './testParams.js'


export function run_tests(){
    context("Desktop View", () => {
        beforeEach(() => {
            // Simuliere Desktop-Ansicht
            cy.viewport(viewportSizes.desktop[0], viewportSizes.desktop[1]);
        });
        
            it("Startseite: Alle Elemente im Header werden korrekt angezeigt", () => {
                // Überprüfe, ob alle Elemente in der Navigationsleiste sichtbar sind
                cy.get('.my-logo').should('be.visible');

                cy.get('[data-testid="nav-elements"]').within(() => {
                    cy.contains('Start').should('be.visible');
                    cy.contains('Meine Projekte').should('be.visible');
                    cy.contains('Über mich').should('be.visible');
                    cy.contains('Kontakt').should('be.visible');
                });
        
                // Überprüfe, ob Mobile-spezifische Elemente ausgeblendet sind
                cy.get('[data-testid="on-mobile-elements"]').should('not.be.visible');
            });
            
            run_test_InfoText();

            run_test_Typewriter();

            run_test_PhotoSlider();
        });

    context("Mobile View", () => {
        beforeEach(() => {
            // Simuliere Mobile-Ansicht
            cy.viewport(viewportSizes.mobile_standard[0], viewportSizes.mobile_standard[1]);
        });

        it("Startseite: Alle Elemente in der Seitenleiste werden korrekt angezeigt", () => {
            // Überprüfe, ob das Logo sichtbar ist
            cy.get('.my-logo').should('be.visible');

            // Öffne die Sidebar
            cy.get('[data-testid="nav-elements"] a.showOnMobile').click();

            // Überprüfe, ob Mobile-spezifische Elemente sichtbar sind
            cy.get('[data-testid="on-mobile-elements"]').within(() => {
                cy.get('[data-testid="close-icon"]').should('be.visible');
                cy.contains('Start').should('be.visible');
                cy.contains('Meine Projekte').should('be.visible');
                cy.contains('Über mich').should('be.visible');
                cy.contains('Kontakt').should('be.visible');
            });

            // Überprüfe, ob Desktop-spezifische Elemente ausgeblendet sind
            cy.get('[data-testid="nav-elements"] .hideOnMobile').should('not.be.visible');

            // Schließe die Seitenleiste
            cy.get('[data-testid="close-icon"]').click();

            // Überprüfe, ob die Seitenleiste geschlossen ist
            cy.get('[data-testid="on-mobile-elements"]').should('not.be.visible');
        });

        run_test_InfoText();

        run_test_Typewriter();

        run_test_PhotoSlider();
    });
  }


function run_test_Typewriter(){
    it("Startseite: Begrüßungstext wird korrekt angezeigt", () => {
        const animated_words = ["Denis.", "Webentwickler.", "Denis."]; // Die erwarteten Wörter

        animated_words.forEach((word) => {
          // Überprüfe das Schreiben des Wortes
          cy.get('[data-testid="animated-text"] span')
            .should(($el) => {
                const actualText = $el.text().replace('|', ''); // Entferne den Cursor aus dem Vergleich
                expect(actualText).to.eq(word);
            });
    
          // Wartezeit nach dem Schreiben des Wortes
          cy.wait(animationDurations.TYPE_ANIMATION_DURATION + animationDurations.HOLD_ANIMATION_DURATION);
    
        });  
    }); 
}

function run_test_InfoText(){
    it("Startseite: Infotext wird nach Ablauf der Animation korrekt angezeigt", () => {
        const expectedText = textContent.INFO_TEXT_START_SECTION; // Erwarteter Text
    
        // Warten auf das Ende der Animation
        cy.get('.description-text')
            .should('have.css', 'opacity', '0') // Text ist zu Beginn nicht sichtbar
            .then(() => {
                // Wartezeit für die Animation (Dauer + Verzögerung)
                const animationDuration = 1300; // Dauer der Animation in ms
                const animationDelay = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animationDelay')) * 1000 || 0;
        
                cy.wait(animationDuration + animationDelay);
            });
    
        // Prüfen, ob der Text nach Ablauf der Animation korrekt angezeigt wird
        cy.get('.description-text')
            .should('have.css', 'opacity', '1') // Animation endet mit Opazität 1
            .and('be.visible') // Sicherstellen, dass das Element sichtbar ist
            .and('contain.text', expectedText); // Textinhalt prüfen
    }); 
}

function run_test_PhotoSlider(){
    const photoPaths = paths.sliderPhotoPath; // Pfade zu den Bildern
    const animationDuration = animationDurations.DURATION_IMAGE_ANIMATION; // Dauer des Bildwechsels

    it("PhotoSlider: Fotos in der Diashow werden korrekt gerendert", () => {
      // Prüfen, ob alle Bilder in der Diashow gerendert wurden
      photoPaths.forEach((path, index) => {
        cy.get(`[data-testid="photo-slide-${index}"]`)
          .should('have.css', 'background-image')
          .and('include', path);
      });
    });

    it("PhotoSlider: Diashow läuft korrekt ab", () => {
        cy.visit(genericSettings.clientURL);

        // Definiere eine Variable, um den Wert zu speichern
        let transformValue_before;
        let transformValue_after;

        cy.get('[data-testid="photo-slider"]').invoke('css', 'transform').then((transform) => {
            const matrixValues_before = transform.match(/matrix\((.*)\)/)[1].split(',').map(parseFloat);
            transformValue_before = matrixValues_before[4]; // 'e' ist der fünfte Wert in der Matrix

            cy.log('Transform before-value:', transformValue_before);
        });

        cy.wait(animationDuration * 2);

        cy.get('[data-testid="photo-slider"]').invoke('css', 'transform').then((transform) => {
            const matrixValues_after = transform.match(/matrix\((.*)\)/)[1].split(',').map(parseFloat);
            transformValue_after = matrixValues_after[4]; // 'e' ist der fünfte Wert in der Matrix

            cy.log('Transform after-value:', transformValue_after);
            expect(transformValue_before).to.be.greaterThan(transformValue_after);
        });
    });

    // it("PhotoSlider: Diashow wird außerhalb des sichtbaren Bereichs nicht ausgeführt", () => {
    //     // Zum Abschnitt außerhalb des sichtbaren Bereichs wechseln
    //     cy.get('a[href="#about"]').click();
    //     cy.get('#about').should('be.visible');


    // });
}
