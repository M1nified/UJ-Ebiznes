import React, { Component } from 'react';
import Product from '../../../models/Product';
import { getProduct } from '../../../controllers/ProductsController';
import { addToCart } from '../../../localStorage/cart/CartStorage';

type ProductDetailsRouteState = {
    productId: number,
    product: Product | null,
}

class ProductDetailsRoute extends Component {

    state: ProductDetailsRouteState = {
        productId: -1,
        product: null,
    }

    constructor(props: any) {
        super(props);

        console.log(props)

        if (typeof props.match.params.productId !== 'undefined') {
            this.state.productId = props.match.params.productId;
        }

    }

    async componentDidMount() {
        if (this.state.productId === null)
            return;
        try {
            const product = await getProduct(this.state.productId);
            if (!product)
                throw "Failed to fetch product";
            this.setState({
                product,
            })

        } catch (error) {
            console.error(error);
        }
    }

    render() {
        console.log(this.state)
        if (!this.state.product)
            return <div>Product not found!</div>
        const { product } = this.state;
        return (
            <div>
                <h2>{product.name}</h2>
                <p>
                    {product.price / 100}zł
                </p>
                <p>
                    <button onClick={() => addToCart(product, 1)}>Add to cart</button>
                </p>
                <p>
                    {product.description}
                </p>
            </div>
        );
    }
}

export default ProductDetailsRoute;
