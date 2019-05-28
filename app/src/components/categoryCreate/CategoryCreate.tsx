import React, { Component, FormEvent } from "react";
import Category from "../../models/Category";
import { postCategory } from "../../controllers/CategoryController";

type CategoryCreateState = {
    name: string,
    description: string,
}

class CategoryCreate extends Component {

    state: CategoryCreateState = {
        name: "",
        description: "",
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
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { name, description } = this.state;
        const result = await postCategory(name, description);
        if (!result) {
            console.log('formOnSubmit failed')
            return;
        }
        console.log('formOnSubmit ok')
        this.setState({
            name: "",
            description: "",
        })
    }
}

export default CategoryCreate;
