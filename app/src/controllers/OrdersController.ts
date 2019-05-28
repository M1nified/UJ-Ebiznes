import Axios from "axios";
import Order from "../models/Order";

export type PostOrderBody = {
    userId: number,
    createdAt: Date,
}

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

const postOrder = async (body: PostOrderBody) => {
    try {
        const resp = await Axios.post(
            '/orders',
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

const deleteOrder = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/orders/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}

export { getAllOrders, getOrder, postOrder, deleteOrder, };

