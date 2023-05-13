import axios from "./customize-axios"


const fecthAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}



export { fecthAllUser }