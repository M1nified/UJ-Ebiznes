import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../../controllers/CategoryController";
import Category from "../../../models/Category";

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
            <th>{category.id}</th>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td><Link to={`/category/${category.id}`} >Browse</Link></td>
            <td><button onClick={this.delete.bind(this, category.id)}>Delete</button></td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryRows}
                    </tbody>
                </table>
            </div>
        )
    }

    async delete(id: number) {
        deleteCategory(id)
            .then(_ => {
                this.componentDidMount();
            })
            .catch(_ => {
                console.error("Failed to remove.");
            })
    }
}

export default CategoriesList;
