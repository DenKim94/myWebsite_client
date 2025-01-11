import {contactFormInfos, viewportSizes, textContent, genericSettings} from './testParams.js'


/** Diese Hauptfunktion führt alle E2E-Tests für den "Kontakt" Abschnitt aus.
 *  Datum: 11.01.2025
 * */ 
export function run_tests(){
    context("Desktop View", () => {
        beforeEach(() => {
            // Simuliere Desktop-Ansicht
            cy.viewport(viewportSizes.laptop_14[0], viewportSizes.laptop_14[1]);
            // Klick auf den Link zum Abschnitt in der Navigationsleiste
            cy.get('.navigation-elements a[href="#contact"]').click();
            // Überprüfen, ob der entsprechende Abschnitt sichtbar ist
            cy.get("#contact").should('be.visible'); 
        });

        run_test_VisibleElements();
        run_test_SubmitWithoutCaptcha();
    });

    context("Mobile View", () => {
        beforeEach(() => {
            // Simuliere Mobile-Ansicht
            cy.viewport(viewportSizes.mobile_standard[0], viewportSizes.mobile_standard[1]);
            // Öffne die Seitenleiste
            cy.get('[data-testid="nav-elements"] a.showOnMobile').click();
            // Klick auf den Link basierend auf der dynamischen ID
            cy.get('.sidebar-elements a[href="#contact"]').click();
            // Schließe die Seitenleiste
            cy.get('[data-testid="close-icon"]').click();
            // Überprüfen, ob der entsprechende Abschnitt sichtbar ist
            cy.get("#contact").should('be.visible');                           
        });

        run_test_VisibleElements();
        run_test_SubmitWithoutCaptcha();
    });
}

// Testfunktionen
function run_test_VisibleElements(){
    it("Kontakt-Seite: Alle Elemente des Abschnitts werden korrekt angezeigt", () => {
        cy.get("#contact-title").should('exist')
            .and('be.visible')
            .and('contain.text', "Kontakt");

        cy.get("#contact-text").should('exist')
        .and('be.visible')
        .and('contain.text', textContent.INFO_TEXT_CONTACT);

        // Prüfen, ob das Formular vorhanden ist
        cy.get('[data-testid="contact-form"]').should('exist').and('be.visible');

        // Prüfen, ob der Name-Input korrekt angezeigt wird
        cy.get('[data-testid="name-input"]')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'placeholder', '<Dein Name>');

        // Prüfen, ob der E-Mail-Input korrekt angezeigt wird
        cy.get('[data-testid="email-input"]')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'placeholder', '<Deine E-Mail>');

        // Prüfen, ob das Textfeld für die Nachricht korrekt angezeigt wird
        cy.get('[data-testid="message-input"]')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'placeholder', '<Deine Nachricht an mich>');

        // Prüfen, ob die Datenschutz-Checkbox korrekt angezeigt wird
        cy.get('[data-testid="data-privacy-checkbox"]').should('exist').and('be.visible');

        // Prüfen, ob der Datenschutzhinweis-Text korrekt angezeigt wird
        cy.contains('Ich stimme den Datenschutzbestimmungen zu.')
            .should('exist')
            .and('be.visible');
        
        cy.get('a[href="/datenschutz.html"]').should('have.attr', 'target', '_blank');

        // Prüfen, ob der Senden-Button korrekt angezeigt wird
        cy.get('#send-button')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'value', 'Senden');

        // Prüfen, ob Impressum und die Logos im Footer sichtbar sind
        cy.get('footer').should('be.visible');
        cy.get('#impressum').should('be.visible').and('contain.text', 'Impressum')
            .should('have.attr', 'target', '_blank');
        cy.get('.social-media-icons').should('be.visible');

        // Prüfen, ob das ReCAPTCHA korrekt angezeigt wird
        cy.get('[data-testid="recaptcha"]').should('exist').and('be.visible');
    });
};

function run_test_SubmitWithoutCaptcha(){

    it("Kontakt-Seite: Formular wird nicht gesendet und Popup-Nachricht wird angezeigt, wenn das Captcha nicht gelöst wird", () => {

        // Formular ausfüllen
        cy.get('[data-testid="name-input"]').type(contactFormInfos.testerName);
        cy.get('[data-testid="email-input"]').type(contactFormInfos.testerInvalidEmail);
        cy.get('[data-testid="message-input"]').type(contactFormInfos.testerMessage);

        // Datenschutz-Checkbox aktivieren
        cy.get('[data-testid="data-privacy-checkbox"]').check();

        // Formular absenden, ohne das Captcha zu lösen
        cy.get('#send-button').click();

        // Popup-Nachricht prüfen
        cy.get('[data-testid="pop-up"]')
            .should('be.visible')
            .and('contain.text', 'Bitte lösen Sie das Captcha.');
    });
};
