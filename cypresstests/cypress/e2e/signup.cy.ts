import { signUp } from '../pages/signUpPage';
import Menu from '../pages/components/menuComponent';
import * as base from '../fixtures/user.json';


describe("sign in and modal is closed", () => {

    it('TESTOVACI DATA Sign up projde ', () => {

        // ARRANGE (prostředí)
        cy.visit('/');
        Menu.click('signup');
        cy.window().then(win => cy.stub(win, 'alert').as('alert'));
        cy.wait(1000);

        // ACT
        signUp.insertRegisterData('marketka123', 'tajneheslo');
        signUp.submit();
        cy.wait(2000); //

        // ASSERT  
        cy.get('@alert').should('have.been.called');
        cy.get('@alert').its('lastCall.args.0')
            .should('match', /(Sign up successful|This user already exist)/i);
        // ASSERT
        signUp.close()
        signUp.callBackdrop(); // nekdy funguje pak ne
    });




    it('Sign up s JSON DATA ', () => {
        // ARRANGE 
        cy.visit('/');
        Menu.click('signup');
        // cy.window().then(win => cy.stub(win, 'alert').as('alert'));
        cy.wait(1000);

        // ACT
        signUp.insertRegisterData(base.username, base.password);
        signUp.submit();
        cy.wait(2000); // 
        //cy.get('@alert').should('have.been.called'); ... radek 36 zakomentovan
        cy.on('window:alert', (text) => {
            expect(text).to.match(/Sign up successful|This user already exist/i);
        });

        // ASSERT
        signUp.close()                  // signUp.closeButton().click({ force: true });
        signUp.callBackdrop()   // cy.get('.modal-backdrop').should('not.exist');

    });


    it('Sign up bez dat jinak cokoliv projde ', () => {
        // ARRANGE 
        cy.visit('/');
        Menu.click('signup');

        // ACT
        // signUp.insertRegisterData(base.wrongusername, base.wrongpassword);  ////// toto zeptat
        signUp.submit();

        // ASSERT
        cy.on('window:alert', (text) => {
            expect(text).to.match(/Please fill out Username and Password./i);
        });
        cy.wait(2000); //

        // ASSERT
        signUp.close()
        signUp.callBackdrop()
    });





});