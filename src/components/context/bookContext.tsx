import React, { createContext, useState, ReactNode } from "react";
import { Book } from "../../interfaces/Interfaces";
interface BookContextType {
    book: Book | null;

    setBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

export const BookContext = createContext<
    | {
        book: Book | undefined;
        setBook: React.Dispatch<React.SetStateAction<Book>> | undefined;
    }
    | undefined
>(undefined); // Create context for books

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const [book, setBook] = useState<Book>({
        title: "",
        author: "",
        genre: "",
        price: 0,
    }); // State for books

    return (
        <BookContext.Provider value={{ book, setBook }}>
            {children}
        </BookContext.Provider>
    );
};

// export const bookContext = createContext<{ book: Book; setBook: React.Dispatch<React.SetStateAction<Book>> } | undefined>(undefined); // Create context for books
