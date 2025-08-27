class MenuComponent {
  // Jednotlivé odkazy v horní navigaci Demoblaze
  home   = () => cy.contains('a.nav-link', 'Home');
  contact= () => cy.contains('a.nav-link', 'Contact');
  about  = () => cy.contains('a.nav-link', 'About us');
  cart   = () => cy.get('#cartur');
  login  = () => cy.get('#login2');
  signup = () => cy.get('#signin2');

  // Jednoduché kliknutí podle názvu
  click(link: 'home'|'contact'|'about'|'cart'|'login'|'signup') {
    switch (link) {
      case 'home':   return this.home().click();
      case 'contact':return this.contact().click();
      case 'about':  return this.about().click();
      case 'cart':   return this.cart().click();
      case 'login':  return this.login().click();
      case 'signup': return this.signup().click();
    }
  }
}

export default new MenuComponent();