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

const getUser = async (userId: number | string) => {
    try {
        const user: User = (await Axios.get(`/users/${userId}`)).data;
        return user;
    } catch (error) {
        return null;
    }
}

export {
    getAllUsers,
    getUser,
}
