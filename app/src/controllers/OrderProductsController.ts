import Axios from "axios";
import OrderProduct from "../models/OrderProduct";

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

export {
    getAllOrderProducts,
    getOrderProductsForOrder
};

