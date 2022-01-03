import axios from "axios";

const baseUrl = "http://localhost:8000";
const token = localStorage.getItem("token");

const headers = {
    headers: {
        "Authorization": token
    }
}

export const postRequestApi = async(url, data) => {
    try {
        const result = await axios.post(baseUrl+url, data, headers);
        if(result) return result;
        return false;
    } catch (error) {
        return error;
    }
};

export const getRequestApi = async(url) => {
    try {
        const result = await axios.get(baseUrl+url, headers);
        if(result) return result;
        return false;
    } catch (error) {
        return error;
    }
}