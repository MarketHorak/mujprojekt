import { signUp } from '../pages/loginPage';
import Menu from '../pages/components/menuComponent';
import * as base from '../fixtures/user.json';


describe("sign in and modal is closed", () => {

    it('TESTOVACI Sign up projde ', () => {
        cy.visit('/');
        Menu.click('signup');
        cy.window().then(win => cy.stub(win, 'alert').as('alert'));
        cy.wait(1000);
        signUp.insertRegisterData('marketka123', 'tajneheslo');
        cy.wait(2000); // prepsat na button bude viditelny


        signUp.submit();
        cy.wait(2000); // 
        cy.get('@alert').should('have.been.called');
        cy.get('@alert').its('lastCall.args.0')
            .should('match', /(Sign up successful|This user already exist)/i);
        signUp.closeButton().click({ force: true });
        cy.get('.modal-backdrop').should('not.exist');
    });
});



it('Sign up s JSON DATA ', () => {
    cy.visit('/');
    Menu.click('signup');
    cy.window().then(win => cy.stub(win, 'alert').as('alert'));
    cy.wait(1000);
    signUp.insertRegisterData(base.username, base.password);
    cy.wait(2000); // prepsat na button bude viditelny

    signUp.submit();
    cy.wait(2000); // 
    cy.get('@alert').should('have.been.called');
    cy.get('@alert').its('lastCall.args.0')
        .should('match', /(Sign up successful|This user already exist)/i);

    signUp.closeButton().click({ force: true });
    cy.get('.modal-backdrop').should('not.exist');
});



