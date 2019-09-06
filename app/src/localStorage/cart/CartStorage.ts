import Product from "../../models/Product";
import { CartModel } from "./CartModel";

const addToCart = (product: Product, amount: number) => {
    const cartStorage = getCart();
    const { id } = product;
    const elem = cartStorage.contains.find((x) => x.productId === id);
    if (elem) {
        elem.amount += amount;
    } else {
        cartStorage.contains.push({
            productId: product.id,
            amount: amount,
        });
    }
    window.localStorage.setItem('cart', JSON.stringify(cartStorage));
}

const getCart = (): CartModel => {
    const cartStorageJson = window.localStorage.getItem('cart');
    const cartStorage: CartModel = !cartStorageJson
        ? getEmptyCart()
        : JSON.parse(cartStorageJson);
    return cartStorage;
}

const getEmptyCart = (): CartModel => {
    return { contains: [] };
}

const clearCart = () => {
    return window.localStorage.setItem('cart', JSON.stringify(getEmptyCart()));
}

export { addToCart, getCart, getEmptyCart, clearCart };
