Cypress.Commands.add('Login', () => {
    cy.get('[data-testid="email"]').type(Cypress.env('email'), {log:false}); // Hiding email credentials
    cy.get('[data-testid="senha"]').type(Cypress.env('password'), {log:false}); // Hiding password credentials
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('eq', 'https://front.serverest.dev/admin/home'); //Comparing current URL has been modified.
})
Cypress.Commands.add('defaultSignUp', () => {
    cy.get('[data-testid="cadastrar"]').click();
    cy.get('[data-testid="nome"]').type(Cypress.env('name'));
    cy.get('[data-testid="email"]').type(Cypress.env('johnEmail'),{log:false});
    cy.get('[data-testid="password"]').type(Cypress.env('johnPassword'),{log:false});
    cy.get('[data-testid="cadastrar"]').click();
})