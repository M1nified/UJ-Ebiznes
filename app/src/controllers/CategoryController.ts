import Axios from "axios";
import Category from "../models/Category";

export type PostCategoryBody = {
    name: string,
    description: string,
    parentId: number | null
}

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

const postCategory = async (body: PostCategoryBody) => {
    try {
        const resp = await Axios.post(
            '/categories',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(resp)
        if (resp.status !== 201)
            return false;
        return resp.data;
    } catch (error) {
        return false;
    }
}

const deleteCategory = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/categories/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}

export { getAllCategories, getCategory, postCategory, deleteCategory, };
