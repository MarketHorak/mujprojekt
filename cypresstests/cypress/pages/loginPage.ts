import Menu from '../pages/components/menuComponent';


class SignUp {

    openLink = () => cy.get('#signin2');               // link v navbaru
    modal = () => cy.get('#signInModal');

    usernameInput = () => cy.get('#sign-username');
    passwordInput = () => cy.get('#sign-password');
    signUpButton = () => this.modal().contains('button', /^Sign up$/);
    closeButton = () => this.modal().contains('button', /^Close$/);
    // alert = () => cy.get('@alert');

    open() {
        this.openLink().click();
        this.modal().should('be.visible');
    }
    insertRegisterData(username: string, password: string) {
        this.usernameInput().clear().type(username);
        this.passwordInput().clear().clear().type(password);
    };
    submit() {
        this.signUpButton().click();
        //   this.signUpButton().should('be.enabled').click();

    }
    attachAlertSpy(alias = 'alert') {
        // Musí být volané po cy.visit(), aby to bylo na správném window
        cy.window().then(win => cy.stub(win, 'alert').as(alias));
    }
    // callAlert() {
    //     this.alert().should('have.been.called');
    // }
}
export const signUp = new SignUp();