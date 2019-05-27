import Order from "../models/Order";
import Axios from "axios";

const getAllOrders = async () => {
    try {
        const orders: Order[] = (await Axios.get('/orders')).data;
        return orders;
    } catch (error) {
        return [];
    }
}

export {
    getAllOrders
}
