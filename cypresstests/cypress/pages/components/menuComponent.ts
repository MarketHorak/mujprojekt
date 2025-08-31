class MenuComponent {
  //  odkazy vyber
  home = () => cy.contains('a.nav-link', 'Home');
  contact = () => cy.contains('a.nav-link', 'Contact');
  about = () => cy.contains('a.nav-link', 'About us');
  cart = () => cy.get('#cartur');
  login = () => cy.get('#login2');
  signup = () => cy.get('#signin2');
  logout = () => cy.get('#logout2');

  //  odkazy
  click(link: 'home' | 'contact' | 'about' | 'cart' | 'login' | 'signup' | 'logout') {
    switch (link) {
      case 'home': return this.home().click();
      case 'contact': return this.contact().click();
      case 'about': return this.about().click();
      case 'cart': return this.cart().click();
      case 'login': return this.login().click();
      case 'signup': return this.signup().click();
      case 'logout': return this.logout().click();
    }
  }
}

export default new MenuComponent();