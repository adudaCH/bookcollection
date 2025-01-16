// book service
import axios from "axios";
import { Book } from "../interfaces/Interfaces";

const api: string = `${process.env.REACT_APP_API}`;
const booksArray: Book[] = [];

// get all books from
export async function getAllBooks() {
    return await axios.get(`${api}/books`);
}

export function postBook(bookData: Book) {
    return axios.post(`${api}/books`, bookData); // Pass `bookData` as the payload
}

export function getBookById(id: string) {
    return axios.get(`${api}/books/${id}`);
}



export const deleteBook = (id: string) => {
    return axios.delete(`${api}/books/${id}`);
};

export function updateBook(id: string, bookData: Book) {
    return axios.put(`${api}/books/${id}`, bookData);
}
