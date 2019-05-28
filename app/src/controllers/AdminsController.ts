import Axios from "axios";
import Admin from "../models/Admin";

type PostAdminBody = {
    email: string,
    password: string,
}

const getAllAdmins = async () => {
    try {
        const list: Admin[] = (await Axios.get('/admins')).data;
        return list;
    } catch (error) {
        return [];
    }
}

const getAdmin = async (id: number | string) => {
    try {
        const single: Admin = (await Axios.get(`/admins/${id}`)).data;
        return single;
    } catch (error) {
        return null;
    }
}

const postAdmin = async (body: PostAdminBody) => {
    try {
        const resp = await Axios.post(
            '/admins',
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

const deleteAdmin = async (id: number | string) => {
    try {
        const resp = await Axios.delete(`/admins/${id}`)
        if (resp.status !== 200)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}


export { getAllAdmins, getAdmin, postAdmin, deleteAdmin, };
