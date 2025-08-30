import Menu from '../pages/components/menuComponent';


describe("test hlavni NAV menu klik a close", () => {
  beforeEach(() => {
    cy.visit('/'); // porad stejne krom index.html
  });

  it('menu navigace funguje', () => {
    cy.visit("/")
    // // zavřít modal-nefunguje - // cy.contains('#logInModal .modal-footer button', 'Close').click({ force: true });
  });
  // Assert ze menu funguje  //  dat do funkce  ?


  // ========== HOME
  it('home funguje', () => {
    Menu.click('home');
    cy.url().should('contain', 'index.html');
    cy.url().should('eq', 'https://www.demoblaze.com/index.html');
  });

  // ========== CONTACT
  it('contact funguje', () => {
    Menu.click('contact');
    cy.get('#exampleModal').should('be.visible');
    cy.wait(1000);
    // modal debilni - // klik na close
    cy.get('#exampleModal').within(() => {
      cy.contains('button', /^Close$/).click({ force: true });
    });
    // overeni ze je debilni modal v hajzlu
    cy.get('#exampleModal').should('not.be.visible');
    cy.get('.modal-backdrop').should('not.exist');
  });


  // ==========ABOUT
  it('contact funguje', () => {
    Menu.click('about');
    cy.get('#videoModal').should('be.visible');  // problem videomodal
    cy.wait(2000);
    cy.get('#videoModal').within(() => {
      cy.contains('button', /^Close$/).click(); // uz ok // přesný text tlačítka
    });
    cy.get('#videoModal').should('not.be.visible');
    cy.get('.modal-backdrop').should('not.exist');
  });

  // ========== CART
  it('contact funguje', () => {
    Menu.click('cart');
    cy.url().should('contain', 'cart.html');
  });

  // ========== LOGIN
  it('login funguje', () => {
    Menu.click('login');
    cy.get('#logInModal').should('be.visible');
    cy.wait(1000);
    cy.get('#logInModal').within(() => {
      cy.contains('button', /^Close$/).click(); ({ force: true });
    });
    cy.get('.modal-backdrop').should('not.exist');

  });

  // ========== SIGN UP
  it('sign up funguje', () => {
    Menu.click('signup');
    cy.get('#signInModal').should('be.visible');
    cy.wait(1000);
    cy.get('#signInModal').within(() => {
      cy.contains('button', 'Close').click({ force: true });
    });
    cy.get('.modal-backdrop').should('not.exist');


  });

  it('back to main baseurl ', () => {
    // finish back to page
    cy.visit('/');
  });
});


// // obecně / jeste otestovat
// v ABOUT
// cy.get('.modal-footer').contains('Close').click({force: true});
// cy.get('.modal-backdrop').should('not.exist');


// cy.get('.modal.show').find('[data-dismiss="modal"]').click({ force: true });
// cy.get('.modal-backdrop').should('not.exist');



//   // přes atribut Bootstrapu
// cy.get('#exampleModal .modal-footer [data-dismiss="modal"]').click({ force: true });

// // nebo první tlačítko ve footeru (0 = Close, 1 = Send)
// cy.get('#exampleModal .modal-footer .btn').eq(0).click({ force: true });

