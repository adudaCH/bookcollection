// user service
import axios from "axios";
import { Users } from "../interfaces/Interfaces";


const api: string = `${process.env.REACT_APP_API}`;

export function getAllUsers(p0: string){
    return axios.get(`${api}/users`);
}

export function postUsers(userData: Users) {
    return axios.post(`${api}/users`, userData);
}



