//? Main file of the chat page

import { registerChatUI } from '../ui/chatUI.js';
import { updateSidebar } from '../ui/sidebarUI.js';

document.addEventListener('DOMContentLoaded', () => {
    registerChatUI();
    updateSidebar("chat");
});