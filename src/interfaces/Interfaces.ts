import { ReactNode } from "react";
import { string } from "yup";

    export interface Users {
    id?: string;
    name: string;
    email: string;
    password: string;
}


export interface Book {
    [x: string]: ReactNode;
    id?: string;
    title: string;
    author: string;
    genre: string;
    price: number;
}

