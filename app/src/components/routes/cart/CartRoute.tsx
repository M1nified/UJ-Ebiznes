import React, { Component } from 'react';
import { CartModel } from '../../../localStorage/cart/CartModel';
import { getEmptyCart, getCart } from '../../../localStorage/cart/CartStorage';
import Product from '../../../models/Product';
import { getAllProducts } from '../../../controllers/ProductsController';
import { Link } from 'react-router-dom';

type CartRouteState = {
    cartStore: CartModel,
    products: Product[],
}

class CartRoute extends Component {

    state: CartRouteState = {
        cartStore: getEmptyCart(),
        products: [],
    }

    async componentDidMount() {
        const cartStore = getCart();
        const products = await getAllProducts();
        this.setState({
            cartStore,
            products,
        });
    }

    render() {
        const elementsList = this.state.cartStore.contains
            .map((cartElement, index) => {
                const product = this.state.products.find(x => x.id === cartElement.productId);
                if (!product)
                    return null;
                return <div key={index}>
                    {product.name} x {cartElement.amount}
                </div>
            })
            .filter(x => x)

        return (
            <div>
                <b>Cart:</b>
                <div>
                    {elementsList.length > 0 ? elementsList : "Cart is empty"}
                </div>
                <div>
                    {elementsList.length > 0 ? (<Link to="/order">Order</Link>) : ""}
                </div>
            </div>
        );
    }
}

export default CartRoute;
