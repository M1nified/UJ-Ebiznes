import React, { Component, FormEvent } from "react";
import { PostCategoryBody, postCategory } from "../../../controllers/CategoryController";

type CategoryCreateState = {
    category: PostCategoryBody,
}

class CategoryCreate extends Component {

    state: CategoryCreateState = {
        category: {
            name: "",
            description: "",
            parentId: null,
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" value={this.state.category.name} onChange={e => this.setState({ category: { ...this.state.category, name: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" value={this.state.category.description} onChange={e => this.setState({ category: { ...this.state.category, description: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Parent</label>
                        <input className="form-control" value={this.state.category.parentId || -1} onChange={e => this.setState({ category: { ...this.state.category, description: e.target.value } })} />
                    </div>
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { category } = this.state;
        const result = await postCategory(category);
        if (!result) {
            console.log('formOnSubmit failed');
            return;
        }
        console.log('formOnSubmit ok');
        this.setState({
            category: {
                name: "",
                description: "",
                parentId: null,
            }
        })
    }
}

export default CategoryCreate;
