import Menu from './menuComponent';
import { cartApi } from '../components/CartApiComponent';
class CheckInCartinCart {

    itemSonyVaio = () => cy.contains('.hrefch', 'Sony vaio i5');
    cartItems = () => cy.get('#tbodyid tr');
    deleteCartItem = () => cy.contains('#tbodyid a', 'Delete').first();
    pictureCheck = () => cy.get('#tbodyid img');

    productPrice = () => cy.contains('#tbodyid tr.success td', /^\s*790\s*$/);    // productName = () => cy.get('#tbodyid tr td:nth-child(2)');
    productName = () => cy.contains('#tbodyid tr.success td', /^\s*Sony vaio i5\s*$/);
    placeOrderButton = () => cy.get('button.btn.btn-success[data-target="#orderModal"]');
    totalPrice = () => cy.get('#totalp');
    orderModal = () => cy.get('#orderModal');

    // empty 
    table = () => cy.get('#tbodyid');
    cartItemsEmpty = () => this.table().find('tr');
    deleteLink = () => cy.contains('#tbodyid a', 'Delete');
    totalPanel = () => cy.get('.panel.panel-info');


    // FUNKCE 

    open() {
        this.itemSonyVaio().click();
    }

    itemSonyVaioShouldExist() {
        this.productName().should('exist');
        this.productPrice().should('exist');
    }

    openAndLoad() {
        cy.intercept('POST', '**/viewcart').as('viewcart');   // 1) nejdřív intercept
        Menu.click('cart');                                    // 2) klik na Cart PATŘÍ SEM
        cy.wait('@viewcart');                                  // 3) počkej na data
        this.totalPanel().should('exist');                     // ⬅️ bylo 'be.visible' → dej 'exist'
        this.table().should('exist');                          // tbody může mít height 0, neřeš viditelnost
    }



    // nakonec nepouzivem ... prepsana empty fce
    trimCartTo(target = 1) {
        const loop = () => {
            this.cartItems().then($rows => {
                if ($rows.length <= target) return;            // hotovo
                this.deleteLink().first().click();
                // jen ověříme že ubylo (někdy server vrátí různé řádky)
                this.cartItems().should('have.length.lessThan', $rows.length);
                loop();
            });
        };
        loop();
        this.cartItems().should('have.length', target);

    }
    ensureOnCart() {
        cy.url().should('include', 'cart.html');
        this.table().should('exist');                          // ⬅️ místo 'be.visible'
    }

    // smaže VŠE (0 položek)
    emptyCart() {
        const loop = () => {
            this.cartItems().then($rows => {
                if ($rows.length === 1) return;
                this.deleteLink().first().click();

                this.cartItems().should('have.length.lessThan', $rows.length);
                loop();
            });
        };
        loop();
        this.cartItems().should('have.length', 1);
    }

    // pak se uz nasmeruju na order modal ... samostatna page udelam
    openPlaceOrder() {
        this.placeOrderButton().should('be.visible').and('not.be.disabled').click();
        this.orderModal().should('be.visible');
    }
    emptyCartViaApi() {
        cy.window().then(win => {
            const raw = win.localStorage.getItem('user');     // např. "mk_123..."
            if (!raw) return;

            const cookie = raw.startsWith('user=') ? raw : `user=${raw}`;

            cy.request('POST', 'https://api.demoblaze.com/viewcart', { cookie })
                .its('body')
                .then((body: any) => {
                    const items = body?.Items || body?.items || [];
                    if (!Array.isArray(items) || items.length === 0) return;

                    // smaž každou položku
                    cy.wrap(items).each((it: any) => {
                        const id = it?._id || it?.id;
                        if (id) cy.request('POST', 'https://api.demoblaze.com/deletecart', { id, cookie });
                    });
                });
        });


    }
}

export const checkInCart = new CheckInCartinCart();
