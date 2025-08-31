class inCart {

    itemSonyVaio = () => cy.contains('.hrefch', 'Sony vaio i5');
    cartItems = () => cy.get('#tbodyid tr');
    deleteCartItem = () => cy.contains('#tbodyid a', 'Delete').first();

    open() {
        this.itemSonyVaio().click();
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
}

export const checkInCart = new inCart();
