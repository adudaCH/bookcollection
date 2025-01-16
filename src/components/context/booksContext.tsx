import React, { createContext, useState, ReactNode } from "react";
import { Book } from "../../interfaces/Interfaces";
// interface BookContextType {
//     book: Books | null;

//     setBook: React.Dispatch<React.SetStateAction<Book | null>>;
// }

export const BooksContext = createContext<
    | {
        books: Book[] | undefined;
        setBooks: React.Dispatch<React.SetStateAction<Book[]>> | undefined;
      }
    | undefined
>(undefined); // Create context for books

export const BooksProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]); // State for books

    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            {children}
        </BooksContext.Provider>
    );
};
