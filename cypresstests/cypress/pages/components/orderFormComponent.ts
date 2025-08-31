class OrderModal {
    //
    orderModal = () => cy.get('#orderModal');
    form = () => this.orderModal().find('form');

    // field form
    nameInput = () => this.form().find('input#name');
    countryInput = () => this.form().find('input#country');
    cityInput = () => this.form().find('input#city');
    cardInput = () => this.form().find('input#card');
    monthInput = () => this.form().find('input#month');
    yearInput = () => this.form().find('input#year');
    totalLabel = () => this.orderModal().find('#total, #totalm');


    // buttons
    purchaseButton = () => this.orderModal().contains('button', /^Purchase$/);
    closeButton = () => this.orderModal().contains('button', /^Close$/);


    checkFieldsVisible() {
        this.nameInput().should('be.visible');
        this.countryInput().should('be.visible');
        this.cityInput().should('be.visible');
        this.cardInput().should('be.visible');
        this.monthInput().should('be.visible');
        this.yearInput().should('be.visible');
    }
    fill(data: { name: string; country: string; city: string; card: string; month: string | number; year: string | number; }) {
        this.nameInput().clear().type(data.name);
        this.countryInput().clear().type(data.country);
        this.cityInput().clear().type(data.city);
        this.cardInput().clear().type(String(data.card));
        this.monthInput().clear().type(String(data.month));
        this.yearInput().clear().type(String(data.year));
    }

    submit() {
        this.purchaseButton().should('be.enabled').click();
    }
}

export const orderForm = new OrderModal();












// <div class="modal-body">
//           <form>
//             <label for="name" class="form-control-label" id="totalm">Total: 790</label>
//             <div class="form-group">
//               <label for="name" class="form-control-label">Name:</label>
//               <input type="text" class="form-control" id="name">
//             </div>
//             <div class="form-group">
//               <label for="country" class="form-control-label">Country:</label>
//               <input type="text" class="form-control" id="country">
//             </div>
//             <div class="form-group">
//               <label for="city" class="form-control-label">City:</label>
//               <input type="text" class="form-control" id="city">
//             </div>
//             <div class="form-group">
//               <label for="card" class="form-control-label">Credit card:</label>
//               <input type="text" class="form-control" id="card">
//             </div>
//             <div class="form-group">
//               <label for="month" class="form-control-label">Month:</label>
//               <input type="text" class="form-control" id="month">
//             </div>
//             <div class="form-group">
//               <label for="year" class="form-control-label">Year:</label>
//               <input type="text" class="form-control" id="year">
//             </div>
//             <div class="form-group">
//               <label id="errors" style="color:red" class="form-control-label"></label>
//             </div>
//           </form>
//         </div>