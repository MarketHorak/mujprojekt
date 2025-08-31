import { signUp } from '../pages/signUpPage';
import Menu from '../pages/components/menuComponent';
import * as base from '../fixtures/user.json';
import { logIn } from '../pages/loginPage';
import smallNAV from '../pages/components/smallMenuComponent';
import { checkInCart } from '../pages/components/incartComponent';

describe("sign in log in", () => {
    beforeEach(() => {
        cy.window().then(win => cy.stub(win, 'alert').as('alert'));
    });
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
        // class INCART - funkce pro upravu    
        // cy.visit('/index.html#');
        smallNAV.pointTo('laptops');
        cy.get('#itemc').should('exist')

        checkInCart.open(); // cy.contains('.hrefch', 'Sony vaio i5').click();
        cy.contains('a', 'Add to cart').click();

        Menu.click('cart');
        // ACT
        checkInCart.emptyCart();

        // ASSERT kontrola tlacitek a cen v DOMU
        // checkInCart.trimCartToOne();
        checkInCart.productName().should('be.visible');
        checkInCart.productPrice().should('be.visible');
        checkInCart.itemSonyVaioShouldExist();
        checkInCart.totalPrice().should('have.text', '790');
        checkInCart.placeOrderButton().should('be.visible');

        // ACT
        checkInCart.openPlaceOrder();
    });

    // afterEach(() => {

    // });

});

