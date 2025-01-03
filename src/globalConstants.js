// Globale Konstanten für die Webanwendung [ERFORDERLICH]
// Update: 29.12.2024

// Schwellenwerte für das responsive Design
export const THRESHOLD_MAX_APP_WIDTH = 800;     
export const THRESHOLD_MIN_APP_WIDTH = 600;     
export const SCROLL_VIEW_OFFSET = 0;            // Offset in Pixel für den Scrolleffekt

// Dauer in Millisekunden für die Tipp-Animationen der Texte
export const NUMBER_LOOP_ANIMATION = 1;       
export const TYPE_ANIMATION_DURATION = 60;       
export const TYPE_ANIMATION_DURATION_DELETE = 65;
export const HOLD_ANIMATION_DURATION = 1550;  

/* Relative Schwellenwerte (0-1) für die Anpassung des Offsets beim Scrollefffekt 
im benötigten Format von framer-motion: [start, end] */
export const SCROLL_OFFSET_DEFAULT    = ["0 1", "1 1"];
export const SCROLL_OFFSET_MIN        = ["0 1", "0.55 1"]; 
export const SCROLL_OFFSET_MEDIUM     = ["0 1", "0.8 1"];
export const SCROLL_OFFSET_MAX        = ["0 1", "1.33 1"];

// Relativer Skalierungsfaktor für den Start des Scrolleffekts
export const SCROLL_SCALING_FACTOR    = 0.6; 

// Absoluter Schwellenwert (in px) für die Breite des Browserfensters
export const SCROLL_THRESHOLD_LOW     = 1300;
export const SCROLL_THRESHOLD_HIGH    = 1700;

// Ablaufzeit zum Schließen der Popupnachricht in ms
export const POPUP_TIMEOUT_ms = 3000;


// Text in der Info-Box auf der Startseite
export const INFO_TEXT_START_SECTION = `Willkommen auf meiner Webseite!
Hier wirst du meinen persönlichen und beruflichen Werdegang kennenlernen. 
Zudem stelle ich dir meine Softwareprojekte vor, die ich bisher in meiner Freizeit erfolgreich bearbeitet habe.

Für Feedback, Rückfragen oder Anfragen zu meinem Lebenslauf freue ich mich auf deine E-Mail.`;

// Text für die allgemeine Beschreibung der Projektseite
export const GENERAL_PROJECT_DESCRIPTION = `Im Rahmen meiner fachlichen und persönlichen Weiterbildung habe ich in meiner Freizeit eine Reihe von Webentwicklungsprojekten umgesetzt, 
die mein Wissen in modernen Webtechnologien und Frameworks erweitern. 
Diese Projekte haben es mir ermöglicht, ein grundlegendes Verständnis sowohl für die client- als auch für die serverseitige Entwicklung zu erlangen und alle Projektphasen von der Konzeption über die Implementierung und Debugging bis zum Deployment eigenständig zu durchlaufen.`;


// Spezifische Angaben für die Card-Komponenten
export const CARD_ANIMATION_DURATION = 0.1; // Dauer der Animation in Sekunden
export const CARDINFO_ANIMATION_DURATION = 0.5; // Dauer der Animation in Sekunden
export const MAX_NUM_VISIBLE_CARDS = 3;

export const PROJECT_NAME_STRATEGO = 'Stratego-Web';
export const PROJECT_NAME_ECA = 'Enery Costs Analyzer'; 
export const PROJECT_NAME_WEBSITE = 'Portfolio Webseite';

// Texte für die spezifische Beschreibung der aufgelisteten Projekte
export const PROJECT_DESCRIPTION_STRATEGO = [`Beschreibung: 
    Onlinespiel (Desktop), welches ursprünglich vom Brettspiel "Stratego" abgeleitet wurde.`, 
    `Projektumfang: ca. 400 Stunden`, 
    `Kenntnisse: React; NodeJS & ExpressJS; Cypress`]; 

export const PROJECT_DESCRIPTION_ECA = [`Beschreibung: Tool zur Stromkostenanalyse`, 
    `Projektumfang: ca. 55 Stunden`, `Kenntnisse: Python; SQLite; CustomTkinter`];

export const PROJECT_DESCRIPTION_WEBSITE= [`Beschreibung: 
    Eigene Webseite zur Vorstellung meiner Projekte und meines persönlichen sowie beruflichen Werdegangs.`, 
    `Projektumfang: ca. 140 Stunden`, 
    `Kenntnisse: React; CSS; Responsive Design; NodeJS & ExpressJS; Cypress`];

// URLs zu den Webseiten der Projekte
export const PROJECT_URLS = {
    stratego: 'https://stratego-web.netlify.app',
    eca: 'https://github.com/DenKim94/PRJ_ECA',
    website: 'https://github.com/DenKim94/myWebsite_client',
}

// Pfade zu den Bildern für die Projekte (ProjectCard)
const ICON_PATH = '/icons/';
export const ICON_SIZE_PX = 90;

export const PATH_TO_PROJECT_IMAGES = {
    stratego: `${ICON_PATH}strategoLogo.png`,
    eca: `${ICON_PATH}ecaLogo.png`,
    website: `${ICON_PATH}myWebLogo.ico`,
}

// Pfade zu den Demos der Projekte
const DEMO_PATH = 'src/assets/demos/';

export const PATH_TO_PROJECT_DEMOS = {
    stratego: `${DEMO_PATH}strategoWeb_demo.mp4`,
    eca: `${DEMO_PATH}eca_demo.mp4`,
    website: null
};

// Array zum Rendern der Card-Komponenten     
export const PROJECT_CARDS_DATA = [
    {
        projectName: PROJECT_NAME_STRATEGO,
        projectDescription: PROJECT_DESCRIPTION_STRATEGO,
        projectURL: PROJECT_URLS.stratego,
        projectImage: PATH_TO_PROJECT_IMAGES.stratego,
        projectDemo: PATH_TO_PROJECT_DEMOS.stratego
    },
    {
        projectName: PROJECT_NAME_ECA,
        projectDescription: PROJECT_DESCRIPTION_ECA,
        projectURL: PROJECT_URLS.eca,
        projectImage: PATH_TO_PROJECT_IMAGES.eca,
        projectDemo: PATH_TO_PROJECT_DEMOS.eca
    },
    {
        projectName: PROJECT_NAME_WEBSITE,
        projectDescription: PROJECT_DESCRIPTION_WEBSITE,
        projectURL: PROJECT_URLS.website,
        projectImage: PATH_TO_PROJECT_IMAGES.website,
        projectDemo: PATH_TO_PROJECT_DEMOS.website
    }    
];    


// Pfade zu den Bildern für die Diashow (Photoslider)
const PATH_TO_IMAGES = 'src/assets/images/';
const IMAGE_NAMES_SLIDER = ['IMG_1912.png', 'IMG_4461.png', 
                            'IMG_2716.png', 'IMG_2610.png',
                            'IMG_4481.png'];

export const DURATION_IMAGE_ANIMATION = 3500;       // Dauer des Intervalls für einen Fotowechsel in Millisekunden 
export const PHOTO_BORDER_COLOR = 'black';
export const PHOTO_BORDER_WIDTH = '10px';
export const OBSERVER_THRESHOLD_PHOTOSLIDER = 0.1;  // Relativer Schwellenwert (Anteil der sichtbaren Seite), um die Animation zu aktivieren
export const PHOTO_SIZE_DEFAULT_PX = '360px';

export const fullPhotoPath_slider = IMAGE_NAMES_SLIDER.map((name) => `${PATH_TO_IMAGES}${name}`);


// Pfade zu den Bildern für den Foto-Switcher
export const PHOTO_SIZE_SWITCHER_PX = '280px';
export const PHOTO_BORDER_COLOR_SWITCHER = 'white';
export const PHOTO_BORDER_WIDTH_SWITCHER = '2px';

const IMAGE_NAMES_SWITCHER = ['IMG_0297.png', 'IMG_4380.png', 
                              'IMG_0724.png', 'IMG_0038.png',
                              'IMG_0812.png'];

export const fullPhotoPath_switcher = IMAGE_NAMES_SWITCHER.map((name) => `${PATH_TO_IMAGES}${name}`);


// Konstanten für TabsContainer in About-Section
export const OBSERVER_THRESHOLD_TABS = 0.3;  // Relativer Schwellenwert (Anteil der sichtbaren Seite), um die Animation zu aktivieren
const PATH_TO_ICONS = 'src/assets/icons/';

export const TAB_INFOS = [
    { label: 'Berufsweg', contentId: 1, icon: `${PATH_TO_ICONS}Work_Icon.svg`},
    { label: 'Bildungsweg', contentId: 2, icon: `${PATH_TO_ICONS}Education_Icon.svg`},
    { label: 'Lebensweg', contentId: 3, icon: `${PATH_TO_ICONS}Person_Icon.svg`},
];

export const ICON_PATHS_PHOTO_SWITCHER = { left:`${PATH_TO_ICONS}arrowLeft_Icon.svg`, 
                                           right:`${PATH_TO_ICONS}arrowRight_Icon.svg`};


// Abschnitt Berufsweg
export const INFO_TEXT_JOB_EXPERIENCE = `Nach dem Abschluss meines Studiums war ich zunächst als wissenschaftlicher Mitarbeiter in der Vorausberechnung von elektrischen Antrieben tätig.
Dabei habe ich recht schnell mein Interesse an der Softwareentwicklung und Programmierung entdeckt. 
Aus Interesse entwickelte sich ein Wunsch nach Veränderung. 
Daher entschied ich mich für einen Wechsel in die Industrie, wo ich nun seit über zwei Jahren erfolgreich als Softwareingenieur tätig bin.
Aus Wunsch wurde Leidenschaft, der ich auch in meiner Freizeit nachgehe und mich mit eigenen Softwareprojekten nach dem Motto "Build. Reflect. Improve." zum Webentwickler weiterbilde.`;


export const JOB_EXPERIENCE_CONTENT = [
    {
        jobTitle: 'Softwareingenieur - Embedded Systems',
        company: 'ITK Engineering GmbH',
        url: 'https://www.itk-engineering.de/unternehmen/',
        location: 'Braunschweig',
        timePeriod: 'Seit 01/2023',
        duties: ['Modellbasierte Unit-Entwicklung mit SCADE oder SIMULINK', 
                'Implementierung und Durchführung von Unit-Tests mit Groovy (SPOCK)',
                'Systemanalyse und Ableitung von Anforderungen',
                'Toolentwicklung zur automatisierten Messdatenanalyse mit MATLAB']
    },
    {
        jobTitle: 'Wissenschaftlicher Mitarbeiter',
        company: 'Institut für Antriebssysteme und Leistungselektronik',
        url:'https://www.ial.uni-hannover.de/de/',
        location: 'Hannover',
        timePeriod: '01/2022 - 12/2022',
        duties: ['Analyse und Vorausberechnung von Oberschwingungsverlusten in permanentmagneterregten Synchronmaschinen', 
                'Vorbereitung und Betreuung von studentischen Laborversuchen',
                'Durchführung von Hörsaalübungen']
    },
    {
        jobTitle: 'Werkstudent - Infotainmentsysteme',
        company: 'ALTEN Technology GmbH',
        url: 'https://www.alten-germany.de/ueber-uns/',
        location: 'Wolfsburg',
        timePeriod: '04/2021 - 11/2021',
        duties: ['Testautomatisierung mit Python', 
                'Durchführung von HiL-Tests']
    },
];

// Abschnitt Bildungsweg
export const EDUCATION_CONTENT = [

    {
        institution: 'Leibniz Universität Hannover',
        description: 'Masterstudium',
        timePeriod: '05/2019 - 12/2021',
        duties:['Vertiefung: Elektrische Antriebssysteme', 'Bewertung der Abschlussarbeit: 1.0', 'Abschlussnote: 1.7']
    },

    {
        institution: 'Leibniz Universität Hannover',
        description: 'Bachelorstudium',
        timePeriod: '10/2014 - 05/2019',
        duties:['Fachrichtung: Energietechnik', 'Bewertung der Abschlussarbeit: 1.0', 'Abschlussnote: 2.8']
    },

    {
        institution: 'Internatsgymnasium Bad Bederkesa',
        description: 'Abitur',
        timePeriod: '08/2007 - 07/2014',
        duties:['Abschlussnote: 3.1']
    },

    {
        institution: 'Schulzentrum Bad Bederkesa',
        description: 'Hauptschulzweig',
        timePeriod: '10/2006 - 07/2007',
        duties:['Einstieg in der 5. Klasse']
    },

    {
        institution: 'Gesamtschule Nr. 291 Tashkent',
        description: 'Grundschule (Usbekistan)',
        timePeriod: '08/2001 - 08/2006',
        duties:[ ]
    },
]

// Abschnitt Lebensweg
export const INFO_TEXT_PERSONAL = `Mein Weg in Deutschland begann im Jahr 2006. Als 11-jähriger Junge kam ich zusammen mit meiner Mutter aus Taschkent, der Hauptstadt Usbekistans, nach Deutschland. 
Unsere Reise führte uns zunächst zu einem kleinen Kurort namens Bad Bederkesa.
Der Gedanke an ein neues Leben in einem fremden Land weit weg vom Rest der Familie erfüllte mich einerseits mit Angst, andererseits aber auch mit Aufregung und Neugier. 
Ich setzte meine Schullaufbahn mit überschaubaren Deutschkenntnissen fort und begann meine akademische Reise an einer Hauptschule.
Die anfänglichen Herausforderungen waren deutlich spürbar, doch mein Ehrgeiz trieb mich voran.
Ich arbeitete fleißig daran, die Sprache zu erlernen und mich an die neue Umgebung und Kultur zu gewöhnen. 
Schließlich schloss ich im Jahr 2014 meine Schulausbildung mit dem Abitur ab.

Ohne einer klaren Vorstellung von meiner Zukunft zog ich für mein Studium nach Hannover.
Die Stadt empfing mich mit offenen Armen und ich tauchte in eine Lebensphase voller neuer Erfahrungen und Begegnungen ein. 
Der Beginn meines Ingenieursstudiums erwies sich jedoch turbulenter als erwartet.
Die Prüfungen waren herausfordernder, als ich es mir vorgestellt hatte, was zu mehr Tiefen als Höhen führte. Aber ich ließ mich nicht entmutigen.
Diese schwierige Zeit zwang mich, mich selbst zu reflektieren, Entscheidungen zu treffen und meine Komfortzone zu verlassen. 
Ich nutzte diese Phase, um mich persönlich und fachlich weiterzuentwickeln. 
Letztendlich schloss ich das Studium erfolgreich mit dem Masterabschluss ab.

Während meines Studiums hatte ich die Möglichkeit, in verschiedenen Bereichen zu arbeiten und wertvolle Erfahrungen zu sammeln.
Ich begann als Kellner und Aufbauhelfer bei Großveranstaltungen, arbeitete als Promoter für den Naturschutzbund, war Fließbandarbeiter bei einem renommierten Automobilhersteller, 
unterstütze als studentische Hilfskraft in der Forschung oder war als Werkstudent im Bereich der Testautomatisierung tätig.

Rückblickend bin ich sehr dankbar für diese Erfahrungen, die mich geprägt und meinen Blick auf die Welt erweitert haben.
Heute bin ich stolz darauf, mich Ingenieur nennen zu dürfen, der danach strebt den Alltag der Menschen mit zuverlässiger und intuitiver Software zu erleichtern. 
Jeder Schritt, den ich gegangen bin, hat mich geformt und mich auf dieser spannenden Reise zu dem fleißigen, organisierten und zuverlässigen Menschen gemacht, der ich heute bin.
Ich blicke optimistisch in die Zukunft, bereit, neue Herausforderungen anzunehmen und daran zu wachsen.`;


// Abschnitt Kontakt
export const SERVER_TIMEOUT_THRESHOLD_ms = 60000; // Ablaufzeit für die Serverantwort in ms

export const SOCIAL_MEDIA_ITEMS = [
    {
        url: "https://github.com/DenKim94",
        logoPath: `${PATH_TO_ICONS}GitHub_Icon.svg`,
    },
    {
        url: "http://linkedin.com/in/denis-kim-1a3752111", 
        logoPath: `${PATH_TO_ICONS}LinkedIn_Icon.svg`,
    },
];

export const SOCIAL_MEDIA_LOGO_PATHS = [
    `${PATH_TO_ICONS}GitHub_Icon.svg`,
    `${PATH_TO_ICONS}LinkedIn_Icon.svg`,
];

export const INFO_TEXT_CONTACT = `Don't be so shy! - Falls Du weitere Fragen hast oder eine Zusammenarbeit mit mir vorstellen kannst, schreibe mir gerne eine Nachricht.
Ich freue mich auf den Austausch mit Dir und vielen Dank für deinen Besuch!`;
