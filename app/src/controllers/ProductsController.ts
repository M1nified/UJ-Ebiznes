import Axios from "axios";
import Product from "../models/Product";

const getAllProducts = async () => {
    try {
        const products: Product[] = (await Axios.get('/products')).data;
        return products;
    } catch (error) {
        return [];
    }
}

const getProductsForCategory = async (categoryId: number | string) => {
    try {
        const products: Product[] = (await Axios.get(`/products/byCategory/${categoryId}`)).data;
        return products;
    } catch (error) {
        return [];
    }
}

export { getAllProducts, getProductsForCategory };

