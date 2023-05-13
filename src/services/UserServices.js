import axios from "./customize-axios"


const fecthAllUser = () => {
    return axios.get('/api/users?page=1');
}



export { fecthAllUser }