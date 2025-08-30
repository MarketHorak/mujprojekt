import Menu from '../pages/components/menuComponent';


class SignUp {

    openLink = () => cy.get('#signin2');               // link v navbaru
    modal = () => cy.get('#signInModal');

    usernameInput = () => cy.get('#sign-username');
    passwordInput = () => cy.get('#sign-password');
    signUpButton = () => this.modal().contains('button', /^Sign up$/);
    closeButton = () => this.modal().contains('button', /^Close$/);
    modalBackdrop = () => cy.get('.modal-backdrop');
    // alert = () => cy.get('@alert');

    open() {
        this.openLink().click();
        this.modal().should('be.visible');
    }
    insertRegisterData(username: string, password: string) {
        this.usernameInput().should('be.visible').clear().type(username);
        this.passwordInput().should('be.visible').clear().type(password);
    };

    submit() {
        this.signUpButton().click();
        //   this.signUpButton().should('be.enabled').click();

    }
    attachAlertSpy(alias = 'alert') {
        // Musí být volané po cy.visit(), aby to bylo na správném window
        cy.window().then(win => cy.stub(win, 'alert').as(alias));
    }
    close() {

        this.closeButton().should('be.visible').click({ force: true });
    }
    callBackdrop() {
        //  cy.wait(1000); // počkat než zmizí backdrop
        this.modalBackdrop().should('not.exist');
    }
    // callAlert() {
    //     this.alert().should('have.been.called');
    // }
}
export const signUp = new SignUp();