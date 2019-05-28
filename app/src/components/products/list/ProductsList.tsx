import React, { Component } from "react";
import { deleteProduct, getAllProducts } from "../../../controllers/ProductsController";
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
            <th>{product.id}</th>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{(product.price / 100).toFixed(2)}</td>
            <td><button onClick={this.delete.bind(this, product.id)}>Delete</button></td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productRows}
                    </tbody>
                </table>
            </div>
        )
    }

    async delete(id: number) {
        deleteProduct(id)
            .then(_ => {
                this.componentDidMount();
            })
            .catch(_ => {
                console.error("Failed to remove.");
            })
    }
}

export default ProductsList;
