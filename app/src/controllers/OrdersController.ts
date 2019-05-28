import Axios from "axios";
import Order from "../models/Order";

const getAllOrders = async () => {
    try {
        const orders: Order[] = (await Axios.get('/orders')).data;
        return orders;
    } catch (error) {
        return [];
    }
}

const getOrder = async (orderId: number | string) => {
    try {
        const order: Order = (await Axios.get(`/orders/${orderId}`)).data;
        return order;
    } catch (error) {
        return null;
    }
}

export {
    getAllOrders,
    getOrder
};

