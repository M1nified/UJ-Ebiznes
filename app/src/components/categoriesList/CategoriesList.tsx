import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../controllers/CategoryController";
import Category from "../../models/Category";

type CategoriesListState = {
    categories: Category[]
}

class CategoriesList extends Component {

    state: CategoriesListState = {
        categories: []
    }

    async componentDidMount() {
        const categories = await getAllCategories();
        this.setState({
            categories
        })
    }

    render() {
        const categoryRows = this.state.categories.map((category, idx) => (<tr key={idx}>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td><Link to={`/category/${category.id}`} >Browse</Link></td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CategoriesList;
