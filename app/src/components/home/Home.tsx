import React, { Component } from "react";
import { Link } from "react-router-dom";
import Category from "../../models/Category";
import { getAllCategories } from "../../controllers/CategoryController";
import PublicProductsList from "../publicLists/products/ProductsList";

type HomeState = {
    categories: Category[],
    categoryId: null | number,
}

class Home extends Component {

    state: HomeState = {
        categories: [],
        categoryId: null,
    }

    constructor(props: any) {
        super(props);

        console.log(props)

        if(typeof props.match.params.categoryId !== 'undefined'){
            this.state.categoryId = props.match.params.categoryId;
        }

    }

    async componentDidMount() {
        const categories = await getAllCategories();
        this.setState({
            categories,
        })
    }

    componentWillReceiveProps(nextProps: any){
        if(nextProps.match.params.categoryId !== this.state.categoryId){
            this.setState({
                categoryId: nextProps.match.params.categoryId
            })
        }
    }

    render() {

        const categoriesList = this.state.categories
            .sort((a, b) => (a.name.localeCompare(b.name)))
            .map((category, index) => (
                <div key={index}>
                    <Link to={`/c/${category.id}`}>
                        {category.name}
                    </Link>
                </div>
            ))

        return (
            <div>
                <div>
                    Categories:
                    {categoriesList}
                </div>
                <hr />
                <div>
                    <PublicProductsList categoryId={this.state.categoryId} />
                </div>
            </div>
        )
    }
}

export default Home;
