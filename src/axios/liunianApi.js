import axios from "./dayunIndex";


export const liunianAll = (data) =>{
    return axios.post('/liunian/all',data)
}


