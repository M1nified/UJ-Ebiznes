import Me from "../models/Me";
import Axios from "axios";

const getMe = async () => {
    try {
        const me: Me = (await Axios.get('/me')).data;
        return me;
    } catch (error) {
        return null;
    }
}

export { getMe };