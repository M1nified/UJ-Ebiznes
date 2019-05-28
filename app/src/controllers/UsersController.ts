import Axios from "axios";
import User from "../models/User";

export type PostUserBody = {
    name: string,
    name2: string,
    password: string,
    email: string,
    country: string,
    street: string,
    city: string,
    address: string,
    postal: string,
}

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

const postUsers = async (body: PostUserBody) => {
    try {
        const resp = await Axios.post(
            '/users',
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

const deleteUser = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/users/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}

export { getAllUsers, getUser, postUsers, deleteUser, };

