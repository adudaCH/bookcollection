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


// export const postBook = async (book: Book) => {
//     try {
//         console.log("Payload sent to API:", book); // Log the payload
//         const response = await axios.post(`${api}/books`, book); // Replace with your endpoint
//         console.log("API response:", response.data); // Log the API response
//         return response;
//     } catch (error) {
//         console.error("Error posting book:", error);
//         throw error;
//     }
// };

export const deleteBook = (id: string) => {
    return axios.delete(`${api}/books/${id}`);
};

export function updateBook(id: string, bookData: Book) {
    return axios.put(`${api}/books/${id}`, bookData);
}
