
import * as base from '../fixtures/user.json';

describe('Demoblaze ', () => {
  let username: string; // jedna proměnná pro oba kroky // jeste osefovat

  beforeEach(() => {
    cy.visit('/');
    cy.window().then(win => cy.stub(win, 'alert').as('alert'));
    username = `${base.username}`;   // vygeneruj 1× // dodelat unikatni? `${base.username_${Date.now()}`;
  });

  it('signup → login', () => {
    // --- Sign up ---
    cy.wait(1000);
    cy.get('#signin2').click();
    cy.wait(2000); // prepsat na button bude viditelny

    cy.get('#sign-username').should('be.visible').type(username);
    cy.get('#sign-password').type(base.password);
    cy.contains('#signInModal .btn-primary', 'Sign up').click();
    cy.get('@alert').should('have.been.called');

    cy.get('#signInModal').within(() => cy.contains('button', 'Close').click({ force: true }));
    cy.get('.modal-backdrop').should('not.exist');

    // --- Login (STEJNÉ username) ---
    cy.get('#login2').click();
    cy.wait(1000); // prepsat na button bude viditelny
    cy.get('#loginusername').should('be.visible').type(username);;
    cy.get('#loginpassword').type(base.password);
    cy.wait(1000); // prepsat na button bude viditelny
    cy.get('#logInModal').contains('button', /^Log in$/).click();


    // 2) Ověřit že je uživatel přihlášen (vidí se jeho jméno apod.)
    cy.get('#nameofuser').should('contain', username);





    // --- Produkt → Add to cart --- kod html

    // list group menu 
    //  <div class="list-group">
    //         <a href="" class="list-group-item" id="cat">CATEGORIES</a>
    //         <a href="#" id="itemc" onclick="byCat('phone')" class="list-group-item">Phones</a>
    //         <a href="#" id="itemc" onclick="byCat('notebook')" class="list-group-item">Laptops</a>
    //         <a href="#" id="itemc" onclick="byCat('monitor')" class="list-group-item">Monitors</a>
    //       </div>


    cy.contains('#itemc', 'Laptops').click();

    // prepsat podle celeho kontejneru aby slo jen vybrat produkt
    // celej kontejner ma id="tbodyid"
    // prvek class="card h-100"
    // napr <h4 class="card-title"><a href="prod.html?idp_=2" class="hrefch">Nokia lumia 1520</a></h4>



    cy.contains('.hrefch', 'Sony vaio i5').click();
    cy.contains('a', 'Add to cart').click();

    // alert z "Add to cart"
    cy.get('@alert')
      .should('have.been.called')
      .its('lastCall.args.0')
    // .should('match', /Product added/i);


  });
});



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
