// book service
import axios from "axios";
import { Book } from "../interfaces/Interfaces";

const api: string = `${process.env.REACT_APP_API}`;

// get all books from 
export function getAllBooks(){
    return axios.get(`${api}/books`)
}

// export function postBook(bookData: Book) {
//     return axios.post(`${api}/books` );
// }


export const postBook = async (book: Book) => {
    try {
        console.log("Payload sent to API:", book); // Log the payload
        const response = await axios.post(`${api}/books`, book); // Replace with your endpoint
        console.log("API response:", response.data); // Log the API response
        return response;
    } catch (error) {
        console.error("Error posting book:", error);
        throw error;
    }
};

export function addBook(arg0: Book) {
    throw new Error("Function not implemented.");
}

export const deleteBook = (id: string) => {
    return axios.delete(`/api/books/${id}`); 
};

export function updateBook(id: string, bookData: Book) {
    return axios.put(`${api}/books/${id}`, bookData);
}