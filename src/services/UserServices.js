import axios from "./customize-axios"


const fecthAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post(`/api/users`, { name, job });
}

const putUpdateUser = (name, job) => {
    return axios.put(`/api/users/2`, { name, job });
}


export { fecthAllUser, postCreateUser, putUpdateUser }