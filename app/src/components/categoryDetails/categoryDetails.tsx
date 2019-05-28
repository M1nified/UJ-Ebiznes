import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { getAllCategories, getCategory } from "../../controllers/CategoryController";
import Category from "../../models/Category";
import Product from "../../models/Product";
import { getProductsForCategory } from "../../controllers/ProductsController";

type CategoryDetailsState = {
    category: Category | null,
    products: Product[],
}

type CategoryDetailsMatchParams = {
    categoryId: string,
}

class CategoryDetails extends Component {

    state: CategoryDetailsState = {
        category: null,
        products: [],
    }

    async componentDidMount() {
        const { match: { params: { categoryId } } } = this.props as RouteComponentProps<CategoryDetailsMatchParams>;
        const [products, category] = await Promise.all([
            getProductsForCategory(categoryId),
            getCategory(categoryId),
        ])
        this.setState({
            products,
            category,
        })
    }

    render() {
        const productRows = this.state.products.map((product, idx) => (<tr key={idx}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Price</td>
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

export default CategoryDetails;
