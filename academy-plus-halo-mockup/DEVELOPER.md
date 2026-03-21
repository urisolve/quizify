# 👨‍💻 HALOgen Developer Guide

Welcome to the **Developer README** for HALOgen — the e-learning platform designed to assist self-learning through natural and multimodal interactions. This file is for contributors and developers working on the platform's codebase.

---

## 📁 Project Structure - `app/` folder

```
/
├── api/            #
│
├── config/         #
│
├── controllers/    # Express route handlers
│
├── locales/        # 
│
├── middleware/     #
│
├── models/         #
│
├── public/         # Files shared with the client
│   │ 
│   └── css/          # Styles (automatically written by SCSS)
│   └── scss/         #
│   └── js/           #
│   └── vendor/       #
│   └── img/          #
│
├── routes/         # Express routes
│
├── utils/          # 
│
├── views/          # Server-rendered HTML (via Express and templating)
│
├── app.js          # Main file

```

---

## 📄 Developer Documentation Index

Here’s a list of available sub-readmes by domain:

| Area           | Description                              | Link                                |
|---------------|------------------------------------------|-------------------------------------|
| Views  | Handlebars layouts, partials and pages                             | _(To be created)_                   |
| Public Folder  | Files loaded in the client-side                           | _(To be created)_                   |
| ├── Public JS    | Structure and flow of frontend JS logic     | [`public/js`](./app/public/js/DEVELOPER_FRONTEND_JS.md) |
| ├── Public CSS  | Styles organization using Sass/SCSS | _(To be created)_                   |
| Controllers - Routes  | Controllers and Routes, (pages & API) | _(To be created)_                   |
| Internationalization     | Locales and Handlebars (languages)                             | _(To be created)_                   |

---

## 🚀 Quick Start (For Devs)

```bash
(To be added)
```

## 🧠 Final Notes

Keep each module focused, write small reusable helpers, and prefer clarity over cleverness. This guide can grow — feel free to improve it as the project evolves.