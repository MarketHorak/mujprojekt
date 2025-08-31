class CartApi {
    private cookieFrom(username: string) {
        return `user=${username}`;            // Demoblaze API očekává "user=<jmeno>"
    }

    viewFor(username: string) {
        const cookie = this.cookieFrom(username);
        return cy
            .request('POST', 'https://api.demoblaze.com/viewcart', { cookie })
            .its('body')
            .then((b: any) => b?.Items ?? b?.items ?? []);
    }

    clearFor(username: string) {
        const cookie = this.cookieFrom(username);
        return this.viewFor(username).then((items: any[]) => {
            if (!items?.length) return;

            cy.wrap(items).each((it: any) => {
                const id = it?._id ?? it?.id;
                if (id) {
                    cy.request('POST', 'https://api.demoblaze.com/deletecart', { id, cookie });
                }
            });
        });
    }
}

export const cartApi = new CartApi();