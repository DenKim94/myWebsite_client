import {projectCards, viewportSizes, animationDurations, textContent, paths} from './testParams.js'

/** Diese Hauptfunktion führt alle E2E-Tests für den Portfolioabschnitt aus.
 *  Datum: 02.01.2025
 * */ 
export function run_tests(){
    context("Desktop View", () => {
        beforeEach(() => {
            // Simuliere Desktop-Ansicht
            cy.viewport(viewportSizes.desktop[0], viewportSizes.desktop[1]);
            // Klick auf den Link zum Abschnitt in der Navigationsleiste
            cy.get('.navigation-elements a[href="#portfolio"]').click();
            // Überprüfen, ob der entsprechende Abschnitt sichtbar ist
            cy.get("#portfolio").should('be.visible'); 
        });

        run_test_VisibleElements();

        run_test_ProjectCards()

        run_test_ProjectCardInfo_DisktopView();

        run_test_InfoCards();
    });

    context("Mobile View", () => {
        beforeEach(() => {
            // Simuliere Mobile-Ansicht
            cy.viewport(viewportSizes.mobile_standard[0], viewportSizes.mobile_standard[1]);
            // Öffne die Seitenleiste
            cy.get('[data-testid="nav-elements"] a.showOnMobile').click();
            // Klick auf den Link basierend auf der dynamischen ID
            cy.get('.sidebar-elements a[href="#portfolio"]').click();
            // Schließe die Seitenleiste
            cy.get('[data-testid="close-icon"]').click();
            // Überprüfen, ob der entsprechende Abschnitt sichtbar ist
            cy.get("#portfolio").should('be.visible');                           
        });

        run_test_VisibleElements();

        run_test_ProjectCards();

        run_test_ProjectCardInfo_MobileView();

        run_test_InfoCards();
    });
}

// Testfunktionen
function run_test_VisibleElements(){
    it("Portfolioseite: Alle Elemente des Abschnitts werden korrekt angezeigt", () => {
        // Sicherstellen, dass die Elemente sichtbar sind
        cy.get('[data-testid="portfolio-section"]').should('exist');
        cy.get('[data-testid="portfolio-title"]').should('be.visible');
        cy.get('[data-testid="portfolio-motion-div"]').should('exist');
        cy.get('[data-testid="general-project-description"]').should('be.visible')
            .and('contain.text', textContent.GENERAL_PROJECT_DESCRIPTION); // Textinhalt prüfen

        cy.get('[data-testid="project-cards-container"]').should('be.visible')   
    });
};

function run_test_ProjectCards(){
    it("Portfolioseite: Die Projekt-Karten werden korrekt angezeigt", () => {
        // Sicherstellen, dass die Karten sichtbar sind
        cy.get('[data-testid="project-cards-container"]')
            .find('[data-testid="project-card"]')
            .should('be.visible')
            .should('have.length', projectCards.PROJECT_CARDS_DATA.length);
    });
}

function run_test_ProjectCardInfo_DisktopView(){
    it("Portfolioseite: Die Projekt-Karten zeigen korrekte Informationen an", () => {
        // Sicherstellen, dass die Karten sichtbar sind
        cy.get('[data-testid="project-cards-container"]')
            .find('[data-testid="project-card"]')
            .each(($card, index) => {
                cy.wrap($card).within(() => {
                    // Überprüfen, ob das Bild korrekt angezeigt wird
                    cy.get('img').should('be.visible')
                        .and('have.attr', 'src', projectCards.PROJECT_CARDS_DATA[index].projectImage);
                    // Überprüfen, ob der Projekttitel korrekt angezeigt wird
                    cy.get('[data-testid="project-card-title"]').should('be.visible')
                        .and('contain.text', projectCards.PROJECT_CARDS_DATA[index].projectName);
                });
                cy.get(`[data-testid="info-button-${projectCards.PROJECT_CARDS_DATA[index].projectName}"]`)
                .should('be.visible') 
            });
    });
};

function run_test_ProjectCardInfo_MobileView(){
    it("Portfolioseite: Die Projekt-Karten zeigen korrekte Informationen an", () => {
        // Sicherstellen, dass die Karten sichtbar sind
        cy.get('[data-testid="project-cards-container"]')
            .find('[data-testid="project-card"]')
            .each(($card, index) => {
                cy.wrap($card).within(() => {
                    // Überprüfen, ob das Bild korrekt angezeigt wird
                    cy.get('img').should('be.visible')
                        .and('have.attr', 'src', projectCards.PROJECT_CARDS_DATA[index].projectImage);
                });
                cy.get(`[data-testid="info-button-${projectCards.PROJECT_CARDS_DATA[index].projectName}"]`)
                    .should('be.visible') 
            }); 
    });
};

function run_test_InfoCards(){
    const pause_ms = 100;

    it("Portfolioseite: Beim Klick auf den 'Mehr Infos' wird korrekter Inhalt angezeigt", () => {
        // Sicherstellen, dass die Karten sichtbar sind
        cy.get('[data-testid="project-cards-container"]')
            .find('[data-testid="project-card"]')
            .each((_, index) => {
                cy.get(`[data-testid="info-button-${projectCards.PROJECT_CARDS_DATA[index].projectName}"]`)
                    .should('be.visible').click();

                // Sicherstellen, dass die Karten-Infos sichtbar sind    
                cy.get('[data-testid="card-infos-container"]').should('be.visible');

                // Überprüfen, ob der Projekttitel korrekt angezeigt wird
                cy.get('#info-project-name').should('be.visible')
                    .and('contain.text', projectCards.PROJECT_CARDS_DATA[index].projectName);    
                cy.get('[data-testid="info-project-content"]').should('be.visible');

                // Überprüfen, ob die Beschreibung korrekt angezeigt wird
                cy.get('[data-testid="info-project-description"]').should('be.visible');

                // Überprüfen, ob das Demovideo korrekt angezeigt wird (falls vorhanden)
                if(projectCards.PROJECT_CARDS_DATA[index].projectDemo){
                    cy.get('.info-project-demo').should('be.visible');
                }
                // Überprüfen, ob der Schließen-Button korrekt angezeigt wird
                cy.get('[data-testid="close-button"]').should('be.visible').click();

                cy.wait(pause_ms);
            });
    });
};