# telegram_algo_trader_llm

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Telegram WebApp Architecture

1. Telegram Bot (Python backend)
    * Handles bot commands (/start, /menu, etc.).
    * Sends users a button to open your WebApp.
    * Receives structured data from the WebApp after submission.
    * Passes inputs to your RAG pipeline and returns results.

2. WebApp (Frontend, runs inside Telegram)
    * Built in React / Vue / plain HTML+JS.
    * UI elements: stock dropdown, entry price input, submit button.
    * Communicates with Telegram via Telegram WebApp API.
   * Sends data back to bot when submitted.
3. Backend API (optional if WebApp is static)
    * Your WebApp can either:
    * Submit data directly to Telegram bot (preferred for simplicity).
    * Or call your backend endpoint → backend processes RAG pipeline → bot sends response.