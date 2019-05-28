import Axios from "axios";
import Product from "../models/Product";

type PostProductBody = {
    name: string,
    description: string,
    price: number,
    image: string | null,
    unavailable: boolean,
    categoryId: number,
}

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

const postProduct = async (body: PostProductBody) => {
    try {
        const resp = await Axios.post(
            '/products',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (resp.status !== 201)
            return false;
        return resp.data;
    } catch (error) {
        return false;
    }
}

const deleteProduct = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/products/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}

export { getAllProducts, getProductsForCategory, postProduct, deleteProduct, };

