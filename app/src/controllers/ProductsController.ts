import Axios from "axios";
import Product from "../models/Product";

const getAllProducts = async () => {
    try {
        const products: Product[] = (await Axios.get('/products')).data
        return products;
    } catch (error) {
        return [];
    }
}
export {
    getAllProducts
}
