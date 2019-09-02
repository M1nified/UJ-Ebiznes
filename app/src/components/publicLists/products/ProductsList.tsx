import React, { Component } from "react";
import Category from "../../../models/Category";
import { getAllCategories } from "../../../controllers/CategoryController";
import { getProductsForCategory, getAllProducts } from "../../../controllers/ProductsController";
import Product from "../../../models/Product";

type PublicProductsListState = {
    products: Product[],
    categoryId: null | number,
}

type PublicProductsListProps = {
    categoryId: null | number,
}

class PublicProductsList extends Component<PublicProductsListProps> {

    state: PublicProductsListState = {
        products: [],
        categoryId: null,
    }

    constructor(props: PublicProductsListProps) {
        super(props);

        console.log(props)

        if (typeof props.categoryId !== 'undefined') {
            this.state.categoryId = props.categoryId;
        }

    }

    async componentDidMount() {
        const products = this.state.categoryId !== null
            ? await getProductsForCategory(this.state.categoryId)
            : await getAllProducts();
        this.setState({
            products,
        })
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.categoryId !== this.state.categoryId) {
            this.setState({
                categoryId: nextProps.categoryId,
            }, () => {
                this.componentDidMount();
            })
        }
    }

    render() {

        const productsList = this.state.products
            .map((product, index) => (
                <div key={index}>
                    {product.name}
                </div>
            ))

        return (
            <div>
                {productsList}
            </div>
        )
    }
}

export default PublicProductsList;
