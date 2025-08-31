import { signUp } from '../pages/signUpPage';
import Menu from '../pages/components/menuComponent';
import * as base from '../fixtures/user.json';
import { logIn } from '../pages/loginPage';
import smallNAV from '../pages/components/smallMenuComponent';
import { checkInCart } from '../pages/components/checkincartComponent';
import { orderForm } from '../pages/components/orderFormComponent';
// tak tohle fakt nevim
import { cartApi } from '../pages/components/CartApiComponent';

describe("sign in log in", () => {
    beforeEach(() => {
        cy.window().then(win => cy.stub(win, 'alert').as('alert'));
    });
    ///// //  SIGN IN
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
    ///// // LOGIN
    it('login cypress_user make order and check out', () => {
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
        checkInCart.emptyCartViaApi();


        ///// //  class INCART - mam funkce pro upravu    
        // cy.visit('/index.html#');
        checkInCart.openAndLoad();
        //     checkInCart.emptyCart();
        checkInCart.ensureOnCart();

        // Na menu a LAPTOPS
        Menu.click('home');
        smallNAV.pointTo('laptops');
        cy.get('#itemc').should('exist');

        checkInCart.open();    // cy.contains('.hrefch', 'Sony vaio i5').click();                    // klik na "Sony vaio i5" (detail)
        cy.intercept('POST', '**/addtocart').as('addToCart');
        cy.contains('a', 'Add to cart').click();
        cy.wait('@addToCart');
        // Menu.click('cart');

        // checkInCart.trimCartToOne();
        // cy.contains('a', 'Add to cart').click();


        // ACT
        // checkInCart.emptyCart();
        // checkInCart.trimCartToOne();

        // ASSERT kontrola tlacitek a cen v DOMU
        checkInCart.openAndLoad();
        checkInCart.productName().should('be.visible');
        checkInCart.productPrice().should('be.visible');
        checkInCart.itemSonyVaioShouldExist();
        checkInCart.totalPrice().should('have.text', '790');
        checkInCart.placeOrderButton().should('be.visible');

        // ACT
        checkInCart.openPlaceOrder();


        // ORDER FORM
        orderForm.checkFieldsVisible();
        orderForm.totalLabel().should('contain', '790');
    });
    // });

});

