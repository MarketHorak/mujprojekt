import { signUp } from '../pages/signUpPage';
import Menu from '../pages/components/menuComponent';
import * as base from '../fixtures/user.json';
import { logIn } from '../pages/loginPage';

describe("sign in log in", () => {


    it('Sign up s JSON DATA ', () => {
        // ARRANGE 
        cy.visit('/');
        Menu.click('signup');
        cy.wait(1000);

        // ACT
        signUp.insertRegisterData(base.username, base.password);
        signUp.submit();
        cy.on('window:alert', (text) => {
            expect(text).to.match(/Sign up successful|This user already exist/i);
        });

        // ASSERT
        signUp.close()
        signUp.callBackdrop()

    });

    it('login cypress_user from json', () => {
        // ARRANGE
        cy.visit('/');
        Menu.click('login');


        // ACT
        logIn.insertLoginData(base.username, base.password);
        logIn.submit();
        // cy.wait(2000);

        // ASSERT
        logIn.nameOfuser().should('be.visible').should('contain', base.username);
        logIn.nameOfuser()
            .invoke('text')
            .then(t => {
                const msg = t.replace(/\s+/g, ' ').trim();
                cy.log(`Navbar hlásí: "${msg}"`);
                expect(msg).to.equal(`Welcome ${base.username}`);
            });


    });
});