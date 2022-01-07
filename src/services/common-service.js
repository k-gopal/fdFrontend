import axios from "axios";

const baseUrl = "http://localhost:8000";

export const postRequestApi = async (url, data, token = "") => {
  try {
    const result = await axios.post(baseUrl + url, data, {
      headers: {
        Authorization: token,
      },
    });
    if(result.data.message === "Invalid Token."){
      localStorage.clear();
      window.location.reload();
      return
    }
    if (result) return result;
    return false;
  } catch (error) {
    return error;
  }
};
