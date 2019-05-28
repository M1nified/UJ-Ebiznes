import React, { Component } from "react";
import { getAllProducts } from "../../../controllers/ProductsController";
import Product from "../../../models/Product";

type ProductsListState = {
    products: Product[]
}

class ProductsList extends Component {

    state: ProductsListState = {
        products: []
    }

    async componentDidMount() {
        const products = await getAllProducts();
        this.setState({
            products
        })
    }

    render() {
        const productRows = this.state.products.map((product, idx) => (<tr key={idx}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{(product.price/100).toFixed(2)}</td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductsList;
