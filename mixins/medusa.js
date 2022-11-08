export default {
    methods: {
        toCurrency(num) {
            num = num / 100;
            const formatter = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',

                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            });
            return formatter.format(num)
        }
        ,
        toDate(date) {
            console.log(date)
            const options = { year: "numeric", month: "long", day: "numeric" }
            return new Date(date).toLocaleDateString('en-GB', options)
            // console.log(new Intl.DateTimeFormat(new Date(date)).format('MMMM DD, YYYY'))

        },
        async addToCart(variantId, quantity) {
            let data = {
                cartId: this.getCart.id,
                variantId: variantId,
                quantity: quantity,
            };
            await this.$store.dispatch("shop/addItemToCart", data);
            this.getShippingOptions();
        },
        async removeFromCart(itemId) {
            console.log("removinFrom cart");
            let data = {
                cartId: this.getCart.id,
                itemId: itemId,
            };
            await this.$store.dispatch("shop/removeItemFromCart", data);
        },
        async getShippingOptions() {
            // id	"so_01G8XMJ5EYVS2KYRD362Q8FPWR"
            // .name
            // .amount

            console.log("adding shipping");
            let data = {
                cartId: this.getCart.id,
                //  shippingMethod: "royal mail"
            };
            await this.$store.dispatch("shop/getShippingOptionsForCart", data);
        },
        async removeDiscount() {
            console.log("removing discount");
            let data = {
                cartId: this.getCart.id,
                code: "TEST",
            };
            await this.$store.dispatch("shop/removeDiscount", data);
        },
        async updateItemQuantity(itemId, quantity) {
            console.log("change quant");
            console.log(itemId);
            console.log(quantity);
            let data = {
                cartId: this.getCart.id,
                update: {
                    itemId: itemId,
                    quantity: Number(quantity),
                },
            };
            await this.$store.dispatch("shop/updateItemQuantity", data);
        },

        async updateCart() {
            let cart = this.getCart;
            // await this.$store.dispatch("shop/retrieveCart", this.getCart.id);
            let data = {
                // customer_id: 'cus_01GGQCYQZCV8EDVX27DVRDDH4K',
                cartId: this.getCart.id,
                update: {
                    customer_id: 'cus_01GGQCYQZCV8EDVX27DVRDDH4K',
                    discounts: [{ code: "TEST" }],
                    shipping_address: {
                        first_name: "Kieran",
                        last_name: "Cutting",
                        address_1: "7 Sovereign House",
                        address_2: "test",
                        city: "Tynemouth",
                        country_code: "GB",
                        postal_code: "NE30 4PR",
                    },
                    billing_address: {
                        first_name: "Kieran",
                        last_name: "Billing",
                        address_1: "7 Sovereign House",
                        address_2: "test",
                        city: "Tynemouth",
                        country_code: "GB",
                        postal_code: "NE30 4PR",
                    },
                },
            };
            await this.$store.dispatch("shop/updateCart", data);
        },
        async startPayment() {
            await this.$store.dispatch("shop/startPayment", this.getCart.id);
        },
        async selectStripe() {
            await this.$store.dispatch("shop/selectStripe", this.getCart.id);

            const elements = this.$stripe.elements();
            const card = elements.create("card");
            card.mount("#stripe_container");
            this.card = card;

        },
        async completePayment() {
            let x = await this.$stripe.confirmCardPayment(
                this.getCart.payment_session.data.client_secret,
                {
                    payment_method: {
                        card: this.card,
                        billing_details: {
                            email: "test@test.com",
                        },
                    },
                }
            );
            //if no error
            let data = {
                cartId: this.getCart.id
            }
            //https://docs.medusajs.com/add-plugins/stripe
            //https://stripe.com/docs/payments/capture-later
            //handle interruptions using Idempotency Key
            await this.$store.dispatch('shop/completeCart', data)
        },
    },
}