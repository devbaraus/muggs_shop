const gql = String.raw

export const mutationCreateCheckout = () => gql`
    mutation CreateCheckout($variantId: ID!, $quantity: Int!){
        checkoutCreate(input: {
            lineItems: {
                variantId: $variantId,
                quantity: $quantity
            }
        }) {
            checkout {
                webUrl
            }
        }
    }
`