import Axios from "axios";
import User from "../models/User";

const getAllUsers = async () => {
    try {
        const users: User[] = (await Axios.get('/users')).data;
        return users;
    } catch (error) {
        return [];
    }
}

export {
    getAllUsers
}
