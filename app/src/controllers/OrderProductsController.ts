import OrderProduct from "../models/OrderProduct";
import Axios from "axios";

const getAllOrderProducts = async () => {
    try {
        const orderProducts: OrderProduct[] = (await Axios.get('/orderProducts')).data;
        return orderProducts;
    } catch (error) {
        return [];
    }
}

export {
    getAllOrderProducts
}
