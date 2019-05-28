import Axios from "axios";
import OrderProduct from "../models/OrderProduct";

type PostOrderProductBody = {
    orderId: number,
    productId: number,
    amount: number

}

const getAllOrderProducts = async () => {
    try {
        const orderProducts: OrderProduct[] = (await Axios.get('/orderProducts')).data;
        return orderProducts;
    } catch (error) {
        return [];
    }
}

const getOrderProductsForOrder = async (orderId: number | string) => {
    try {
        const orderProducts: OrderProduct[] = (await Axios.get(`/orderProducts/byOrder/${orderId}`)).data;
        return orderProducts;
    } catch (error) {
        return [];
    }
}

const postOrderProduct = async (body: PostOrderProductBody) => {
    try {
        const resp = await Axios.post(
            '/orderProducts',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        if (resp.status !== 201)
            return false;
        return resp.data;
    } catch (error) {
        return false;
    }
}

const deleteOrderProduct = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/orderProducts/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}

export { getAllOrderProducts, getOrderProductsForOrder, postOrderProduct, deleteOrderProduct, };

