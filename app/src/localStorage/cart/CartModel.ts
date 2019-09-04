type CartElement = {
    productId: number,
    amount: number,
}

export type CartModel = {
    contains: CartElement[],
}
