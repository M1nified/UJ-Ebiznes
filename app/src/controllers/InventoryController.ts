import Axios from "axios";
import Inventory from "../models/Inventory";

export type PostInventoryBody = {
    productId: number,
    inventoryCount: number,
}

const getAllInventories = async () => {
    try {
        const inventories: Inventory[] = (await Axios.get('/inventories')).data;
        return inventories;
    } catch (error) {
        return [];
    }
}

const getInventory = async (id: number | string) => {
    try {
        const single: Inventory = (await Axios.get(`/inventories/${id}`)).data;
        return single;
    } catch (error) {
        return null;
    }
}

const postInventory = async (body: PostInventoryBody) => {
    try {
        const resp = await Axios.post(
            '/inventories',
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

const deleteInventory = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/inventories/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}

export { getAllInventories, getInventory, postInventory, deleteInventory, };
