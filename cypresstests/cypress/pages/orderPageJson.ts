
import { orderForm } from './components/orderFormComponent';


class OrderPage {
    openModal() {
        //cart.openPlaceOrder();

        orderForm.checkFieldsVisible();
    }

    assertModalTotal(total: number) {
        orderForm.totalLabel().invoke('text').then(t => {
            expect(t.replace(/\D+/g, '')).to.eq(String(total)); // tolerantně
        });
    }

    purchase(data: { name: string; country: string; city: string; card: string; month: string | number; year: string | number; }) {
        orderForm.fill(data);
        orderForm.submit();
    }

    // potvrzení(SweetAlert) a klik na button OK
    confirmDialog = () => cy.get('.sweet-alert');
    confirmText = () => this.confirmDialog().find('p');
    confirmOk = () => cy.contains('button', /^OK$/);

   orderConfirmation(total: number) {
        this.confirmDialog().should('be.visible');
        this.confirmText().invoke('text').then(txt => {
            const m = txt.match(/Amount:\s*(\d+)/);
            expect(Number(m?.[1])).to.eq(total);
        });
    }
}
export const orderPage = new OrderPage();