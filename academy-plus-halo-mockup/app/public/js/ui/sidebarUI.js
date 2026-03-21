//? Handles interaction with the interface from the sidebar, (which is a partial)
//* Imports
    import { ICONS } from "../utils/icons.js";

//* Global variables
    const HTMLELEMENTS = { //* HTML elements used in this page
        //* Permanent elements
        pageHome: document.querySelector("#page-home"),
        svgHat: document.querySelector("#svg-hat"),

        pagePractice: document.querySelector("#page-practice"),
        svgDumbbell: document.querySelector("#svg-dumbbell"),

        pageStats: document.querySelector("#page-stats"),
        svgGraph: document.querySelector("#svg-graph"),

        pageChat: document.querySelector("#page-chat"),
        svgChatbot: document.querySelector("#svg-chatbot"),

        pageAnalysis: document.querySelector("#page-analysis"),
        svgGlass: document.querySelector("#svg-glass"),

        pageEditor: document.querySelector("#page-editor"),
        svgCircuit: document.querySelector("#svg-circuit"),

        pageScopelab: document.querySelector("#page-scopelab"),
        svgScopelab: document.querySelector("#svg-scopelab"),

        pageProject: document.querySelector("#page-project"),
        svgRepository: document.querySelector("#svg-repository"),

        pageContacts: document.querySelector("#page-contacts"),
        svgContacts: document.querySelector("#svg-contacts"),
    };

    const PAGES = { //* Pages that are loaded in the sidebar
        home: HTMLELEMENTS.pageHome,
        practice: HTMLELEMENTS.pagePractice,
        chat: HTMLELEMENTS.pageChat,
        stats: HTMLELEMENTS.pageStats,
        analysis: HTMLELEMENTS.pageAnalysis,
        editor: HTMLELEMENTS.pageEditor,
        scopelab: HTMLELEMENTS.pageScopelab,
        project: HTMLELEMENTS.pageProject,
        contacts: HTMLELEMENTS.pageContacts,
    };
//* Main function that registers all the event listeners for the page, (called by a file in js/pages/ when page is load)
    export async function registerSidebarUI() {
        loadIcons();
    }

//* Functions
    function loadIcons() {
        //* Function to get the color of the text in the sidebar
        function getColor(element) {
            if (element.classList.contains("active")) {
                element = element.querySelector(".active");
            }
            let textElement = element.querySelector(".text");

            return getComputedStyle(textElement).color;
        }
        //* Getting the color of the text in the sidebar
        const svgHatColor = getColor(HTMLELEMENTS.pageHome);
        const svgDumbbellColor = getColor(HTMLELEMENTS.pagePractice);
        const svgGraphColor = getColor(HTMLELEMENTS.pageStats);
        const svgChatbotColor = getColor(HTMLELEMENTS.pageChat);
        const svgGlassColor = getColor(HTMLELEMENTS.pageAnalysis);
        const svgCircuitColor = getColor(HTMLELEMENTS.pageEditor);
        const svgScopelabColor = getColor(HTMLELEMENTS.pageScopelab);
        const svgRepositoryColor = getColor(HTMLELEMENTS.pageProject);
        const svgContactsColor = getColor(HTMLELEMENTS.pageContacts);
        //* Updating the icons in the sidebar
        HTMLELEMENTS.svgHat.innerHTML = ICONS.hat(svgHatColor, 24, 0);
        HTMLELEMENTS.svgDumbbell.innerHTML = ICONS.dumbbell(svgDumbbellColor, 24, 0);
        HTMLELEMENTS.svgGraph.innerHTML = ICONS.graph(svgGraphColor, 24, 0);
        HTMLELEMENTS.svgChatbot.innerHTML = ICONS.chatbot(svgChatbotColor, 24, 0);
        HTMLELEMENTS.svgGlass.innerHTML = ICONS.glass(svgGlassColor, 24, 0);
        HTMLELEMENTS.svgCircuit.innerHTML = ICONS.circuit(svgCircuitColor, 24, 0);
        HTMLELEMENTS.svgScopelab.innerHTML = ICONS.scopelab(svgScopelabColor, 24, 3);
        HTMLELEMENTS.svgRepository.innerHTML = ICONS.repository(svgRepositoryColor, 24, 0);
        HTMLELEMENTS.svgContacts.innerHTML = ICONS.contacts(svgContactsColor, 24, 2);
    }

    export function updateSidebar(page) {
        for (const [key, value] of Object.entries(PAGES)) {
            let childElement = null;
                if (key === "home") {
                    childElement = value.querySelector(".sidebar-topic");
                }
                else{
                    childElement = value.querySelector(".sidebar-subtopic");
                }
            if (key === page) {
                childElement.classList.add("active");
            } else if (childElement) {
                childElement.classList.remove("active");
            }
        }
        loadIcons();
    }
