import { SYSTEMOPTIONS } from "../utils/system.js";

const HTMLELEMENTS = {
    settingsMenu: document.querySelector(".settings-menu"), //TODO: Change to temporary element
    sidebarCategories: document.querySelectorAll(".sidebar-category"), //TODO: Change to temporary element
    settingsSections: document.querySelectorAll(".settings-section"), //TODO: Change to temporary element
    modelSelector: document.querySelector("#model-selector"), //TODO: Change to temporary element
};


    export async function registerSettingsUI() {
        HTMLELEMENTS.sidebarCategories.forEach((category) => {
            category.addEventListener("click", () => {
                HTMLELEMENTS.sidebarCategories.forEach((category) => category.classList.remove("active"));
                HTMLELEMENTS.settingsSections.forEach((section) => section.classList.remove("active"));

                category.classList.add("active");
                const sectionId = category.getAttribute("data-section");
                const section = HTMLELEMENTS.settingsMenu.querySelector(`#${sectionId}`);
                section.classList.add("active");
            });
        });

        document.querySelectorAll('.toggle-button').forEach(button => {
            button.addEventListener('click', () => {
                const optionKey = button.dataset.option;

                button.classList.toggle('active');
                const isActive = button.classList.contains('active');
                button.setAttribute('aria-pressed', isActive);

                if (optionKey && optionKey in SYSTEMOPTIONS) {
                    SYSTEMOPTIONS[optionKey] = isActive;
                }
            });
        });

        HTMLELEMENTS.modelSelector.addEventListener('change', (event) => {
            const selectedModel = event.target.value;
            console.log('Selected Model:', selectedModel);

            SYSTEMOPTIONS.model = selectedModel; // Update the model in the system options
        });
    }


    export async function showSettingsMenu() {
        //TODO: Change back to create and delete the settings menu (maybe try to use handlebars to simplify the code and make it more readable)..
        //* Show the settings menu
        HTMLELEMENTS.settingsMenu.style.display = "block";
    
        //* Create an overlay
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
        
        //* Close the menu and remove the overlay when clicking outside
        overlay.addEventListener("click", () => {
            HTMLELEMENTS.settingsMenu.style.display = "none";
            overlay.remove(); // Remove the overlay from the DOM
        });
    
        //* Close the menu when clicking on the close button
        const closeButton = HTMLELEMENTS.settingsMenu.querySelector(".btn-close");
        closeButton.addEventListener("click", () => {
            HTMLELEMENTS.settingsMenu.style.display = "none";
            overlay.remove(); // Remove the overlay from the DOM
        });
    }