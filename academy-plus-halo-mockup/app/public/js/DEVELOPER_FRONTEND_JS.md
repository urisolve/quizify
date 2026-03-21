# 📚 Frontend JS Architecture (Halo e-Learning Platform)

This project is structured for a scalable **multi-page web application**, rendered via **Server-Side Rendering (SSR)** using Express. This structure helps organize scripts per feature/page, and keeps logic separated between **API communication**, **DOM events**, **UI updates**, and **shared utilities**.

---

## 📁 Folder Structure (`/public/js`)

```
public/js/
├── api/             # Responsible for talking to backend (fetch/post/etc)
│   ├── chatAPI.js
│   └── ...
│
├── ui/              # Registers all the event listeners (click, input, etc)
│   ├── chatUI.js
│   └── ...
│
├── logic/           # Functions and handlers that prepare data and use the API and UI.
│   ├── chatLogic.js
│   └── ...
│
├── pages/           # Page-level logic, acts as entry point per SSR-rendered view
│   ├── chat.js
│   └── ...
│
├── utils/           # Shared constants, helpers, icons, etc
│   ├── icons.js
│   └── ...
```

---

## 🛠️ Folder Roles

| Folder     | Purpose                                                                 |
|------------|-------------------------------------------------------------------------|
| `api/`     | Encapsulates all backend communication. No DOM direct communication here.            |
| `events/`  | Registers and handles user interactions: clicks, keypresses.   |
| `ui/`      | Updates the DOM: inserting text, icons, toggling classes, etc.          |
| `pages/`   | Entry point per page. Connects the page's events, logic, and UI.        |
| `utils/`   | Reusable helpers (formatting, icons, translations, etc).                |

---

## 📄 File Naming Conventions

For any new page to introduce (e.g., `courses`, `profile`, etc), use this pattern:

| Page Type | File Example               | Purpose                                  |
|-----------|----------------------------|------------------------------------------|
| Logic     | `pages/<name>.js`          | Boots logic for that SSR-rendered view   |
| UI        | `ui/<name>UI.js`           | DOM updates specific to that feature     |
| Events    | `events/<name>Events.js`   | All DOM event listeners for the page     |
| API       | `api/<name>API.js`            | Handles backend communication (fetch)    |

Example for a "courses" page:
```
pages/courses.js
ui/coursesUI.js
events/coursesEvents.js
api/coursesAPI.js
```

---

## 🔁 Chat Page Flow - Use Case: _'User chats with Halo Assistant'_

Below is a detailed breakdown of the **user interaction flow** for the chat page:

```
User types & presses enter/send
       │
       ▼
events/chatEvents.js
  → Registers event and forwards it to...
       │
       ▼
ui/chatUI.js
  → Detects the type of interaction
  → Shows the "thinking message"
  → Adds the message
  → Calls...
       │
       ▼
api/chatAPI.js
  → Prepares prompt
  → Sends prompt to backend
  → Receives streaming response
  → Parses it chunk-by-chunk
       │
       ▼
ui/chatUI.js
  → Appends content to DOM as it's received
  → Finalizes message once complete
       ▼
✅ User sees assistant's response
```

---

## 🧠 Some principles to keep the code organized

- **No backend calls in the UI layer.** UI only updates the DOM or handles communication to the `js/api/`.
- **No DOM manipulation inside the API layer.** Only use fetches to the backend or functions to prepare/parse data sent/received.
- **One `pages/*.js` per route/view** _(if needed)_. It orchestrates everything else.
- **Shared logic goes in `utils/`.** No duplication if it can be helped.

---

## ✨ Additional tips

- Use **descriptive function names** (`handleStream`, `writePrompt`, `updateUI`) for self-documenting code.
- Favor **exporting centralized objects** when grouping things (`ICONS`, `ERRORS`, etc).
- Document event listeners inside `events/*.js` with comments describing their trigger points.

---
