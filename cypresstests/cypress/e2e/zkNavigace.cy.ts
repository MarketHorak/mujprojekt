import Menu from '../pages/components/menuComponent';

it('navigace funguje', () => {
  cy.visit('/');

  // Menu.click('login');
  // cy.get('#logInModal').should('be.visible');

  // // zavřít modal, kdybys potřebovala:
  // cy.contains('#logInModal .modal-footer button', 'Close').click({ force: true });

  Menu.click('contact');
  cy.get('#exampleModal').should('be.visible');
  cy.wait(1000);
// modal debilni
cy.get('#exampleModal').should('be.visible');

// klik na close
cy.get('#exampleModal').within(() => {
  cy.contains('button', /^Close$/).click({ force: true });
});

// overeni 6e je v hajzlu
cy.get('#exampleModal').should('not.be.visible');
cy.get('.modal-backdrop').should('not.exist');
  // cy.get('.modal-footer').click({ force: true });
  // cy.get('#logInModalLabel').click({ force: true });
  // cy.get('button[data-dismiss="modal"]').click({ force: true });


// todle dat do funkce v menu component
Menu.click('about');

cy.get('#videoModal').should('be.visible'); // právě otevřený modal
  cy.wait(2000);
cy.get('#videoModal').within(() => {
  cy.contains('button', /^Close$/).click(); // přesný text tlačítka
});

cy.get('#videoModal').should('not.be.visible');
cy.get('.modal-backdrop').should('not.exist');

 
  // cy.get('.modal-footer').contains('Close').click({force: true});
  // cy.get('.modal-backdrop').should('not.exist');

  Menu.click('cart');
  cy.url().should('contain', 'cart.html');

  Menu.click('home');
  cy.url().should('eq', 'https://www.demoblaze.com/index.html');

  Menu.click('signup');
  cy.get('#signInModal').should('be.visible');
  cy.wait(1000);
  cy.get('#signInModal').within(() => {
    cy.contains('button', 'Close').click({ force: true });
  });
  cy.get('.modal-backdrop').should('not.exist');

});





//   // přes atribut Bootstrapu
// cy.get('#exampleModal .modal-footer [data-dismiss="modal"]').click({ force: true });

// // nebo první tlačítko ve footeru (0 = Close, 1 = Send)
// cy.get('#exampleModal .modal-footer .btn').eq(0).click({ force: true });

// // obecně zavři JAKÝKOLIV otevřený modal
// cy.get('.modal.show').find('[data-dismiss="modal"]').click({ force: true });
// cy.get('.modal-backdrop').should('not.exist');
