import smallNAV from '../pages/components/smallMenuComponent';

describe(' leva / small navigace funguje', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('menu je viditelné', () => {

        smallNAV.smallNav().should('be.visible');
        smallNAV.phones().should('be.visible');
        smallNAV.laptops().should('be.visible');
        smallNAV.monitors().should('be.visible');
    });
    it('přepíná na Phones ', () => {
        smallNAV.pointTo('phones');
        cy.get('#tbodyid .card-title').should('exist');
        cy.wait(2000);
    });

    it('přepíná na Laptops ', () => {
        smallNAV.pointTo('laptops');
        cy.get('#tbodyid .card-title').should('exist');
        cy.wait(2000);
    });

    it('přepíná na monitors ', () => {
        smallNAV.pointTo('monitors');
        cy.get('#tbodyid .card-title').should('exist');
        cy.wait(2000);
    });
});



// mno nejak co toto //     GET 200 https://api.demoblaze.com/entries   //    cy.intercept('POST', '**/bycat').as('bycat');
