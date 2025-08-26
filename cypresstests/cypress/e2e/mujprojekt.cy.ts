// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })
import * as base from '../fixtures/user.json';

describe('Demoblaze – stejné (unikátní) jméno pro sign up i login', () => {
  let username: string; // jedna proměnná pro oba kroky

  beforeEach(() => {
    cy.visit('/');
    cy.window().then(win => cy.stub(win, 'alert').as('alert'));
    username = `${base.username}_${Date.now()}`;   // vygeneruj 1×
  });

  it('signup → login', () => {
    // --- Sign up ---
    cy.wait(1000);
    cy.get('#signin2').click();
    cy.get('#sign-username').should('be.visible').type(username);
    cy.get('#sign-password').type(base.password);
    cy.contains('#signInModal .btn-primary', 'Sign up').click();
    cy.get('@alert').should('have.been.called');

    cy.get('#signInModal').within(() => cy.contains('button', 'Close').click({ force: true }));
    cy.get('.modal-backdrop').should('not.exist');

    // --- Login (STEJNÉ username) ---
    cy.get('#login2').click();
    cy.get('#loginusername').should('be.visible').type(username);
    cy.get('#loginpassword').type(base.password);
    cy.get('#logInModal').contains('button', /^Log in$/).click();

    cy.get('#nameofuser').should('contain', username);
  });
});


    // cy.get('#nameofuser').should('contain', signupUser.username);


    // 2) Ověř, že je uživatel přihlášen (vidí se jeho jméno apod.)


// cy.get('#nameofuser').should('contain', signupUser.username);

   // --- Produkt → Add to cart ---
    // cy.contains('#itemc', 'Laptops').click();
    // cy.contains('.hrefch', 'Sony vaio i5').click();
    // cy.contains('a', 'Add to cart').click();

    // // alert z "Add to cart"
    // cy.get('@alert')
    //   .should('have.been.called')
    //   .its('lastCall.args.0')
    // // .should('match', /Product added/i);


    //  cy.get('#signInModal')
    //   .within(() => {
    //     cy.contains('button', 'Close').click({ force: true });
    //   });
    // cy.get('#signInModal').should('not.be.visible');
    // cy.get('.modal-backdrop').should('not.exist');



    // --- Košík ---
    // cy.get('#cartur').click();
    // cy.contains('#tbodyid tr', 'Sony vaio i5').should('exist');

    // // --- Objednávka ---
    // cy.contains('button', 'Place Order').click();
    // cy.get('#name').type('Marketa');
    // cy.get('#country').type('Czechia');
    // cy.get('#city').type('Prague');
    // cy.get('#card').type('4111111111111111');
    // cy.get('#month').type('12');
    // cy.get('#year').type('2026');
    // cy.contains('button', 'Purchase').click();

    // cy.contains('h2', 'Thank you for your purchase!').should('be.visible');
    // cy.contains('button', 'OK').click();
