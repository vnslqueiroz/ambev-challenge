# 🛠️ **Ambev Challenge**

Welcome to the **Ambev Challenge** repository!

This repository contains 6 automated tests as requested, with 3 focused on the front end and 3 on the back end.

These tests cover login, logout, user registration, as well as the addition and deletion of users.

## 📂 **Project Structure**

cypress/
├── downloads/          # Folder for downloaded files
├── e2e/                # End-to-End tests folder
│   └── tests.cy.js     # Test scripts
├── support/            # Custom support files
│   └── commands.js     # Custom Cypress commands
├── fixtures/           # Static data for tests


Here's an overview of the key directories and files in the project:

### 1. **`/support/commands.js`** 📝
This file contains custom commands for Cypress. These commands are reusable across your tests, allowing you to simplify your test code and avoid repetition.

- Custom commands that you define here can be used in your test files to interact with the application (e.g., login, search, etc.).

### 2. **`/e2e/tests.cy.js`** ⚙️
This is where the automated end-to-end tests live. These tests simulate user interactions with the application to verify that the application behaves as expected.

- The test file includes scenarios like logging in, verifying UI components, and interacting with the app.
- Each test case is written using Cypress commands and assertions.
