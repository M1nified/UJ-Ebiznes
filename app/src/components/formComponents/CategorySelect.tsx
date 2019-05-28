import React, { Component } from "react";
import Category from "../../models/Category";

type CategorySelectState = {
    categories: Category[],
    categoryId: number | null,
    onChange: any,
}

type CategorySelectProps = {
    value?: number | null,
    onChange: any,
}

class CategorySelect extends Component {

    constructor(props: CategorySelectProps) {
        super(props);

        this.state.onChange = props.onChange.bind(this);
    }

    state: CategorySelectState = {
        categories: [],
        categoryId: null,
        onChange: null,
    }

    render() {
        return (
            <select className="form-control" value={this.state.categoryId === null ? "" : this.state.categoryId} onChange={e => this.setState({ categoryId: e.target.value }, this.handleOnChange.bind(this))}>
                {
                    this.state.categories.map((category, idx) => (
                        <option key={idx} value={category.id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        )
    }

    handleOnChange() {
        console.log(this.state.categoryId);
    }
}

export default CategorySelect;