type ContextProps = {
    checkoutProduct: (variantID: string, quantity: number) => Promise<void>;
}

