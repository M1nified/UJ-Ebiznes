import Category from "../models/Category";
import Axios from "axios";
import { tsRestType } from "@babel/types";

const getAllCategories = async () => {
    try {
        const categories: Category[] = (await Axios.get('/categories')).data;
        return categories;
    } catch (error) {
        return [];
    }
}

const getCategory = async (categoryId: number | string) => {
    try {
        const category: Category = (await Axios.get(`/categories/${categoryId}`)).data;
        return category;
    } catch (error) {
        return null;
    }
}

export {
    getAllCategories,
    getCategory,
}
