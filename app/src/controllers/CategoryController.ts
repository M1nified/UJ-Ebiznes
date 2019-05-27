import Category from "../models/Category";
import Axios from "axios";

const getAllCategories = async () => {
    try {
        const categories: Category[] = (await Axios.get('/categories')).data;
        return categories;
    } catch (error) {
        return [];
    }
}

export {
    getAllCategories
}
