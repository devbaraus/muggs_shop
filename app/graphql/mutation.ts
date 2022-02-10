const gql = String.raw

export const mutationCreateCheckout = () => gql`
    mutation CreateCheckout($variantID: ID!, $quantity: Int){
        checkoutCreate(input: {
            lineItems: {
                variantID: $variantID,
                quantity: $quantity
            }
        }) {
            checkout {
                webUrl
            }
        }
    }
`