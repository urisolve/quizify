//? Main file of the home page

// import { registerHomeUI } from '../ui/homeUI.js';
import { updateSidebar } from '../ui/sidebarUI.js';

document.addEventListener('DOMContentLoaded', () => {
    // registerHomeUI();
    updateSidebar("home");
});