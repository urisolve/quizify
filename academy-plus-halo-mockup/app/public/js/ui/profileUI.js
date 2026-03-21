

//TODO: Ter os elementos do HTML em um arquivo separado e importar aqui, para não ficar tão poluído o código..

import * as settings from "./settingsUI.js"; //TODO: Change to temporary element

const HTMLELEMENTS = {
    profile: document.querySelector(".header-profile"),
    profileDropdown: document.querySelector(".profile-dropdown"),
    profileIcon: document.querySelector(".profile-icon"),
    profileSettings: document.querySelector("#profile-settings"),
}

export async function registerProfileUI() {
    if (!HTMLELEMENTS.profile) return;

    HTMLELEMENTS.profile.addEventListener("click", (event) => toggleProfileDropdown(event));
    document.addEventListener("click", (event) => { closeProfileDropdown(event); });
    //CLicking on settings opens the settings menu:
    HTMLELEMENTS.profileSettings.addEventListener("click", (event) => {
        closeProfileDropdown(event); 
        settings.showSettingsMenu()
    });
}


function toggleProfileDropdown(event) {
    // Check if the dropdown is currently visible
    if (HTMLELEMENTS.profileDropdown.style.display === "none" || HTMLELEMENTS.profileDropdown.style.display === "") {
        HTMLELEMENTS.profileDropdown.style.display = "block";
    } else {
        HTMLELEMENTS.profileDropdown.style.display = "none";
    }
    // Prevent the event from propagating to the document click listener
    if (event) event.stopPropagation();
}

function closeProfileDropdown(event) {
    if(HTMLELEMENTS.profileDropdown.style.display === "block" && !HTMLELEMENTS.profile.contains(event.target) && !HTMLELEMENTS.profileDropdown.contains(event.target)) {
        HTMLELEMENTS.profileDropdown.style.display = "none";
    } else {
        HTMLELEMENTS.profileDropdown.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('profile-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/auth/logout', { method: 'POST' });
      window.location.href = '/login'; // or your home page
    });
  }
});