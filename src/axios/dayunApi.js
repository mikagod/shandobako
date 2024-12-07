import axios from "./dayunIndex";


export const dayunAll = (data) =>{
    return axios.post('/dayun/all',data)
}


