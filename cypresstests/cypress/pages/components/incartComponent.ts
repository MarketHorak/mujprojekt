class inCart {

    itemSonyVaio = () => cy.contains('.hrefch', 'Sony vaio i5');
    cartItems = () => cy.get('#tbodyid tr');
    deleteCartItem = () => cy.contains('#tbodyid a', 'Delete').first();
    pictureCheck = () => cy.get('#tbodyid img');

    productPrice = () => cy.contains('#tbodyid tr.success td', /^\s*790\s*$/);    // productName = () => cy.get('#tbodyid tr td:nth-child(2)');
    productName = () => cy.contains('#tbodyid tr.success td', /^\s*Sony vaio i5\s*$/);
    placeOrderButton = () => cy.get('button.btn.btn-success[data-target="#orderModal"]');
    totalPrice = () => cy.get('#totalp');
    orderModal = () => cy.get('#orderModal');




    // FUNKCE 

    open() {
        this.itemSonyVaio().click();
    }

    itemSonyVaioShouldExist() {
        this.productName().should('exist');
        this.productPrice().should('exist');
    }
    // nakonec nepouzivem ... prepsana empty fce
    trimCartToOne() {
        this.cartItems().then($rows => {
            const n = $rows.length;
            if (n <= 1) return;

            for (let i = n; i > 1; i--) {
                this.deleteCartItem().first().click();

                this.cartItems().should('have.length', i - 1);
                cy.wait(500)
            }
        });


        this.cartItems().should('have.length', 1);
    }
    emptyCart() {
        this.cartItems().then(rows => {
            if (rows.length > 0) {
                cy.wrap(rows).each(() => {
                    this.deleteCartItem().click();
                });
            }
        });

        this.cartItems().should('have.length', 0);
    }
    // pak se uz nasmeruju na order modal ... samostatna page udelam
    openPlaceOrder() {
        this.placeOrderButton().should('be.visible').and('not.be.disabled').click();
        this.orderModal().should('be.visible');
    }



}

export const checkInCart = new inCart();
