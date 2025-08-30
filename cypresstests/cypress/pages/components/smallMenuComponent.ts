class SmallMenuComponent {
    smallNav = () => cy.get('.list-group');

    phones = () => cy.contains('.list-group-item', /^Phones$/);
    laptops = () => cy.contains('.list-group-item', /^Laptops$/);
    monitors = () => cy.contains('.list-group-item', /^Monitors$/);

    clickPhones() { this.phones().click(); }
    clickLaptops() { this.laptops().click(); }
    clickMonitors() { this.monitors().click(); }

    pointTo(category: 'phones' | 'laptops' | 'monitors') {
        switch (category) {
            case 'phones': return this.clickPhones();
            case 'laptops': return this.clickLaptops();
            case 'monitors': return this.clickMonitors();
            default: throw new Error(`Neznámá kategorie: ${category}`);
        }
    }
}

export default new SmallMenuComponent();