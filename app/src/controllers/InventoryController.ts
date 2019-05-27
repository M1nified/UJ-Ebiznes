import Inventory from "../models/Inventory";
import Axios from "axios";

const getAllInventories = async () => {
    try {
        const inventories: Inventory[] = (await Axios.get('/inventories')).data;
        return inventories;
    } catch (error) {
        return [];
    }
}

export {
    getAllInventories
}
