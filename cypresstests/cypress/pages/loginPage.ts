class LogIn {

    loginUsername = () => cy.get('#loginusername')
    loginPassword = () => cy.get('#loginpassword')
    loginButton = () => cy.get('#logInModal').contains('button', /^Log in$/)
    loginCloseButton = () => cy.get('#logInModal').contains('button', /^Close$/)
    loginModalBackdrop = () => cy.get('.modal-backdrop')
    nameOfuser = () => cy.get('#nameofuser')

    open() {
        // this.openLink().click();
        this.loginModalBackdrop().should('be.visible');
    }
    insertLoginData(loginname: string, loginpassword: string) {
        this.loginUsername().should('be.visible').clear().type(loginname);
        this.loginPassword().should('be.visible').clear().type(loginpassword);
    };

    submit() {
        this.loginButton().click();
    }
    close() {
        this.loginCloseButton().should('be.visible').click({ force: true });
    }
    callBackdrop() {
        this.loginModalBackdrop().should('not.exist');
    }




}
export const logIn = new LogIn();
