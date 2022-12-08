
import { mapGetters } from "vuex";

import medusaAPI from '../api/medusa'

export default {
    computed: {
        ...mapGetters("shop", ["getUser", "getCart"]),
    },
    methods: {
        async getPasswordToken(email) {
            await medusaAPI.getPasswordResetToken(email)
        },

        async freshCart() {

            await this.$store.dispatch("shop/createCart");
            this.registerCookie("cart=" + this.getCart.id);
        },
        async cartInit() {
            if (this.getCart === null) {
                const existingCart = this.getCookie("cart");
                if (existingCart) {
                    await this.$store.dispatch("shop/retrieveCart", existingCart);
                } else {
                    this.freshCart()
                }
            }
        },

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

            let data = {
                cartId: this.getCart.id,
                //  shippingMethod: "royal mail"
            };
            await this.$store.dispatch("shop/getShippingOptionsForCart", data);
        },
        async removeDiscount(discount) {
            let data = {
                cartId: this.getCart.id,
                code: discount,
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

        async updateCart(update) {

            let data = {
                // customer_id: 'cus_01GGQCYQZCV8EDVX27DVRDDH4K',
                cartId: this.getCart.id,
                update: update
            };
            await this.$store.dispatch("shop/updateCart", data);
        },


        async getAnOrder(id) {
            let orderData = await medusaAPI.lookupOrder(id, this.getUser.email);
            return orderData;
        },
        async startPayment() {
            try {
                await this.$store.dispatch("shop/startPayment", this.getCart.id);

            } catch (e) {
                console.error(e)
            }
        },
        async selectStripe() {
            await this.$store.dispatch("shop/selectStripe", this.getCart.id);
            let appearance = {
                theme: 'flat',
                variables: {
                    fontFamily: 'Brandon Grotesque, system-ui, sans-serif',
                    fontWeightNormal: '600',
                    fontSizeBase: '1.2rem',
                    colorPrimary: '#323F48'
                },
            }
            const elements = this.$stripe.elements({ clientSecret: this.getCart.payment_session.data.client_secret, appearance });
            // const elements = this.$stripe.elements();
            return elements;
            // const card = elements.create("card")

        },
        stripeAddressElement(elements) {

            let options = {
                mode: 'shipping',
                // allowedCountries: ],
                defaultValues: {

                    name: this.getUser.first_name + " " + this.getUser.last_name,

                    address: {
                        line1: this.getCart.shipping_address.address_1,
                        line2: this.getCart.shipping_address.address_2,
                        city: this.getCart.shipping_address.city,
                        state: this.getCart.shipping_address.province,
                        country: this.getCart.shipping_address.country_code,
                        postal_code: this.getCart.shipping_address.postal_code,
                    },

                },
            }
            console.log(this.getCart.shipping_address.address_1)
            const address = elements.create("address", options)
            console.log(options)
            console.log(address)
            this.address = address
            this.address.mount("#address");


            this.address.on('change', async function (event) {

                if (event.complete) {
                    let update = {
                        customer_id: this.getUser.id,
                        shipping_address: {
                            first_name: event.value.name.split(" ")[0],
                            last_name: event.value.name.split(" ")[1],
                            address_1: event.value.address.line1,
                            address_2: event.value.address.line2,
                            city: event.value.address.city,
                            country_code: event.value.address.country,
                            postal_code: event.value.address.postal_code,
                        },
                        // billing_address: {}

                    }
                    await this.updateCart(update)


                }
            }.bind(this));
        },
        stripePaymentElement(elements) {
            let options = {
                defaultValues: {
                    billingDetails: {
                        name: this.getUser.first_name + this.getUser.last_name,
                        email: this.getCart.email,
                        address: {
                            line1: this.getCart.shipping_address.address_1,
                            line2: this.getCart.shipping_address.address_2,
                            city: this.getCart.shipping_address.city,
                            state: this.getCart.shipping_address.province,
                            country: 'United Kingdom',
                            postal_code: this.getCart.shipping_address.postal_code,
                        },
                    }
                }
            }
            const payment = elements.create("payment", options);
            this.payment = payment;

            this.payment.mount("#payment");


        },
        async completePayment(elements) {

            // await this.$stripe.confirmCardPayment(
            //     this.getCart.payment_session.data.client_secret,
            //     {
            //         payment_method: {
            //             card: this.card,
            //             billing_details: {
            //                 email: "test@test.com",
            //             },
            //         },
            //     }
            // );
            await this.$stripe.confirmPayment({
                elements, confirmParams: {
                    return_url: 'https://test.fractalsdesign.uk/complete'
                    // return_url: 'http://localhost:3000/complete'
                }
            }).then(({ error, paymentIntent }) => {
                console.error(error)
                console.log('hi i am a paymentIntent')
                console.log(paymentIntent)
                //TODO handle errors
                // console.log('hello')
            })

            //https://stripe.com/docs/payments/capture-later
            //handle interruptions using Idempotency Key
        },

    },
}