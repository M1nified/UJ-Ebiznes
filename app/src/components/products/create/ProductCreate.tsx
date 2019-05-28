import React, { Component, FormEvent } from "react";
import { getAllCategories } from "../../../controllers/CategoryController";
import { postProduct } from "../../../controllers/ProductsController";
import Category from "../../../models/Category";

type ProductCreateState = {
    name: string,
    description: string,
    price: number,
    image: string | null,
    unavailable: boolean,
    categoryId: number | null,

    categories: Category[],
}

class ProductCreate extends Component {

    state: ProductCreateState = {
        name: "",
        description: "",
        price: 0,
        image: null,
        unavailable: false,
        categoryId: null,

        categories: [],
    }

    async componentDidMount() {
        const categories = await getAllCategories();
        this.setState({
            categories,
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input className="form-control" value={this.state.price} onChange={e => this.setState({ price: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input className="form-control" value={this.state.image || ""} onChange={e => this.setState({ image: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Unavailable</label>
                        <input className="form-control" checked={this.state.unavailable} onChange={e => this.setState({ unavailable: e.target.checked })} type="checkbox" />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select className="form-control" value={this.state.categoryId === null ? "" : this.state.categoryId} onChange={e => this.setState({ categoryId: e.target.value })}>
                            {
                                this.state.categories.map((category, idx) => (
                                    <option key={idx} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    {/* <div className="form-group">
                        <label>Category</label>
                        <CategorySelect className="form-control" value={this.state.categoryId === null ? "" : this.state.categoryId} onChange={val => this.setState({ categoryId: val })} />
                    </div> */}
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const {
            name,
            description,
            price,
            image,
            unavailable,
            categoryId,
        } = this.state;
        const result = await postProduct({name, description, price, image, unavailable, categoryId});
        if (!result) {
            console.log('formOnSubmit failed');
            return;
        }
        console.log('formOnSubmit ok');
        this.setState({
            name: "",
            description: "",
            price: 0,
            image: null,
            unavailable: false,
            categoryId: null,
        })
    }
}

export default ProductCreate;
