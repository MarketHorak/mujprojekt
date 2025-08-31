import { orderForm } from '../pages/components/orderFormComponent';
import Menu from '../pages/components/menuComponent';
import { orderPage } from '../pages/orderPageJson';
import smallNAV from '../pages/components/smallMenuComponent';
import { checkInCart } from '../pages/components/checkincartComponent';

describe(' leva / small navigace funguje', () => {


    it('ORDER vyplnění / potvrzení / odeslání', () => {
        cy.visit('/');

        smallNAV.pointTo('laptops');
        cy.get('#itemc').should('exist')

        checkInCart.open(); // cy.contains('.hrefch', 'Sony vaio i5').click();
        cy.contains('a', 'Add to cart').click();

        Menu.click('cart');
        // ACT

        // ASSERT kontrola tlacitek a cen v DOMU
        // checkInCart.trimCartToOne();
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


        // otevři modal a zkontroluj
        orderPage.openModal();
        orderPage.assertModalTotal(790);

        // vyplň a odešli
        orderPage.purchase({
            name: 'Markéta',
            country: 'CZ',
            city: 'Praha',
            card: '4111111111111111',
            month: 12,
            year: 2028,
        });

        // potvrzení a OK
        cy.wait(1000); // počkej 
        orderPage.orderConfirmation();
        orderPage.confirmOk().click();
    });
});